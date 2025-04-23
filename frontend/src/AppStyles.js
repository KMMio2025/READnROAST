import { createGlobalStyle, styled } from "styled-components";
export const HomeLogoImg = styled.img`
  height: 10em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
  &:hover {
    filter: drop-shadow(0 0 2em #ce7d44);
  }
`;
export const HomePageDescription = styled.div`
  padding: 2em;
`;
export const CreditsParagraph = styled.p`
  color: #888;
`;

export const StyledH1 = styled.h1`
  font-size: 2.5em;
  color: #6f4e37;
  margin-bottom: 0.5em;
`;
export const AppWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;
const GlobalStyle = createGlobalStyle`
  body {
    background-color: rgb(247, 240, 218);
    margin: 0;
    display: flex;
    place-items: center;
    min-width: 320px;
    min-height: 100vh;
    font-family: "Noto Sans Mono", sans-serif;
    padding-top: 75px;
`;
