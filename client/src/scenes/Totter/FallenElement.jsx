import { Figure } from "./Figure";
import React, { useEffect, useState } from "react";

export const FallenElement = ({
  randomSlide,
  leftSideLength,
  addLeftBlock,
  stopPositions,
  slidePositionX,
}) => {
  const [slidePositionY, togglePositionY] = useState(10);
  const TIME = 100 - leftSideLength * 10;

  const fallenAction = () => {
    const stopTimeout = setTimeout(() => {
      const last = (stopPositions[slidePositionX] || 0) >= slidePositionY;
      if (last) {
        addLeftBlock({ ...randomSlide, y: slidePositionY, x: slidePositionX });
      } else {
        togglePositionY((st) => st - 1);
      }
    }, TIME * slidePositionY);

    return stopTimeout;
  };

  useEffect(() => {
    const stopTimeout = fallenAction();

    return () => {
      clearInterval(stopTimeout);
    };
  }, [slidePositionY]);

  return (
    <Figure
      {...randomSlide}
      y={slidePositionY}
      x={slidePositionX}
      key="new slide"
    />
  );
};

FallenElement.uiName = "FallenElement";
FallenElement.displayName = "FallenElement";
