import React, { useMemo } from "react";
import styled from "styled-components";
import { FallenBlock } from "./FallenBlock";
import { RightSide } from "./RightSide";
import { LeftSide } from "./LeftSide";
import { connect } from "react-redux";
import { addLeftBlock, addRightWeight } from "../../actions";
import { checkWeight, randomNumber, randomType } from "./utils/helpers";

const Totter = ({ weightRight, leftSide, addLeftBlock, addRightWeight }) => {
  const randomSlide = {
    type: randomType(),
    weight: randomNumber(),
    side: "left",
  };

  const stopPositions = useMemo(
    () =>
      leftSide.reduce((res, cur) => {
        res[cur.x] = res[cur.x] >= 1 ? res[cur.x] + 1 : 1;
        return res;
      }, {}),
    [leftSide]
  );

  const weightLeft = useMemo(() => leftSide.reduce(checkWeight, 0), [leftSide]);

  const rotateTotter = weightRight - weightLeft;

  return (
    <TotterContainer>
      {rotateTotter < -30 ? (
        <strong>BOOM</strong>
      ) : (
        <Line rotate={rotateTotter / 5}>
          <FallenBlock
            key={`block number ${leftSide.length}`}
            leftSideLength={leftSide.length}
            addLeftBlock={addLeftBlock}
            randomSlide={randomSlide}
            stopPositions={stopPositions}
          />
          <LeftSide leftSide={leftSide} />
          <Center />
          <RightSide addRightWeight={addRightWeight} />
        </Line>
      )}
    </TotterContainer>
  );
};

const TotterContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 70vh auto 10vh;
  padding: 1px;
`;

const Line = styled.div`
  width: 100%;
  height: 10px;
  background: #000;
  position: relative;
  transform: rotateZ(${(p) => p.rotate}deg);
  transition: transform 1s ease-in-out 1s;
  animation: 1s ease-in-out 1 fall;

  @keyframes fall {
    0% {
      transform: rotateZ(0deg);
    }
  }
`;

const Center = styled.span`
  display: inline-block;
  width: 10%;
  height: 20px;
  position: absolute;
  left: 50%;
  top: 5px;
  transform: translateX(-50%);
  background: #bd0d0d;
`;

Totter.uiName = "Totter";
Totter.displayName = "Totter";

export default connect(
  (state) => ({
    weightRight: state.app.weightRight,
    leftSide: state.app.leftSide,
  }),
  {
    addRightWeight,
    addLeftBlock,
  }
)(Totter);
