import React from "react";
import Logo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";
import {
  FooterContainer,
  FooterLeftSideContainer,
  FooterRightSideContainer,
  NavLinkLogIn,
} from "./Footer.js";

export default function Footer() {

  return (
    <FooterContainer>
      <FooterLeftSideContainer>
        <i className="bx bxs-coffee-bean bean"></i>
      </FooterLeftSideContainer>
      <FooterRightSideContainer>
      <NavLinkLogIn to="/aboutUs">
             about us
         </NavLinkLogIn>
      </FooterRightSideContainer>
    </FooterContainer>
  );
}
