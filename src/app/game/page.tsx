"use client";

import React from "react";
import { Wrapper } from "./page.styled";
import Navbar from "@/components/layout/header";
import GameItem from "./GameItem";

const Game = () => {
  return (
    <Wrapper>
      <Navbar />
      <h2 style={{ fontSize: "55px" }}>
        <b>Fighter Cash</b>
      </h2>
      <div className="container">
        <div className="origin-bg"></div>
        <GameItem />
      </div>
    </Wrapper>
  );
};

export default Game;
