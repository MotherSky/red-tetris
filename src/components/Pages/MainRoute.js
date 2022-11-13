import React from "react";
import GamePage from "./GamePage";
import HomePage from "./HomePage";
import { useLocation } from "react-router-dom";
import UrlError from "./UrlError";

function MainRoute() {
  const regexp = /#\w*\[\w*]/;
  const { hash, pathname } = useLocation();
  console.log(`path: ${pathname}, hash ${hash}`);
  //should fix empty strings matching
  if (pathname === "/" && hash.match(regexp)[0] === hash) {
    //console.log(hash.exec(regexp));
    return <GamePage />;
  }
  return <UrlError />;
}

export default MainRoute;
