import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Import your Firebase configuration file

// The getUserInfo function should be defined here...

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);

  let statusEmoji = '';

  async function getUserInfo(userId) {
    try {
      const userRef = db.collection('users').doc(userId);
      const userSnapshot = await userRef.get();
  
      if (userSnapshot.exists) {
        const userData = userSnapshot.data();
        const { name, email, status, letters } = userData;
  
        return { id: userId, name, email, status, letters };
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

            // let statusEmoji = '';

            // if (userData.status === 'royal') {
            //   statusEmoji = '👑';
            // } else if (userData.status === 'noble') {
            //   statusEmoji = '🛡️';
            // } else if (userData.status === 'peasant') {
            //   statusEmoji = '💩';
            // }

            return { id: userId, points, statusEmoji, ...userData };
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
    <div className="w-2/3 mx-auto bg-[url('./backgroundfeed.jpg')] bg-cover bg-center">
      <div className="leaderboard bg-white rounded-lg shadow-md p-4 background-light">
        <h2 className="text-2xl font-bold mb-4 text-center">Hierarchy</h2>
        <ul>
          {leaderboardData.map((player) => (
            <li key={player.id} className="flex items-center justify-between py-2 border-b border-gray-300 last:border-b-0">
              <span className="text-lg font-serif italic text-gray-700">{player.name} ({player.status})</span>
              <span className="text-lg font-bold text-yellow-800">Character allowance: {player.points}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

}

export default Leaderboard;
