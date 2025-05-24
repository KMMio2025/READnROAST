import React from "react";
import InputBox from "../../components/InputBox/InputBox.jsx";
import HeaderLogo from "../../assets/img/headerLogo.png";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import {
  ButtonsContainer,
  TextButton,
  HeaderLogoImg,
  FullButton,
} from "./LoginStyles.js";
import { fetchLogIn } from "../../http.js";
import { useNavigate } from "react-router-dom";

export default function LogInPage() {
  //Only two input fields so separate states for each one
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [error, setError] = useState();
  const { isLoggedIn, logIn } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogInClick() {
    try {
      if (!isValidEmail(enteredEmail) || !isValidPassword(enteredPassword)) {
        setError({ message: "Email or password incorrect, please try again" });
        return;
      }
      const message = await fetchLogIn(enteredEmail, enteredPassword);

      navigate("/");
      logIn();
    } catch (error) {
      setError({
        message: error.message || "Failed to log in, please try again.",
      });
    }
  }

  function handleRegisterClick() {
    navigate("/register");
  }

  function handleChangeEmail(event) {
    setEnteredEmail(event.target.value);
  }
  function handleChangePassword(event) {
    setEnteredPassword(event.target.value);
  }

  function isValidEmail(email) {
    // add more complex validation....
    return email.includes("@");
  }
  function isValidPassword(password) {
    return password.length >= 8;
  }

  return (
    <>
      {isLoggedIn && <p>U are already logged in</p>}
      {error && <p className="errorMsg">{error.message}</p>}
      <div>
        <HeaderLogoImg src={HeaderLogo} alt="Logo with text 'readnroast' " />
        <div>
          <div id="inputs">
            <div>
              <InputBox
                label="Email"
                onChange={handleChangeEmail}
                value={enteredEmail}
                invalid={!isValidEmail(enteredEmail)}
                required
              />
              <InputBox
                type="password"
                label="Password"
                onChange={handleChangePassword}
                value={enteredPassword}
                required
                invalid={!isValidPassword(enteredPassword)}
              />
            </div>
            <ButtonsContainer>
              <TextButton onClick={handleRegisterClick}>
                Create new account
              </TextButton>
              <FullButton onClick={handleLogInClick}>Log in</FullButton>
            </ButtonsContainer>
          </div>
        </div>
      </div>
    </>
  );
}
