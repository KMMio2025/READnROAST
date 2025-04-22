import React from "react";
import InputBox from "../components/InputBox";
import "./LogInPageStyle.css";

export default function RegisterPage() {
  return (
    <div id="inputs">
      <div>
        <InputBox label="First Name" />
        <InputBox label="Second Name" />
        <InputBox label="Email" />
        <InputBox label="Password" />
        <InputBox label="confirm password" />
      </div>
      <div className="logBtns">
        <button>Already have an account? Log in</button>
        <button id="logInBtn">Register</button>
      </div>
    </div>
  );
}
