import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
      <div className="min-h-screen pt-10 pb-6 px-2 md:px-0">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-2xl">
          <div>
            <img src="xiv.png" alt="our logo" />
          </div>
          <div className="py-10 font-black text-center text-black text-6xl">
            <h1>Ye Olde Tweets</h1>
            <p className="text-lg w-3/5 m-auto mt-10">
              Amidst the Enchantment of Medieval Marvels: Happening Right Now
            </p>
          </div>
          <div className="flex justify-center items-center mt-4">
            <Link to="/signup" className="btn btn-primary m-auto">
            Sign Up Here
            </Link>
            <Link to="/login" className="btn btn-primary m-auto">
            Login Here
            </Link>
          </div>
        </div>
        <div className="min-w-screen mt-10 bg-white text-black p-20 pl-40">
          <h1 className="text-4xl font-bold">A Castle for Chatter</h1>
          <p className="mt-2 w-1/2 text-xl">
            In an era of jesters, jongleurs, and minstrels, we bring to you Medieval Tweets,
            where every noble, knight, and peasant can share their thoughts...
          </p>
        </div>
      </div>
    )
}

export default Home;
