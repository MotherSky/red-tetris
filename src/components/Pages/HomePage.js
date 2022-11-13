import React from "react";

/* NEED TO MAKE IT RESPONSIVE AT MIN WIDTH */

function HomePage(props) {
  return (
    <div className="bg-cubes h-screen v-screen overflow-hidden flex justify-center items-center">
      <div className="text-center uppercase w-1/3 bg-gray-800/80 rounded p-5 font-pixel text-2xl">
        <h1 className="text-white text-5xl">Welcome to Red Tetris</h1>
        <h3 className="text-zinc-500">
          Puzzle together in this modern online Tetris, Play against friends all
          over the world
        </h3>
        <form>
          <label className="text-white block">
            enter a username to join, or leave it blank to get a random one
            (bonus)
          </label>
          <input
            type="text"
            placeholder="username"
            pattern="[A-Za-z0-9*]"
            className="border border-gray-300 rounded pt-2 px-1"
          />
          <label className="text-white block mt-4">Now enter a room</label>
          <input
            type="text"
            placeholder="room"
            required
            className="border border-gray-300 rounded pt-2 px-1"
          ></input>
          <button className="w-full mt-6 bg-gray-300 pt-2 hover:bg-gray-500">
            JOIN
          </button>
        </form>
      </div>
    </div>
  );
}

export default HomePage;
