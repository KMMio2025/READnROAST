import Logo from "../../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
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
import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext.jsx";

export default function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery && searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

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
        <StyledNavLink to="/explore">Explore</StyledNavLink>
      </NavbarLeftSideContainer>
      
      <SearchbarContainer onSubmit={handleSearch}>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <i className="bx bx-search"></i>
      </SearchbarContainer>
      
      <NavbarRightSideContainer>
        <NavLinkLogIn to="/cart">
          <i className="bx bx-cart"></i>
        </NavLinkLogIn>
        {isLoggedIn ? (
          <>
            <NavLinkLogIn to="/profile">
              <i className="bx bx-user"></i>
            </NavLinkLogIn>
            <NavLinkLogIn to="/wishlist">
              <i className="bx bx-heart"></i>
            </NavLinkLogIn>
          </>
        ) : (
          <NavLinkLogIn to="/login">LOG IN</NavLinkLogIn>
        )}
      </NavbarRightSideContainer>
    </NavbarContainer>
  );
}