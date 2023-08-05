import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Import your Firebase configuration file

// The getUserInfo function should be defined here...

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);


  async function getUserInfo(userId) {
    try {
      const userRef = db.collection('users').doc(userId);
      const userSnapshot = await userRef.get();
  
      if (userSnapshot.exists) {
        const userData = userSnapshot.data();
        const { name, email } = userData;
  
        return { id: userId, name, email };
      } else {
        // Handle the case where the user document does not exist
        return null;
      }
    } catch (error) {
      console.log('Error fetching user info:', error);
      return null;
    }
  }
  
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const leaderboardSnapshot = await db.collection('leaderboard').orderBy('points', 'desc').get();
        const leaderboardData = await Promise.all(
          leaderboardSnapshot.docs.map(async (doc) => {
            const userId = doc.id;
            const points = doc.data().points;
            const userData = await getUserInfo(userId);
            return { id: userId, points, ...userData };
          })
        );
        setLeaderboardData(leaderboardData);
      } catch (error) {
        console.log('Error fetching leaderboard data:', error);
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div className="leaderboard bg-white rounded-lg shadow-md p-4">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <ul>
        {leaderboardData.map((player) => (
          <li key={player.id} className="flex items-center justify-between py-2 border-b border-gray-300 last:border-b-0">
            <span className="text-lg">{player.name}</span>
            <span className="text-lg font-bold">{player.points}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
