import React from "react";
import InputBox from "../components/InputBox/InputBox.jsx";
import {
  ButtonsContainer,
  TextButton,
  FullButton,
  HeaderLogoImg,
} from "./LogInPage/LoginStyles.js";
import HeaderLogo from "../assets/img/headerLogo.png";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  function handleLogInCLick() {
    navigate("/login");
  }

  return (
    <div>
      <HeaderLogoImg src={HeaderLogo} alt="Logo with text 'readnroast' " />
      <div>
        <InputBox label="First Name" required />
        <InputBox label="Second Name" required />
        <InputBox label="Email" required />
        <InputBox label="Password" required />
        <InputBox label="confirm password" required />
      </div>
      <ButtonsContainer>
        <TextButton onClick={handleLogInCLick}>
          Already have an account? Log in
        </TextButton>
        <FullButton>Register</FullButton>
      </ButtonsContainer>
    </div>
  );
}
