import React from "react";
import GamePage from "./GamePage";
import HomePage from "./HomePage";
import { useLocation } from "react-router-dom";

function MainRoute() {
  const regex = /#\w*\[\w*]/;
  const { hash } = useLocation();
  if (hash.match(regex)) {
    return <GamePage />;
  }
  return <HomePage />;
}

export default MainRoute;
