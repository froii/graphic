import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { emailValidation, sendMail, savePasswordOnBD } from "./utils/helpers";

const SetPassword = ({ history }) => {
  let { user_id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailValidation(e.target.email.value))
      return alert("Please, use correct email");

    const formValues = [...e.target].reduce((sum, { name, value }) => {
      if (name && value) sum[name] = value;
      return sum;
    }, {});
    formValues.user_id = user_id;

    sendMail("save_password", formValues)
      .then(({ password, name, email }) => {
        document.getElementById("SetPasswordForm").reset();

        savePasswordOnBD({ password, name, email });

        history.push("/authenticator/login");
      })
      .catch((err) => alert("Server doesn`t work"));
  };

  return (
    <Form id="SetPasswordForm" onSubmit={handleSubmit}>
      {/*<Form id='SetPasswordForm' action={`${emailServer}/save_password`} method='POST' >*/}
      {/*  <input type="text" name='user_id' hidden/>*/}
      <input type="text" name="name" placeholder="name" required />
      <input type="text" name="email" placeholder="email" required />
      <input type="password" name="password" placeholder="password" required />
      <button type="submit">Save Password</button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

SetPassword.uiName = "SetPassword";
SetPassword.displayName = "SetPassword";

export default SetPassword;
