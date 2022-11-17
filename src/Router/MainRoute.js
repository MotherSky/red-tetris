import React from "react";
import GamePage from "../components/Pages/GamePage";
import HomePage from "../components/Pages/HomePage";
import { useLocation } from "react-router-dom";
import UrlError from "../components/Pages/UrlError";
import { io } from "socket.io-client";

function extractInfo(hashURL) {
  //slice to remove first and last characters (# and ])
  const hash = hashURL.slice(1, -1);
  return hash.split("[");
}

function MainRoute() {
  const regexp = /^#\w+\[\w+]$/;
  const { hash, pathname } = useLocation();
  if (pathname === "/" && !hash) {
    return <HomePage />;
  }
  if (pathname === "/" && hash.match(regexp)) {
    let [room, username] = extractInfo(hash);
    // const socket = io("http://localhost:3001");
    // socket.emit("init-game", username, room);
    // socket.on("send-game", (str) => {
    //   console.log(str)
    // })
    return <GamePage />;
  }
  return <UrlError />;
}

export default MainRoute;
