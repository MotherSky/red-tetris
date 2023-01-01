import React from "react";
import { useSelector } from "react-redux";
import GridBoard from "./GridBoard";

function SpectatorArea() {
	const game = useSelector((state) => state);

	const { playersList } = game;
	const players = playersList || [];
	return (
		<div className="my-12">
			<div>
				<h1 className="m-5 text-zinc-200 text-2xl uppercase text-center">Spectator area</h1>
			</div>
			<div className={"flex flex-col items-center gap-10"}>
				{players.map(({ uuid, username, score, x, y, grid, shape, rotation }) => {
					console.log("--->", { uuid, username, score, x, y, grid, shape, rotation });
					return (
						<div key={uuid} className="">
							<p className="text-zinc-100">
								{username} : {score} | cords: {x},{y}
							</p>
							{/* <NextBlock spectator={true} /> */}
							<GridBoard grid={grid} username={username} spectator={true} shape={shape} rotation={rotation} x={x} y={y} />
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default SpectatorArea;
