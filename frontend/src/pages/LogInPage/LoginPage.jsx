import InputBox from "../../components/InputBox/InputBox.jsx";
import HeaderLogo from "../../assets/img/headerLogo.png";
import { use, useState } from "react";
import {
  ButtonsContainer,
  TextButton,
  HeaderLogoImg,
  FullButton,
} from "./LoginStyles.js";

import { useNavigate } from "react-router-dom";

export default function LogInPage() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [error, setError] = useState();

  const navigate = useNavigate();

  //MOCK FUNCTION its just for testing hashing will be added later
  //inputs work correctly and backend gets data as it should
  async function handleLogInClick() {
    try {
      const response = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "Failed to log in");
      }
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

  return (
    <>
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

//TO-DO :
// 1. sending input into db and checking if its correct and hashing
// 2. conditionally output error message or redirect to homepage
// 3. buttons -> create new account redirects to register page
