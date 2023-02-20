import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideEmoji } from "../../Slice/SpectatorsSlice";
import GridBoard from "./GridBoard";

function SpectatorArea() {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.spectators);

  const playersList = store.playersList;

  return (
    <div className="my-12 flex flex-col items-center justify-center ">
      <div>
        <h1 className="m-5 text-zinc-200 text-2xl uppercase text-center">
          Spectator area
        </h1>
      </div>
      <div className={"flex flex-col items-center gap-10 w-full"}>
        {playersList.map(
          ({
            uuid,
            username,
            score,
            x,
            y,
            grid,
            shape,
            rotation,
            lines,
            gameOver,
            winner,
            emoji,
          }) => {
            if (emoji) {
              setTimeout(() => {
                dispatch(hideEmoji(uuid));
              }, 4000);
            }
            return (
              <div
                key={uuid}
                className="uppercase  max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 w-full"
              >
                {gameOver ? (
                  <p className="text-red-400 font-semibold ">
                    this player has Lost
                  </p>
                ) : (
                  ""
                )}
                {winner ? (
                  <p className="text-green-400 font-semibold">
                    Winner of the game
                  </p>
                ) : (
                  ""
                )}
                <p className="text-black-100 font-semibold break-all text-center">
                  username : {username}
                </p>
                <p className="text-black-100 font-semibold text-center">
                  score : {score}
                </p>
                <p className="text-black-100 font-semibold text-center">
                  Lines : {lines}
                </p>
                <div className="container-grid-emoji flex gap-5 justify-center items-center">
                  <GridBoard
                    grid={grid}
                    spectator={true}
                    shape={shape}
                    rotation={rotation}
                    x={x}
                    y={y}
                    gameOver={gameOver}
                    winner={winner}
                  />
                  <div className="text-4xl">
                    {/*showEmoji ? emoji : ""*/ emoji}
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

export default SpectatorArea;
