import React from "react";

// import { moveDown, moveLeft, moveRight, rotate } from "../../actions";
import { moveDown, moveLeft, moveRight, rotate, initState, onCollision } from "../../Slice/GameSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Controls(props) {
	props.socket.emit("joinRoom", {}, (data) => {
		if (!data) {
			console.error(data);
		} else {
			dispatch(initState(data));
		}
	});
	const dispatch = useDispatch();
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

	props.socket.on("moveLeft", (data) => {
		dispatch(moveLeft(data));
	});

	props.socket.on("moveRight", (data) => {
		dispatch(moveRight(data));
	});

	props.socket.on("moveDown", (data) => {
		dispatch(moveDown(data));
	});

	props.socket.on("moveRotate", (data) => {
		dispatch(rotate(data));
	});

	props.socket.on("playerTetroCollision", (data) => {
		console.log("playerTetroCollision", data);
    dispatch(onCollision(data));
	});

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
