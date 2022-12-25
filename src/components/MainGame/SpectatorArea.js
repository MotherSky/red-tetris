import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import { Provider, useSelector } from "react-redux";
import GridBoard from "./GridBoard";
import gameReducer from "../../Slice/GameSlice";

function SpectatorArea() {
	const store = configureStore({ reducer: gameReducer });
	const game = useSelector((state) => state);

	console.log(game);
	const { playersList } = game;
	const players = playersList || [];
	return (
		<div className="my-12">
			<div>
				<h1 className="m-5 text-zinc-200 text-2xl uppercase text-center">Spectator area</h1>
			</div>
			<div className={"flex flex-col items-center gap-10"}>
				{players.map(({ uuid, username, score, x, y, grid }) => {
					return (
						<div key={uuid} className="">
							<Provider store={store}>
								<p className="text-zinc-100">
									{username} : {score} | cords: {x},{y}
								</p>
								{/* <NextBlock spectator={true} /> */}
								<GridBoard grid={grid} username={username} spectator={true} />
							</Provider>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default SpectatorArea;
