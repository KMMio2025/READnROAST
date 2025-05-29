
import ShopFilters from "../../components/ShopFilters/BooksFilters";
import BookCard from "../../components/BookCard/BookCard";
import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { fetchProducts } from "../../http";
const BooksPageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 40px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
`;

export default function BooksPage() {
    const [bookProducts, setBookProducts] = useState([]);
  
  const [filteredBooks, setFilteredBooks] = useState([]);
    useEffect(() => {
      async function loadProducts() {
        try {
          //fetching products from database
          const data = await fetchProducts({type: "book"});
          setBookProducts(data.content);
          setFilteredBooks(data.content);
        } catch (err) {
          console.error("Błąd przy pobieraniu produktów:", err);
        }
      }
  
      loadProducts();
    }, []);

  return (
    <BooksPageContainer>
      <ShopFilters items={bookProducts} onFilteredItems={setFilteredBooks} />
      
      <BooksGrid>
        {filteredBooks.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </BooksGrid>
    </BooksPageContainer>
  );
}


const sampleBooks = [
  {
    id: 1,
    type: 'book',
    name: 'Władca Pierścieni',
    description: 'Klasyczna powieść fantasy',
    quantity: 10,
    author: 'J.R.R. Tolkien',
    genre: 'FANTASY',
    language: 'POLISH',
    price: 39.99,
    images: [
      {
        id: 1,
        url: 'https://m.media-amazon.com/images/I/71jLBXtWJVL._AC_UF1000,1000_QL80_.jpg'
      }
    ]
  },
  {
    id: 2,
    type: 'book',
    name: 'Harry Potter i Kamień Filozoficzny',
    description: 'Pierwsza część serii o młodym czarodzieju',
    quantity: 15,
    author: 'J.K. Rowling',
    genre: 'FANTASY',
    language: 'POLISH',
    price: 29.99,
    images: [
      {
        id: 2,
        url: 'https://m.media-amazon.com/images/I/81q77Q39nEL._AC_UF1000,1000_QL80_.jpg'
      }
    ]
  },
  {
    id: 3,
    type: 'book',
    name: 'Zbrodnia i kara',
    description: 'Klasyczna powieść psychologiczna',
    quantity: 8,
    author: 'Fiodor Dostojewski',
    genre: 'CLASSICS',
    language: 'POLISH',
    price: 24.99,
    images: []
  },
  {
    id: 4,
    type: 'book',
    name: '1984',
    description: 'Antyutopia o totalitarnym społeczeństwie',
    quantity: 12,
    author: 'George Orwell',
    genre: 'SCIENCE_FICTION',
    language: 'ENGLISH',
    price: 32.50,
    images: []
  },
  {
    id: 5,
    type: 'book',
    name: 'W pustyni i w puszczy',
    description: 'Przygodowa powieść dla młodzieży',
    quantity: 7,
    author: 'Henryk Sienkiewicz',
    genre: 'ACTION_ADVENTURE',
    language: 'POLISH',
    price: 27.80,
    images: []
  },
  {
    id: 6,
    type: 'book',
    name: 'Metro 2033',
    description: 'Postapokaliptyczna powieść science-fiction',
    quantity: 5,
    author: 'Dmitry Glukhovsky',
    genre: 'SCIENCE_FICTION',
    language: 'POLISH',
    price: 35.20,
    images: []
  },
  {
    id: 7,
    type: 'book',
    name: 'Gra o tron',
    description: 'Pierwszy tom sagi Pieśni Lodu i Ognia',
    quantity: 9,
    author: 'George R.R. Martin',
    genre: 'FANTASY',
    language: 'ENGLISH',
    price: 42.99,
    images: []
  },
  {
    id: 8,
    type: 'book',
    name: 'Solaris',
    description: 'Klasyka science-fiction o kontakcie z obcą formą świadomości',
    quantity: 6,
    author: 'Stanisław Lem',
    genre: 'SCIENCE_FICTION',
    language: 'POLISH',
    price: 31.50,
    images: []
  }
];