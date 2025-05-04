import { StyledH1 } from "../../AppStyles.js";
import ShopFilters from "../../components/ShopFilters/ShopFilters.tsx";
import React from "react";

export default function BooksPage() {
  // jakies losowe ksiazki na potrzeby testowamnia 
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
      images: []
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
      images: []
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

  const [filteredItems, setFilteredItems] = React.useState(sampleBooks);

  React.useEffect(() => {
    setFilteredItems(sampleBooks);
  }, []);

  return (
    <>
      <ShopFilters 
        items={sampleBooks} 
        onFilteredItems={setFilteredItems} 
      />
      
      
      <div>
        {filteredItems.map(book => (
          <div key={book.id}>
            <h3>{book.name}</h3>
            <p>{book.author} - {book.price} zł</p>
          </div>
        ))}
      </div>
    </>
  );
}