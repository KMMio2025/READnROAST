import InputBox from "../components/InputBox/InputBox";
import {
  ButtonsContainer,
  TextButton,
  FullButton,
  HeaderLogoImg,
} from "./LogInPage/LoginStyles.js";
import HeaderLogo from "../assets/img/headerLogo.png";
import { useNavigate } from "react-router-dom";
import { fetchRegister } from "../http.js";
import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";

const inputFields = [
  { name: "name", label: "Username*", required: true },
  { name: "email", label: "Email*", required: true },
  { name: "password", label: "Password*", type: "password", required: true },
  { name: "firstName", label: "First Name*", required: true },
  { name: "lastName", label: "Last Name*", required: true },
  { name: "street", label: "Street" },
  { name: "city", label: "City" },
  { name: "zipCode", label: "Zip Code" },
  { name: "country", label: "Country" },
  { name: "phone", label: "Phone" },
];

export default function RegisterPage() {
  const [enteredUserDetails, setEnteredUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    zipCode: "",
    country: "",
    phone: "",
  });
  const [error, setError] = useState();
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const { isLoggedIn, logIn } = useContext(AuthContext);

  async function handleRegisterClick() {
    try {
      if (
        !isValidEmail(enteredUserDetails.email) ||
        !isValidPassword(enteredUserDetails.password)
      ) {
        setError("Incorrect email or password. Please try again");
        return;
      }
      const response = await fetchRegister(enteredUserDetails);
      navigate("/");
      logIn();
    } catch (error) {
      setError(error.message || "Failed to register, please try again");
    }
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function isValidPassword(password) {
    return password.length >= 8;
  }

  function handleUserDetailsChange(event) {
    const { name, value } = event.target;
    
    setEnteredUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    if (name === "email") {
      const isValid = value === "" || isValidEmail(value);
      setEmailValid(isValid);
    }
    
    if (name === "password") {
      const isValid = value === "" || isValidPassword(value);
      setPasswordValid(isValid);
    }
  }

  const navigate = useNavigate();
  function handleLogInCLick() {
    navigate("/login");
  }

  return (
    <div>
      {isLoggedIn && <p>You are already logged in</p>}
      {error && <p className="errorMsg">{error.message}</p>}
      <HeaderLogoImg src={HeaderLogo} alt="Logo with text 'readnroast' " />
      <div>
        {inputFields.map((field) => (
          <div key={field.name}>
            <InputBox
              label={field.label}
              value={enteredUserDetails[field.name]}
              name={field.name}
              onChange={handleUserDetailsChange}
              type={field.type || "text"}
              required={field.required || false}
            />
            {field.name === "email" && !emailValid && (
              <p style={{ color: "red", fontSize: "0.8rem", marginTop: "4px" }}>
                Please enter a valid email address
              </p>
            )}
            {field.name === "password" && !passwordValid && (
              <p style={{ color: "red", fontSize: "0.8rem", marginTop: "4px" }}>
                Password must be at least 8 characters long
              </p>
            )}
          </div>
        ))}
      </div>

      *-required fields
      <ButtonsContainer>
        <TextButton onClick={handleLogInCLick}>
          Already have an account? Log in
        </TextButton>
        <FullButton onClick={handleRegisterClick}>Register</FullButton>
      </ButtonsContainer>
    </div>
  );
}