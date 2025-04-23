import Logo from "../../assets/img/logo.png";
import {
  NavbarContainer,
  AppLogoImg,
  NavbarLeftSideContainer,
  SearchbarContainer,
  NavbarRightSideContainer,
  SearchInput,
  NavLink,
  NavLinkLogIn,
} from "./NavbarStyles.js";

export default function Navbar() {
  return (
    <NavbarContainer>
      <div>
        <AppLogoImg src={Logo} alt="Logo" />
      </div>

      <NavbarLeftSideContainer>
        <NavLink href="#">Home</NavLink>
        <i className="bx bxs-coffee-bean bean"></i>
        <NavLink href="#">About</NavLink>
        <i className="bx bxs-coffee-bean bean"></i>
        <NavLink href="#">Services</NavLink>
        <i className="bx bxs-coffee-bean bean"></i>
        <NavLink href="#">Contact</NavLink>
      </NavbarLeftSideContainer>
      <SearchbarContainer>
        <SearchInput type="text" placeholder="Search..." />
        <i className="bx bx-search"></i>
      </SearchbarContainer>
      <NavbarRightSideContainer>
        <NavLinkLogIn href="#">Login</NavLinkLogIn>
      </NavbarRightSideContainer>
    </NavbarContainer>
  );
}
