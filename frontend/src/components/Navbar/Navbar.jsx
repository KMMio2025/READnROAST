import Logo from "../../assets/img/logo.png";
import {
  NavbarContainer,
  AppLogoImg,
  NavbarLeftSideContainer,
  SearchbarContainer,
  NavbarRightSideContainer,
  SearchInput,
  StyledNavLink,
  NavLinkLogIn,
} from "./NavbarStyles.js";

export default function Navbar() {
  return (
    <NavbarContainer>
      <div>
        <AppLogoImg src={Logo} alt="Logo" />
      </div>

      <NavbarLeftSideContainer>
        <StyledNavLink to="/">Home</StyledNavLink>
        <i className="bx bxs-coffee-bean bean"></i>
        <StyledNavLink to="/categories">Categories</StyledNavLink>
        <i className="bx bxs-coffee-bean bean"></i>
        <StyledNavLink to="/about">About</StyledNavLink>
        <i className="bx bxs-coffee-bean bean"></i>
        <StyledNavLink to="/services">Services</StyledNavLink>
      </NavbarLeftSideContainer>
      <SearchbarContainer>
        <SearchInput type="text" placeholder="Search..." />
        <i className="bx bx-search"></i>
      </SearchbarContainer>
      <NavbarRightSideContainer>
        <NavLinkLogIn to="/login">Login</NavLinkLogIn>
      </NavbarRightSideContainer>
    </NavbarContainer>
  );
}
