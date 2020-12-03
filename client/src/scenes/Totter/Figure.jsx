import React from "react";
import styled from "styled-components";

export const Figure = ({ weight, type, x, y, side = "left" }) => (
  <FigureStyled w={weight * 2} vert={y} hor={x} className={type} side={side}>
    <span> {weight} </span>
  </FigureStyled>
);

const FigureStyled = styled.span`
  display: inline-block;
  height: 40px;
  width: 50px;
  position: absolute;
  margin: 0 auto;

  ${(p) =>
    p.side === "right" &&
    `
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
  `}

  ${(p) => `
     bottom: ${40 * p.vert + 10}px;
     ${p.side}: ${50 * p.hor}px;`}

  &::after {
    content: "";
    position: absolute;
    transform: translateX(-50%);
    bottom: 0;
  }

  &.triangle::after {
    border-left: ${(p) => 10 + p.w}px solid transparent;
    border-right: ${(p) => 10 + p.w}px solid transparent;
    border-bottom: ${(p) => 20 + p.w}px solid #002480;
  }

  &.circle::after {
    height: ${(p) => 20 + p.w}px;
    width: ${(p) => 20 + p.w}px;
    border-radius: 50%;
    background: #053fe3;
  }

  &.rectangle::after {
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

Figure.uiName = "Figure";
Figure.displayName = "Figure";

export default Figure;
