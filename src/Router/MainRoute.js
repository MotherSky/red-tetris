import React, { useEffect, useState } from "react";
import GamePage from "../components/Pages/GamePage";
import HomePage from "../components/Pages/HomePage";
import { useLocation } from "react-router-dom";
import UrlError from "../components/Pages/UrlError";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

function extractInfo(hashURL) {
  //slice to remove first and last characters (# and ])
  const hash = hashURL.slice(1, -1);
  return hash.split("[");
}

window.addEventListener("hashchange", (event) => {
  window.location.reload();
});

function MainRoute() {
  const [error, setError] = useState();
  useEffect(() => {
    console.log("MainLayout:: constructor");
  }, []);

  const regexp = /^#\w+\[\w+]$/;
  const { hash, pathname } = useLocation();
  // console.log(useLocation());
  if (pathname === "/" && !hash) {
    return <HomePage />;
  }
  if (pathname === "/" && hash.match(regexp)) {
    let [room, username] = extractInfo(hash);

    const userUUID = uuidv4();
    const options = {
      query: {
        roomName: room,
        userUUID,
        userName: username,
      },
    };
    let socket = io("http://localhost:5000", options);

    socket.on("game-error", (message) => {
      setError(message);
    });

    return error ? (
      <UrlError title={"Error"} message={error} />
    ) : (
      <GamePage room={room} username={username} socket={socket} />
    );
  }
  return <UrlError />;
}

export default MainRoute;
