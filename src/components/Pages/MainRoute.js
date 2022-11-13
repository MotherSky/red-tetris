import React from "react";
import GamePage from "./GamePage";
import HomePage from "./HomePage";
import { useLocation } from "react-router-dom";
import UrlError from "./UrlError";

function extractInfo(hashURL) {
  //slice to remove first and last characters (# and ])
  const hash = hashURL.slice(1, -1);
  return hash.split("[");
}

function MainRoute() {
  const regexp = /^#\w+\[\w+]$/;
  const { hash, pathname } = useLocation();
  console.log(`path: ${pathname}, hash: ${hash}`);
  if (pathname === "/" && !hash) {
    return <HomePage />;
  }
  if (pathname === "/" && hash.match(regexp)) {
    let [roomname, username] = extractInfo(hash);
    console.log("||", roomname, username, "||");
    return <GamePage />;
  }
  return <UrlError />;
}

export default MainRoute;
