import React from "react";
import { useSelector } from "react-redux";

export default function Header(props) {
  const header = useSelector((state) => state.header);
  const gameState = useSelector((state) => state.game);
  const { inRoom, gameMaster } = header;
  const { gameStart } = gameState;

  const handleClick = () => {
    props.startGame();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {gameMaster && !gameStart ? (
        <button
          onClick={handleClick}
          className="bg-green-500 hover:bg-green-700 text-white font-bold pb-2 pt-4 px-4 rounded"
        >
          Game Start
        </button>
      ) : (
        ""
      )}
      <header className="Game-header mb-8">
        <h1 className="Game-title ">{`ROOM ${inRoom || "X"}`}</h1>
      </header>
    </div>
  );
}
