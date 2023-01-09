import React from "react";
import { useSelector } from "react-redux";
import GridBoard from "./GridBoard";

function SpectatorArea() {
	const store = useSelector((state) => state.spectators);

	const playersList = store.playersList;
	const userUUID = store.uuid;
	return (
		<div className="my-12">
			<div>
				<h1 className="m-5 text-zinc-200 text-2xl uppercase text-center">Spectator area</h1>
			</div>
			<div className={"flex flex-col items-center gap-10"}>
				{playersList.map(({ uuid, username, score, x, y, grid, shape, rotation }) => {
					console.log("stectator component", { uuid, userUUID, username, score, x, y, grid, shape, rotation });
					if (userUUID !== uuid) {
						return (
							<div key={uuid} className="">
								<p className="text-zinc-100">
									{username} : {score} | cords: {x},{y}
								</p>
								{/* <NextBlock spectator={true} /> 
								USERNAME HERE NOT NEEDED*/}
								<GridBoard grid={grid} username={username} spectator={true} shape={shape} rotation={rotation} x={x} y={y} />
							</div>
						);
					}
					return "";
				})}
			</div>
		</div>
	);
}

export default SpectatorArea;
