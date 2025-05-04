import React from "react";
import Logo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";
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
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext.jsx";

export default function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <NavbarContainer>
      <div>
        <Link to="/">
          <AppLogoImg src={Logo} alt="Logo" />
        </Link>
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
      <NavLinkLogIn to="/cart">
              <i class="bx bx-cart"></i>
            </NavLinkLogIn>
        {isLoggedIn ? (
          <>
            <NavLinkLogIn to="/profile">
              <i class="bx bx-user"></i>
            </NavLinkLogIn>
            <NavLinkLogIn to="/wishlist">
              <i class="bx bx-heart"></i>
            </NavLinkLogIn>
          </>
        ) : (
          <NavLinkLogIn to="/login">LOG IN</NavLinkLogIn>
        )}
      </NavbarRightSideContainer>
    </NavbarContainer>
  );
}
