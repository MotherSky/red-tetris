import React from "react";
import "./MainGame.css";
import { useSelector } from "react-redux";

export default function Popup(props) {
  const gameState = useSelector((state) => state);
  const { isRunning, gameOver } = gameState;
  const messages = {
    pause: {
      title: "Game Paused",
      info: "The game is Paused, press Resume to continue playing",
    },
    over: {
      title: "Game Over",
      info: "The game is over, click Restart to play again",
    },
    error: {
      title: "Error",
      info: "Why is this showing??",
    },
  };

  let messageType = "error";
  let hidden = "hidden";
  if (gameOver) {
    hidden = "";
    messageType = "over";
  } else if (!isRunning) {
    hidden = "";
    messageType = "pause";
  }
  return (
    //<div className="message-popup">
    <div className={`uppercase message-popup ${hidden} ${messageType}`}>
      <h1 className="text-3xl mt-3 sm:text-4xl lg:text-5xl">
        {messages[messageType].title}
      </h1>
      <p className="text-sm sm:text-lg lg:text-2xl">
        {messages[messageType].info}
      </p>
    </div>
  );
}
