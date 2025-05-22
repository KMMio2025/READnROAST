import CoffeeImg from "../../assets/img/coffee2.png";
import BooksImg from "../../assets/img/2.png";
import { StyledNavLink } from "../../components/Navbar/NavbarStyles.js";

import {
  ColumnContainer,
  CategoryContainer,
  Image,
  NoPaddingWrapper,
  Overlay,
} from "./CategoriesStyles.js";
import React from "react";
export default function CategoriesPage() {
  return (
    <NoPaddingWrapper>
      <CategoryContainer>
        <ColumnContainer>
          <Image src={CoffeeImg} alt="coffee" />
          <Overlay className="overlay">
            <StyledNavLink to="/coffeeHomePage">coffee</StyledNavLink>
            <p>
              Discover the aroma of freshly ground beans from the world’s finest
              plantations. Perfect for mornings, afternoon chats, and quiet
              moments. Find your favorite blend and start your day with energy.
            </p>
          </Overlay>
        </ColumnContainer>
        <ColumnContainer>
          <Image src={BooksImg} alt="books" />
          <Overlay className="overlay">
            <StyledNavLink to="/booksHomePage">books</StyledNavLink>
            <p>
              Dive into a world of inspiring stories and unforgettable
              characters. A good book is the perfect companion for any evening.
              Explore titles that will stay with you long after the last page.
            </p>
          </Overlay>
        </ColumnContainer>
      </CategoryContainer>
    </NoPaddingWrapper>
  );
}
