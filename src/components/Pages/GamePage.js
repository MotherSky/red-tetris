import React from "react";
import SpectatorArea from "../MainGame/SpectatorArea";
import NextBlock from "../MainGame/NextBlock";
import ScoreBoard from "../MainGame/ScoreBoard";
import Controls from "../MainGame/Controls";
import MasterBoard from "../MainGame/MasterBoard";
import Popup from "../MainGame/Popup";
import {
  gameStarted,
  gameWinner,
  initState,
  update,
} from "../../Slice/GameSlice";
import { initHeaderState, updateGameMaster } from "../../Slice/HeaderSlice";
import {
  pushSpectators,
  onCollision,
  getSpectatorsList,
  deletePlayer,
  showEmoji,
} from "../../Slice/SpectatorsSlice";
import { useDispatch } from "react-redux";
import Header from "../MainGame/Header";
import { audioPlay, audioStop } from "../../Slice/GameSlice";

function GamePage({ socket }) {
  const dispatch = useDispatch();
  if (socket) {
    socket.on("moveLeft", (data) => {
      dispatch(update(data));
    });

    socket.on("moveRight", (data) => {
      dispatch(update(data));
    });

    socket.on("moveDown", (data) => {
      dispatch(update(data));
    });

    socket.on("moveRotate", (data) => {
      dispatch(update(data));
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
      // console.log("playerLeave", data);
      dispatch(deletePlayer(data));
    });

    socket.on("playerJoinedTheRoom", (data) => {
      // console.log("playerJoinedTheRoom", data);
      dispatch(pushSpectators(data));
    });

    socket.on("hostUpdate", (data) => {
      // console.log("hostUpdate", data);
      dispatch(updateGameMaster(data));
    });

    socket.on("winner", (data) => {
      // console.log("im a winner", data);
      dispatch(gameWinner(data));
    });

    socket.on("emox", (data) => {
      // console.log("emit emox", data);
      dispatch(showEmoji(data));
    });

    socket.on("onPlayMode", () => {
      dispatch(gameStarted());
      dispatch(audioStop());
    });
  }

  const startGame = () => {
    socket.emit("startGame", {}, (data) => {
      if (!data.success) {
        console.error(data.message);
      } else {
        console.log(data.message);
        dispatch(gameStarted());
        dispatch(audioPlay());
      }
    });
  };

  return (
    <div className=" bg-cubes h-screen v-screen overflow-hidden">
      <div className="grid sm:grid-cols-10 gap-10 font-pixel content-center h-screen">
        {
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
        }
        <div className="sm:col-span-3 overflow-auto hide-scroll">
          <SpectatorArea socket={socket}></SpectatorArea>
        </div>
      </div>
    </div>
  );
}
export default GamePage;
