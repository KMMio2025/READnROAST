import { Link } from "react-router-dom";
import { styled, keyframes } from "styled-components";

export const FooterContainer = styled.nav`
  size: 100%;
  width: 100%;
  height: 40px;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color:rgb(255, 255, 255);
  padding: 10px;
  color: #c6946f;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;
export const FooterLeftSideContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-right: auto;
`;
export const FooterRightSideContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-left: auto;
  margin-right: 20px;
`;

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const StyledNavLink = styled(Link)`
  position: relative;
  display: inline-block;
  color: #493628;
  text-decoration: none;
  font-size: 18px;
  padding: 10px 15px;
  transition: transform 0.3s ease, color 0.3s ease;
  animation: ${fadeInDown} 0.5s ease-out both;

  &:hover {
    color: #ffbd8d;
    transform: translateY(-3px);
  }

  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 5px;
    left: 50%;
    background-color: #fff;
    transform: translateX(-50%);
    transition: all 0.3s ease;
  }

  &:hover::after {
    width: 60%;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const NavLinkLogIn = styled(StyledNavLink)`
  padding: 10px 20px;
  background-color:rgb(255, 255, 255);
  border-radius: 4px;
  transition: all 0.3s ease;
`;


