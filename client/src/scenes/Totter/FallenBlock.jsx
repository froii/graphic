import React, { useEffect, useState } from "react";
import { randomNumber } from "./utils/helpers";
import { FallenElement } from "./FallenElement";

export const FallenBlock = (props) => {
  const [slidePositionX, togglePositionX] = useState(randomNumber());

  const toggleKey = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      togglePositionX((st) => (st < 8 ? st + 1 : st));
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      togglePositionX((st) => (st > 1 ? st - 1 : 1));
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", toggleKey);
    return () => {
      document.removeEventListener("keydown", toggleKey);
    };
  }, []);

  return <FallenElement slidePositionX={slidePositionX} {...props} />;
};

FallenBlock.uiName = "FallenBlock";
FallenBlock.displayName = "FallenBlock";
