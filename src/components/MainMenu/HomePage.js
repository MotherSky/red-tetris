import React from "react";

function HomePage() {
  return (
    <div className="text-center uppercase w-1/3 bg-gray-800/80 rounded p-5 font-pixel text-2xl">
      <h1 className="text-white text-4xl">Welcome to Red Tetris</h1>
      <h3 className="text-white">
        Puzzle together in this modern online Tetris, Play against friends all
        over the world
      </h3>
      <p className="text-white">
        enter a username to join, or leave it blank to get a random one (bonus)
      </p>
      <input placeholder="username"></input>
      <button className="">JOIN</button>
    </div>
  );
}

export default HomePage;
