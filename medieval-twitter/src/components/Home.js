import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../circlel.png';
import square from '../squarebackground.JPG';
function Home() {
    return (
      <div className="min-h-screen pt-10 pb-6 px-2 md:px-0 background-lightdark">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-2xl background-image">
          <div className="m-auto logo">
            <img src={logo} alt="our logo" />
          </div>
          <div className="py-10 font-white text-center text-white">
            <div class="font-allura"><h1>Yer Town Square</h1></div>
            <div className="text-lg zw-2/5 m-auto mt-4" class="font-raleway">
              Amidst the Enchantment of Medieval Marvels: Happening Right Now
            </div>
          </div>
          <div className="flex justify-center items-center mt-4">
            <Link to="/signup" className="btn m-auto btn-style">
            Sign Up Here
            </Link>
            <Link to="/login" className="btn m-auto btn-style">
            Login Here
            </Link>
          </div>
        </div>
        <div className="min-w-screen mt-10 bg-white text-black p-20 pl-40">
          <h1 className="text-2x1" class="font-allura">A Town full of Chatter</h1>
          <div class="font-raleway sized-landing"><p>
            In an era of jesters, jongleurs, and minstrels, we bring to you a town square, online.
            Where every noble, knight, and peasant can share their thoughts. 
          </p>
          </div>
        </div>
      </div>
    )
}

export default Home;
