import React, { useEffect } from "react";
import GamePage from "../components/Pages/GamePage";
import HomePage from "../components/Pages/HomePage";
import { useLocation } from "react-router-dom";
import UrlError from "../components/Pages/UrlError";

function extractInfo(hashURL) {
  //slice to remove first and last characters (# and ])
  const hash = hashURL.slice(1, -1);
  return hash.split("[");
}

function MainRoute() {
  useEffect(() => {
    console.log("MainLayout:: constructor");
  }, []);

  const regexp = /^#\w+\[\w+]$/;
  const { hash, pathname } = useLocation();
  console.log(useLocation());
  if (pathname === "/" && !hash) {
    return <HomePage />;
  }
  if (pathname === "/" && hash.match(regexp)) {
    let [room, username] = extractInfo(hash);

    return <GamePage room={room} username={username} />;
  }
  return <UrlError />;
}

export default MainRoute;
