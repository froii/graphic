import React from "react";
import styled from "styled-components";
import { savePasswordOnBD, getUserBD } from "./utils/helpers";

const SetPassword = ({ history }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, name, email } = getUserBD();
    if (password === e.target?.oldPassword?.value) {
      const newPassword = e.target?.newPassword?.value;
      savePasswordOnBD({ password: newPassword, name, email });
      alert(`You new password is ${newPassword}`);
    } else {
      alert("Old password isn`t correct");
    }
  };

  return (
    <Form id="ResetPasswordForm" onSubmit={handleSubmit}>
      <input
        type="text"
        name="oldPassword"
        placeholder="old password"
        required
      />
      <input
        type="password"
        name="newPassword"
        placeholder="new password"
        required
      />
      <button type="submit">Change Password</button>
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
