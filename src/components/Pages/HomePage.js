import React from "react";
//import { generateUsername } from "unique-username-generator";
const UsernameGenerator = require("username-generator");
/* NEED TO MAKE IT RESPONSIVE AT MIN WIDTH */

function HomePage(props) {
  const joinRoom = (e) => {
    e.preventDefault();
    if (e.target.username.value === "") {
      //console.log(generateUsername("", 0, 10));
      console.log(UsernameGenerator.generateUsername(" "));
    }
    console.log(e.target.username.value, e.target.room.value);
    //this.props.history.push('/foo')
  };

  return (
    <div className="bg-cubes bg-cover h-screen v-screen overflow-hidden flex justify-center items-center">
      <div className="text-center uppercase w-1/2 md:w-1/3 2xl:w-1/4 bg-gray-800/80 rounded p-5 font-pixel md:text-xl lg:text-2xl">
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          Welcome to Red Tetris
        </h1>
        <h3 className="text-zinc-500">
          Puzzle together in this modern online Tetris, Play against friends all
          over the world
        </h3>
        <form onSubmit={joinRoom}>
          <label className="text-white block">
            enter a username to join, or leave it blank to get a random one
          </label>
          <input
            name="username"
            type="text"
            placeholder="username"
            pattern="[A-Za-z0-9_]*"
            title="Letters, Numbers and '_'"
            className="border border-gray-300 rounded pt-2 px-3 w-3/4"
          />
          <label className="text-white block mt-4">Now enter a room</label>
          <input
            name="room"
            type="text"
            placeholder="room"
            required
            pattern="[A-Za-z0-9_]*"
            className="border border-gray-300 rounded pt-2 px-3 w-3/4"
          ></input>
          <button className="w-5/6 mt-6 bg-gray-300 pt-2 hover:bg-gray-500">
            JOIN
          </button>
        </form>
      </div>
    </div>
  );
}

export default HomePage;
