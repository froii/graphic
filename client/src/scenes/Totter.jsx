import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";

const TIME = 400;

const randomNumber = () => Math.floor(Math.random() * 10);

const randomSlide = () => ({
  type: setType(),
  weight: randomNumber(),
  x: randomNumber(),
  y: 1,
});

const setType = () => {
  const number = randomNumber();
  if (number <= 3) return "triangle";
  if (number > 3 && number <= 6) return "circle";
  if (number > 6) return "rectangle";
};

const rightSide = new Array(randomNumber() || 6).fill(0).map(randomSlide);

const rightSideWeight = rightSide.reduce(
  (sum, cur) => sum + cur.weight * cur.x,
  0
);

const setSlides = (sides, side) => {
  let posX = {};
  return sides.map(({ type, weight, x }, i) => {
    posX[x] = posX[x] >= 0 ? posX[x] + 1 : 0;
    return (
      <Figure
        w={weight * 2}
        vert={posX[x]}
        hor={x}
        className={type}
        key={`${side} ${i}`}
        side={side}
      >
        <span> {weight} </span>
      </Figure>
    );
  });
};

const Totter = () => {
  const [leftSide, setLeftSide] = useState([]);
  const [rotateTotter, setRotateTotter] = useState(0);

  useEffect(() => {
    const left = leftSide.reduce(
      (sum, cur) => sum + (cur.weight / cur.x) * 6,
      0
    );
    setRotateTotter(rightSideWeight - left);
  }, [leftSide]);

  useEffect(() => {
    let i = 1;
    let timerId = setTimeout(function run() {
      setLeftSide((st) => [...st, randomSlide()]);
      if (i < 10) {
        setTimeout(run, TIME * 10 - TIME * i);
      }
      i++;
    }, TIME * 10);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const setLeftSlidesMemo = useMemo(() => setSlides(leftSide, "left"), [
    leftSide,
  ]);
  const setRightSlidesMemo = useMemo(() => setSlides(rightSide, "right"), [
    rightSide,
  ]);

  return (
    <TotterContainer>
      {rotateTotter < -30 ? (
        <strong>BOOM</strong>
      ) : (
        <Line rotate={rotateTotter / 5}>
          {setLeftSlidesMemo}
          <Center />
          {setRightSlidesMemo}
        </Line>
      )}
    </TotterContainer>
  );
};

const TotterContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 50vh auto;
  padding: 1px;
`;

const Line = styled.div`
  width: 100%;
  height: 10px;
  background: #000;
  position: relative;
  transform: rotateZ(${(p) => p.rotate}deg);
  transition: transform 1s ease-in-out 1s;
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

const Figure = styled.span`
  display: inline-block;
  height: 50px;
  width: 50px;
  position: absolute;
  margin: 0 auto 10px;
  animation: 1s ease-in-out 1 fall;
  transition: bottom 1s ease-in-out;

  @keyframes fall {
    0% {
      bottom: 3000px;
    }
    70% {
      bottom: 1000px;
    }
  }

  ${(p) => `
     bottom: ${50 * p.vert}px;
     ${p.side}: ${50 * p.hor}px;`}}

  &::after {
    content: '';
    position: absolute;
    transform: translateX(-50%);
    bottom: 0;
  }

  &.triangle::after {
    border-left:  ${(p) => 10 + p.w}px solid transparent;
    border-right:  ${(p) => 10 + p.w}px solid transparent;
    border-bottom:  ${(p) => 20 + p.w}px solid #002480;
  }
  
  &.circle::after  {
    height: ${(p) => 20 + p.w}px;;
    width: ${(p) => 20 + p.w}px;
    border-radius: 50%;
    background: #053fe3;
  }

  &.rectangle::after  { 
    height: ${(p) => 20 + p.w}px;
    width: ${(p) => 30 + p.w}px;
    background: #5b86f6;
  }

  span {
    position: absolute;
    bottom: 3px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    font-size: 1.2rem;
    z-index: 2;
  }
`;

Totter.uiName = "Totter";
Totter.displayName = "Totter";

export default Totter;
