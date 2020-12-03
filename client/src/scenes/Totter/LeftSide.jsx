import React, { memo } from "react";
import { Figure } from "./Figure";

export const LeftSide = memo(({ leftSide }) =>
  leftSide.map((props, i) => (
    <Figure {...props} key={`left ${i}`} side="left" />
  ))
);

LeftSide.uiName = "LeftSide";
LeftSide.displayName = "LeftSide";

export default LeftSide;
