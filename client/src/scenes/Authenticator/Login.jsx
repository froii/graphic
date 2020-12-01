import React from "react";
import { savePassword, getUserBD } from "./utils/helpers";
import styled from "styled-components";

const Login = ({ history }) => {
  const login = (e) => {
    e.preventDefault();
    const { password, name, email } = getUserBD();

    if (
      password === e.target?.password?.value &&
      name === e.target?.name?.value
    ) {
      savePassword({ password, name, email });
      document.getElementById("LoginForm").reset();
      history.push("/authenticator");
    } else {
      alert("Password or name isn`t correct.");
    }
  };
  return (
    <Form onSubmit={login} id="LoginForm">
      <input type="text" name="name" placeholder="name" />
      <input type="password" name="password" placeholder="password" />
      <button type="submit">Login</button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

Login.uiName = "Login";
Login.displayName = "Login";

export default Login;
