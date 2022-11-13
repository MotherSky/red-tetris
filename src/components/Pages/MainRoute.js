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
  const regexp = /#\w*\S\[\w*\S]/;
  const { hash, pathname } = useLocation();
  let hashMatch;
  if (hash.match(regexp)) {
    hashMatch = hash.match(regexp)[0];
  }
  console.log(`path: ${pathname}, hash: ${hash}, hashmatch: ${hashMatch}`);
  if (pathname === "/" && !hash) {
    return <HomePage />;
  }
  if (pathname === "/" && hashMatch === hash) {
    let [roomname, username] = extractInfo(hashMatch);
    console.log("||", roomname, username, "||");
    return <GamePage />;
  }
  return <UrlError />;
}

export default MainRoute;
