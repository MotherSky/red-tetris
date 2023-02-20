import React from "react";
import "./MainGame.css";
import { useSelector } from "react-redux";

export default function Popup(props) {
  const gameState = useSelector((state) => state.game);
  const header = useSelector((state) => state.header);
  const { gameOver, winner } = gameState;
  const { gameMaster } = header;

  const messages = {
    over: {
      title: "Game Over",
      info: "The game is over, click Restart to play again",
    },
    error: {
      title: "Error",
      info: "Why is this showing??",
    },
    winner: {
      title: "Game Winner",
      info: `The game is over, the winner is "${winner?.username}" with the score "${winner?.score}"`,
    },
  };

  let messageType = "error";
  let hidden = "hidden";
  if (gameOver) {
    hidden = "";
    messageType = "over";
  } else if (winner) {
    hidden = "";
    messageType = "winner";
  }

  const handleClick = () => {
    props.restart();
  };

  return (
    //<div className="message-popup">
    <div className={`uppercase message-popup ${hidden} ${messageType}`}>
      <h1 className="text-3xl mt-3 sm:text-4xl lg:text-5xl">
        {messages[messageType].title}
      </h1>
      <p className="text-sm sm:text-lg lg:text-2xl">
        {messages[messageType].info}
      </p>
      {gameMaster ? (
        <button
          onClick={handleClick}
          className="bg-red-500 hover:bg-red-700 text-white font-bold pb-2 pt-4 px-4 rounded"
        >
          Restart
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
