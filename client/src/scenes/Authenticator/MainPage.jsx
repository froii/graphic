import React from "react";
import styled from "styled-components";
import { getUser, sendMail } from "./utils/helpers";

const SomePage = ({}) => {
  const user = getUser();
  return (
    <>
      <p>Hi {user.name || "NO Name"} </p>
      <Button onClick={() => sendMail("change_password", user)}>
        do you want change password ?{" "}
      </Button>
    </>
  );
};

const Button = styled.button`
  border: 1px solid red;
  padding: 5px 10px;
  margin: 15px auto;
  border-radius: 6px;

  &:hover {
    border: 1px solid blue;
  }
`;

SomePage.uiName = "SomePage";
SomePage.displayName = "SomePage";

export default SomePage;
