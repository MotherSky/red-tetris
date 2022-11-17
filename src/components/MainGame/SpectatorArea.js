import React from "react";
import GridBoard from "./GridBoard";

function SpectatorArea({ players }) {
  return (
    <div className="my-12">
      <div>
        <h1 className="m-5 text-zinc-200 text-2xl uppercase text-center">
          Spectator area
        </h1>
      </div>
      <div className={"flex flex-col items-center gap-10"}>
        {players.map(({ id, name, score }) => {
          return (
            <div key={id} className="">
              <p className="text-zinc-100">
                {name} : {score}
              </p>
              {/* <NextBlock spectator={true} /> */}
              <GridBoard spectator={true} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SpectatorArea;
