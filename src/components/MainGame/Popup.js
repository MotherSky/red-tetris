import React from "react";
import "./MainGame.css";
import { useSelector } from "react-redux";

export default function Popup(props) {
  const gameState = useSelector((state) => state.game);
  const { isRunning, gameOver } = gameState;
  console.log(`r: ${isRunning} o: ${gameOver}`)
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
    console.log("DKHOOL");
    hidden = "";
    messageType = "over";
  } else if (!isRunning) {
    hidden = "";
    messageType = "pause";
  }

  return (
    //<div className="message-popup">
    <div className={`message-popup ${hidden}`}>
      <h1>{messages[messageType].title}</h1>
      <p>{messages[messageType].info}</p>
    </div>
  );
}
