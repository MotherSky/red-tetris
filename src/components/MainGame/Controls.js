//ZABII -- this file need to recheck
import React from "react";
import { useSelector } from "react-redux";

export default function Controls(props) {
  const gameStart = useSelector((state) => state.game.gameStart);
  const gameOver = useSelector((state) => state.game.gameOver);

  document.onkeydown = checkKey;

  function checkKey(e) {
    e = e || window.event;
    if (e.keyCode === 37) {
      if (gameStart && !gameOver) {
        props.socket.emit("goLeft");
      }
    } else if (e.keyCode === 38) {
      if (gameStart && !gameOver) {
        props.socket.emit("rotate");
      }
    } else if (e.keyCode === 39) {
      if (gameStart && !gameOver) {
        props.socket.emit("goRight");
      }
    } else if (e.keyCode === 40) {
      if (gameStart && !gameOver) {
        props.socket.emit("goDown");
      }
    }
  }

  

  return (
    <div className="controls">
      <div className="flex space-x-2 justify-center">
        <div>
          <h1 className="m-5 text-zinc-200 text-2xl uppercase text-center">
            emox chat
          </h1>
          <button
            type="button"
            className="inline-block px-4 py-2.5 bg-blue-600 text-white text-xs  uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={(e) => {
              if (gameStart && !gameOver) {
                props.socket.emit("chat", "😀");
              }
            }}
          >
            <span style={{fontSize: "39px"}}>😀</span>
          </button>
          <button
            type="button"
            className="inline-block px-4 py-2.5 bg-purple-600 text-white font-medium text-xs  uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={(e) => {
              if (!gameOver) {
                props.socket.emit("chat", "😂");
              }
            }}
          >
            <span style={{fontSize: "39px"}}>😂</span>
          </button>
          <button
            type="button"
            className="inline-block px-4 py-2.5 bg-green-500 text-white font-medium text-xs  uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
            onClick={(e) => {
              if (!gameOver) {
                props.socket.emit("chat", "💩");
              }
            }}
          >
            <span style={{fontSize: "39px"}}>💩</span>
          </button>
          <button
            type="button"
            className="inline-block px-4 py-2.5 bg-red-600 text-white font-medium text-xs  uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={(e) => {
              if (!gameOver) {
                props.socket.emit("chat", "😱");
              }
            }}
          >
            <span style={{fontSize: "39px"}}>😱</span>
          </button>
          <button
            type="button"
            className="inline-block px-4 py-2.5 bg-yellow-500 text-white font-medium text-xs  uppercase rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out"
            onClick={(e) => {
              if (!gameOver) {
                props.socket.emit("chat", "🤬");
              }
            }}
          >
            <span style={{fontSize: "39px"}}>🤬</span>
          </button>
          <button
            type="button"
            className="inline-block px-4 py-2.5 bg-blue-400 text-white font-medium text-xs  uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
            onClick={(e) => {
              if (!gameOver) {
                props.socket.emit("chat", "😈");
              }
            }}
          >
            <span style={{fontSize: "39px"}}>😈</span>
          </button>
        </div>
      </div>
    </div>
  );
}
