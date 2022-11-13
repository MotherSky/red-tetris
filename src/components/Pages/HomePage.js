import React from "react";
//import { generateUsername } from "unique-username-generator";

/* NEED TO MAKE IT RESPONSIVE AT MIN WIDTH */

function HomePage(props) {
  const joinRoom = (e) => {
    e.preventDefault();
    if (e.target.username.value === "") {
      //console.log(generateUsername("", 0, 10));
    }
    console.log(e.target.username.value, e.target.room.value);
    //this.props.history.push('/foo')
  };

  return (
    <div className="bg-cubes h-screen v-screen overflow-hidden flex justify-center items-center">
      <div className="text-center uppercase w-1/3 bg-gray-800/80 rounded p-5 font-pixel text-2xl">
        <h1 className="text-white text-5xl">Welcome to Red Tetris</h1>
        <h3 className="text-zinc-500">
          Puzzle together in this modern online Tetris, Play against friends all
          over the world
        </h3>
        <form onSubmit={joinRoom}>
          <label className="text-white block">
            enter a username to join, or leave it blank to get a random one
            (bonus)
          </label>
          <input
            name="username"
            type="text"
            placeholder="username"
            pattern="[A-Za-z0-9_]*"
            title="Letters, Numbers and '_'"
            className="border border-gray-300 rounded pt-2 px-1"
          />
          <label className="text-white block mt-4">Now enter a room</label>
          <input
            name="room"
            type="text"
            placeholder="room"
            required
            pattern="[A-Za-z0-9_]*"
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
