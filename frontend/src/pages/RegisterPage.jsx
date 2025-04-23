import InputBox from "../components/InputBox/InputBox";
import {
  LogInContainer,
  ButtonsContainer,
  TextButton,
  FullButton,
  HeaderLogoImg,
} from "./LogInPage/LoginStyles.js";
import HeaderLogo from "../assets/img/headerLogo.png";

export default function RegisterPage() {
  return (
    <LogInContainer>
      <HeaderLogoImg src={HeaderLogo} alt="Logo with text 'readnroast' " />
      <div>
        <InputBox label="First Name" />
        <InputBox label="Second Name" />
        <InputBox label="Email" />
        <InputBox label="Password" />
        <InputBox label="confirm password" />
      </div>
      <ButtonsContainer>
        <TextButton>Already have an account? Log in</TextButton>
        <FullButton id="logInBtn">Register</FullButton>
      </ButtonsContainer>
    </LogInContainer>
  );
}
