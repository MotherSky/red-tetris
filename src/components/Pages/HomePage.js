import React from "react";
import { useLocation } from "react-router-dom";
import GamePage from "./GamePage";

/* NEED TO MAKE IT RESPONSIVE AT MIN WIDTH */

function HomePage(props) {
  const regex = /#\w*\[\w*]/;
  const { hash } = useLocation();
  if (hash.match(regex)) {
    return <GamePage />
  }
  console.log("hash :", hash);
  return (
    <div className="bg-cubes h-screen v-screen overflow-hidden flex justify-center items-center">
      <div className="text-center uppercase w-1/3 bg-gray-800/80 rounded p-5 font-pixel text-2xl">
        <h1 className="text-white text-5xl">Welcome to Red Tetris</h1>
        <h3 className="text-zinc-500">
          Puzzle together in this modern online Tetris, Play against friends all
          over the world
        </h3>
        <p className="text-white">
          enter a username to join, or leave it blank to get a random one
          (bonus)
        </p>
        <input
          type="text"
          placeholder="username"
          className="border border-gray-300 rounded pt-2 px-1"
        />
        <p className="text-white mt-4">Now enter a room</p>
        <input
          type="text"
          placeholder="room"
          className="border border-gray-300 rounded pt-2 px-1"
        ></input>
        <button className="w-full mt-6 bg-gray-300 pt-2 hover:bg-gray-500">
          JOIN
        </button>
      </div>
    </div>
  );
}

export default HomePage;
