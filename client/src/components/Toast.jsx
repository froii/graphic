import React from "react";
import styled from "styled-components";

const DURATION = 4;

export const Toast = ({ children }) => (
  <ToastComponent>{children}</ToastComponent>
);

const ToastComponent = styled.div`
  display: inline-block;
  color: #61dafb;
  background: antiquewhite;
  padding: 30px 40px;
  border-radius: 15px;
  border: 2px solid #61dafb;
  position: fixed;
  z-index: 90;
  left: 50%;
  opacity: 0;
  top: -30%;
  transform: translate(-50%, -50%);
  font-size: 20px;

  animation-name: show_modal;
  animation-duration: ${DURATION}s;
  animation-timing-function: ease-out;
  animation-iteration-count: 1;

  @keyframes show_modal {
    0% {
      opacity: 1;
      top: 50%;
    }
    80% {
      opacity: 1;
      top: 50%;
    }
    100% {
      opacity: 0;
      top: -30%;
    }
  }
`;

Toast.uiName = "Toast";
Toast.displayName = "Toast";
