import React from "react";
import SpectatorArea from "../MainGame/SpectatorArea";
import NextBlock from "../MainGame/NextBlock";
import ScoreBoard from "../MainGame/ScoreBoard";
import Controls from "../MainGame/Controls";
import MasterBoard from "../MainGame/MasterBoard";
import Popup from "../MainGame/Popup";
import {
  initState,
  moveDown,
  moveLeft,
  moveRight,
  rotate,
} from "../../Slice/GameSlice";
import { initHeaderState, updateGameMaster } from "../../Slice/HeaderSlice";
import {
  pushSpectators,
  onCollision,
  getSpectatorsList,
  deletePlayer,
} from "../../Slice/SpectatorsSlice";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import Header from "../MainGame/Header";

function GamePage(props) {
  const dispatch = useDispatch();
  const userUUID = uuidv4();
  const options = {
    query: {
      roomName: props.room,
      userUUID,
      userName: props.username,
    },
  };
  let socket = io("http://localhost:5000", options);
  // console.log(socket);
  socket.on("game-error", (message) => {
    console.log({ message });
  });

  socket.on("moveLeft", (data) => {
    dispatch(moveLeft(data));
  });

  socket.on("moveRight", (data) => {
    dispatch(moveRight(data));
  });

  socket.on("moveDown", (data) => {
    dispatch(moveDown(data));
  });

  socket.on("moveRotate", (data) => {
    dispatch(rotate(data));
  });

  socket.on("playerTetroCollision", (data) => {
    console.log("playerTetroCollision", data);
    dispatch(onCollision(data));
  });

  socket.on("initState", (data) => {
    dispatch(initState(data));
    dispatch(initHeaderState(data));
  });

  socket.on("initSpectatorList", (data) => {
    dispatch(getSpectatorsList(data));
  });

  socket.on("playerLeave", (data) => {
    console.log("playerLeave", data);
    dispatch(deletePlayer(data));
  });

  socket.on("playerJoinedTheRoom", (data) => {
    console.log("playerJoinedTheRoom", data);
    dispatch(pushSpectators(data));
    console.log("push spec: ", data);
  });

  socket.on("hostUpdate", (data) => {
    console.log("hostUpdate", data);
    dispatch(updateGameMaster(data));
  });

  socket.on("winner", (data) => {
    console.log("im a winner", data);
  });

  const startGame = () => {
    socket.emit("startGame", {}, (data) => {
      if (!data.success) {
        console.error(data.message);
      } else {
        console.log(data.message);
      }
    });
  };

  return (
    <div className=" bg-cubes h-screen v-screen overflow-hidden">
      <div className="grid sm:grid-cols-10 gap-10 font-pixel content-center h-screen">
        <div className="m-auto sm:col-span-7">
          <Header startGame={startGame} />
          <div className="grid grid-cols-9 gap-2 justify-items-center position-relative">
            <div className=" col-span-2 justify-self-end">
              <NextBlock />
            </div>
            <div className=" max-h-fit min-h-fit max-w-fit min-w-fit col-span-5 border border-4 border-gray-500 mb-3">
              <MasterBoard />
            </div>
            <div className="col-span-2 justify-self-end">
              <ScoreBoard />
            </div>
            <div className="col-start-3 col-span-5 m-auto">
              <Controls socket={socket} />
            </div>
            <Popup />
          </div>
        </div>
        <div className="sm:col-span-3 overflow-auto hide-scroll">
          <SpectatorArea></SpectatorArea>
        </div>
      </div>
    </div>
  );
}
export default GamePage;
