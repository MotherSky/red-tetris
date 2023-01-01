//ZABII -- this file need to recheck
import React from "react";
import { useSelector } from "react-redux";

export default function Controls(props) {
	const isRunning = useSelector((state) => state.isRunning);
	const gameOver = useSelector((state) => state.gameOver);

	document.onkeydown = checkKey;

	function checkKey(e) {
		e = e || window.event;
		if (e.keyCode === 37) {
			if (isRunning && !gameOver) {
				props.socket.emit("goLeft");
			}
		} else if (e.keyCode === 38) {
			if (isRunning && !gameOver) {
				props.socket.emit("rotate");
			}
		} else if (e.keyCode === 39) {
			if (isRunning && !gameOver) {
				props.socket.emit("goRight");
			}
		} else if (e.keyCode === 40) {
			if (isRunning && !gameOver) {
				props.socket.emit("goDown");
			}
		}
	}

	return (
		<div className="controls">
			<button
				disabled={!isRunning || gameOver}
				className="control-button left-button"
				onClick={(e) => {
					if (isRunning && !gameOver) {
						props.socket.emit("goLeft");
					}
				}}
			>
				←
			</button>
			<button
				disabled={!isRunning || gameOver}
				className="control-button right-button"
				onClick={(e) => {
					if (isRunning && !gameOver) {
						props.socket.emit("goRight");
					}
				}}
			>
				→
			</button>
			<button
				disabled={!isRunning || gameOver}
				className="control-button up-button"
				onClick={(e) => {
					if (isRunning && !gameOver) {
						props.socket.emit("rotate");
					}
				}}
			>
				↑
			</button>
			<button
				disabled={!isRunning || gameOver}
				className="control-button down-button"
				onClick={(e) => {
					if (isRunning && !gameOver) {
						props.socket.emit("goDown");
					}
				}}
			>
				↓
			</button>
		</div>
	);
}
