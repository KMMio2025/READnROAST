import { Link } from "react-router-dom";
import ReadLogoImg from "../assets/img/read.png";
import RoastLogoImg from "../assets/img/roast.png";
import {
  StyledH1,
  CreditsParagraph,
  HomeLogoImg,
  HomePageDescription,
} from "../AppStyles.js";
import React from "react";
//TO-DO
//1) change anchor elements to Links andd add valid paths
export default function HomePage() {
  return (
    <>
      <div>
        <Link to="/booksHomePage">
          <HomeLogoImg src={ReadLogoImg} alt="READ - go to the books section" />
        </Link>
        <Link to="/coffeeHomePage">
          <HomeLogoImg
            src={RoastLogoImg}
            alt="ROAST - go to the coffee section"
          />
        </Link>
      </div>
      <header>
        <StyledH1>
          Your Ultimate Destination for Books, Coffee, and Community
        </StyledH1>
      </header>

      <HomePageDescription>
        <p>
          Welcome to an online store that brings together book lovers and coffee
          enthusiasts in one unique space. Here, you can purchase your favorite
          books, discover new coffee blends, engage in meaningful discussions
          with like-minded individuals, and even contribute to a sustainable
          lifestyle by selling pre-loved items.
        </p>
      </HomePageDescription>

      <section>
        <h2>Featured Products</h2>
        <p>Coming soon...</p>
      </section>
      <footer>
        <CreditsParagraph>
          Mateusz Jędrkowiak, Karolina Kulas & Mateusz Markiewicz,Jagiellonian
          University, 2025
        </CreditsParagraph>
      </footer>
    </>
  );
}
