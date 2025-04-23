import { styled, keyframes } from "styled-components";

export const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 40px;
  background-color: #493628;
  color: #c6946f;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;
export const AppLogoImg = styled.img`
  width: 120px;
  height: 72px;
`;

export const NavbarLeftSideContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-right: auto;
`;
export const NavbarRightSideContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;
export const SearchbarContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #6f4e37;
  border-radius: 20px;
  padding: 5px 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
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

export const NavLink = styled.a`
  position: relative;
  display: inline-block;
  color: #ffbd8d;
  text-decoration: none;
  font-size: 18px;
  padding: 10px 15px;
  transition: transform 0.3s ease, color 0.3s ease;
  animation: ${fadeInDown} 0.5s ease-out both;

  &:hover {
    color: #fff;
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

export const NavLinkLogIn = styled(NavLink)`
  padding: 10px 20px;
  background-color: #6f4e37;
  border-radius: 4px;
  transition: all 0.3s ease;
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  background: none;
  color: #ffbd8d;
  font-size: 16px;
  padding: 5px;
  width: 200px;
  transition: width 0.3s ease;

  &::placeholder {
    color: #c6946f;
  }

  &:focus {
    width: 300px;
  }
`;
