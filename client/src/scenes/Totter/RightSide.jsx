import React, { memo, useMemo } from "react";
import { randomNumber, randomType, checkWeight } from "./utils/helpers";
import { Figure } from "./Figure";

const randomSlide = () => {
  const posX = {};

  return () => {
    let x = randomNumber();
    posX[x] = posX[x] >= 0 ? posX[x] + 1 : 0;

    return {
      type: randomType(),
      weight: randomNumber(),
      x,
      y: posX[x],
    };
  };
};

const rightSide = new Array(randomNumber()).fill(0).map(randomSlide());

export const RightSide = memo(({ addRightWeight }) => {
  const rightSideWeight = useMemo(() => rightSide.reduce(checkWeight, 0), [
    rightSide,
  ]);
  addRightWeight(rightSideWeight);

  return rightSide.map((props, i) => (
    <Figure {...props} key={`right ${i}`} side="right" />
  ));
});

RightSide.uiName = "RightSide";
RightSide.displayName = "RightSide";
