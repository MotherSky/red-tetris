//ZABII -- this file need to recheck
import React from "react";
import { useSelector } from "react-redux";

export default function Header() {
	const game = useSelector((state) => state);
	const { inRoom, gameMaster } = game;

	console.log(game);
	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			{gameMaster ? <button className="bg-green-500 hover:bg-green-700 text-white font-bold pb-2 pt-4 px-4 rounded">Game Start</button> : ""}
			<header className="Game-header mb-8">
				<h1 className="Game-title ">{`ROOM ${inRoom || "X"}`}</h1>
			</header>
		</div>
	);
}
