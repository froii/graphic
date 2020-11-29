import React, { useEffect, useState, createElement } from "react";
import styled from "styled-components";

const TIME = 400;

const rightSideQuantity = Math.floor(Math.random() * 9);

const setType = () => {
  const number = Math.floor(Math.random() * 9);
  if (number <= 3) return "triangle";
  if (number > 3 && number <= 6) return "circle";
  if (number > 6) return "rectangle";
};

const setWeight = () => Math.floor(Math.random() * 10);

const rightSide = new Array(rightSideQuantity)
  .fill(0)
  .map(() => ({ type: setType(), weight: setWeight() }));

const rightSideWeight = rightSide.reduce((sum, cur) => sum + cur.weight, 0);

export const Totter = () => {
  const [leftSide, setLeftSide] = useState([]);
  const [rotateTotter, setRotateTotter] = useState(0);

  useEffect(() => {
    let i = 1;
    let timerId = setTimeout(function run() {
      setLeftSide((st) => [...st, { type: setType(), weight: setWeight() }]);
      const left = leftSide.reduce((sum, cur) => sum + cur.weight, 0);
      setRotateTotter(rightSideWeight - left);
      if (i < 10) {
        setTimeout(run, TIME * 10 - TIME * i);
      }
      i++;
    }, TIME * 10);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <TotterContainer>
      <Line rotate={rotateTotter}>
        {leftSide.map(({ type, weight }, i) => (
          <Figure i={i} className={type} key={`left ${i}`} side="left">
            <span> {weight}kg </span>
          </Figure>
        ))}

        <Center />

        {rightSide.map(({ type, weight }, i) => (
          <Figure i={i} className={type} key={`right ${i}`} side="right">
            <span> {weight}kg </span>
          </Figure>
        ))}
      </Line>
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
  line-height: 50px;
  position: absolute;
  margin: 0 auto 10px;

  ${(p) => {
    if (p.i <= 3) {
      return `
      bottom: ${50 * p.i}px;
      ${p.side}: 0;
    `;
    }

    if (p.i > 3 && p.i <= 6) {
      return `
      bottom: ${50 * (p.i - 4)}px;
      ${p.side}: 60px;
    `;
    }

    if (p.i > 6) {
      return `
      bottom: ${50 * (p.i - 7)}px;
      ${p.side}: 120px;
    `;
    }
  }}

  &.triangle {
    width: 40px;
    border: 29px solid transparent;
    border-bottom: 40px solid #002480;
  }

  &.circle {
    width: 50px;
    border-radius: 50%;
    background: #053fe3;
  }

  &.rectangle {
    width: 60px;
    background: #5b86f6;
  }

  span {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    font-size: 1.4rem;
  }
`;

Totter.uiName = "Totter";
Totter.displayName = "Totter";
