import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  ProductContainer,
  ProductImage,
  ProductDetails,
  ProductTitle,
  ProductAuthor,
  ProductPrice,
  ParameterRow,
  ParameterLabel,
  ParameterValue,
  SizeOptions,
  SizeOption,
  QuantityControl,
  QuantityButton,
  QuantityInput,
  AddToCartButton
} from './ProductPage.js';

import Read from '../../assets/img/read.png';
import Roast from '../../assets/img/roast.png';
const sampleBooks = [
    {
      id: 1,
      type: "book",
      name: "Władca Pierścieni",
      description: "Klasyczna powieść fantasy",
      quantity: 10,
      author: "J.R.R. Tolkien",
      genre: "FANTASY",
      language: "POLISH",
      price: 39.99,
      images: [
        {
          id: 1,
          url: "https://m.media-amazon.com/images/I/71jLBXtWJVL._AC_UF1000,1000_QL80_.jpg",
        },
      ],
    },
    {
      id: 2,
      type: "book",
      name: "Harry Potter i Kamień Filozoficzny",
      description: "Pierwsza część serii o młodym czarodzieju",
      quantity: 15,
      author: "J.K. Rowling",
      genre: "FANTASY",
      language: "POLISH",
      price: 29.99,
      images: [
        {
          id: 2,
          url: "https://m.media-amazon.com/images/I/81q77Q39nEL._AC_UF1000,1000_QL80_.jpg",
        },
      ],
    },
    {
      id: 3,
      type: "book",
      name: "Zbrodnia i kara",
      description: "Klasyczna powieść psychologiczna",
      quantity: 8,
      author: "Fiodor Dostojewski",
      genre: "CLASSICS",
      language: "POLISH",
      price: 24.99,
      images: [],
    },
    {
      id: 4,
      type: "book",
      name: "1984",
      description: "Antyutopia o totalitarnym społeczeństwie",
      quantity: 12,
      author: "George Orwell",
      genre: "SCIENCE_FICTION",
      language: "ENGLISH",
      price: 32.5,
      images: [],
    },
    {
      id: 5,
      type: "book",
      name: "W pustyni i w puszczy",
      description: "Przygodowa powieść dla młodzieży",
      quantity: 7,
      author: "Henryk Sienkiewicz",
      genre: "ACTION_ADVENTURE",
      language: "POLISH",
      price: 27.8,
      images: [],
    },
    {
      id: 6,
      type: "book",
      name: "Metro 2033",
      description: "Postapokaliptyczna powieść science-fiction",
      quantity: 5,
      author: "Dmitry Glukhovsky",
      genre: "SCIENCE_FICTION",
      language: "POLISH",
      price: 35.2,
      images: [],
    },
    {
      id: 7,
      type: "book",
      name: "Gra o tron",
      description: "Pierwszy tom sagi Pieśni Lodu i Ognia",
      quantity: 9,
      author: "George R.R. Martin",
      genre: "FANTASY",
      language: "ENGLISH",
      price: 42.99,
      images: [],
    },
    {
      id: 8,
      type: "book",
      name: "Solaris",
      description: "Klasyka science-fiction o kontakcie z obcą formą świadomości",
      quantity: 6,
      author: "Stanisław Lem",
      genre: "SCIENCE_FICTION",
      language: "POLISH",
      price: 31.5,
      images: [],
    },
  ];
  
  const sampleCoffee = [
    {
      id: 101,
      type: "coffee",
      name: "Arabica Etiopia Yirgacheffe",
      description: "Kwiatowo-owocowa kawa o delikatnej kwasowości",
      quantity: 15,
      origin: "Etiopia",
      roast: "LIGHT",
      flavour: "FRUITY",
      aroma: "FLORAL",
      acidity: "HIGH",
      mix: "ARABICA",
      numberOfSizes: 3,
      sizes: [250, 500, 1000],
      prices: [25.99, 45.99, 79.99],
      images: [],
    },
    {
      id: 102,
      type: "coffee",
      name: "Colombia Supremo",
      description: "Zbalansowana kawa o orzechowo-czekoladowym smaku",
      quantity: 20,
      origin: "Kolumbia",
      roast: "MEDIUM",
      flavour: "CHOCOLATE",
      aroma: "SWEET",
      acidity: "MEDIUM",
      mix: "ARABICA",
      numberOfSizes: 2,
      sizes: [250, 500],
      prices: [22.5, 39.99],
      images: [],
    },
    {
      id: 103,
      type: "coffee",
      name: "Brazil Santos",
      description: "Mocna kawa o ziemistym charakterze",
      quantity: 18,
      origin: "Brazylia",
      roast: "DARK",
      flavour: "NUTTY",
      aroma: "SPICY",
      acidity: "LOW",
      mix: "ARABICA",
      numberOfSizes: 3,
      sizes: [250, 500, 1000],
      prices: [19.99, 35.99, 65.99],
      images: [],
    },
    {
      id: 104,
      type: "coffee",
      name: "Mieszanka Poranna",
      description: "Mocna mieszanka na pobudzenie",
      quantity: 12,
      origin: "Mieszanka",
      roast: "DARK",
      flavour: "CHOCOLATE",
      aroma: "SPICY",
      acidity: "LOW",
      mix: "ROBUSTA",
      numberOfSizes: 2,
      sizes: [250, 500],
      prices: [27.5, 49.99],
      images: [],
    },
    {
      id: 105,
      type: "coffee",
      name: "Kenya AA",
      description: "Wyrazista kawa o winno-owocowych nutach",
      quantity: 10,
      origin: "Kenia",
      roast: "MEDIUM",
      flavour: "FRUITY",
      aroma: "FLORAL",
      acidity: "HIGH",
      mix: "ARABICA",
      numberOfSizes: 2,
      sizes: [250, 500],
      prices: [29.99, 54.99],
      images: [],
    },
    {
      id: 106,
      type: "coffee",
      name: "Decaf Colombia",
      description: "Bezkofeinowa wersja klasycznej kolumbijskiej",
      quantity: 8,
      origin: "Kolumbia",
      roast: "MEDIUM",
      flavour: "CHOCOLATE",
      aroma: "SWEET",
      acidity: "MEDIUM",
      mix: "ARABICA",
      numberOfSizes: 1,
      sizes: [250],
      prices: [24.99],
      images: [],
    },
  ];
  
  const sampleItems = [...sampleBooks, ...sampleCoffee];
export default function ProductPage() {
  const { state } = useLocation();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);

  const product = state?.product || 
    [...sampleBooks, ...sampleCoffee].find(item => item.id.toString() === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    const itemToAdd = product.type === 'coffee' ? {
      ...product,
      selectedSize: product.sizes[selectedSizeIndex],
      selectedPrice: product.prices[selectedSizeIndex],
      quantity
    } : {
      ...product,
      quantity
    };
    
    console.log('Added to cart:', itemToAdd);
  };

  const renderParameters = () => {
    if (product.type === 'book') {
      return (
        <>
          <ParameterRow>
            <ParameterLabel>Author:</ParameterLabel>
            <ParameterValue>{product.author}</ParameterValue>
          </ParameterRow>
          <ParameterRow>
            <ParameterLabel>Genre:</ParameterLabel>
            <ParameterValue>{product.genre}</ParameterValue>
          </ParameterRow>
          <ParameterRow>
            <ParameterLabel>Language:</ParameterLabel>
            <ParameterValue>{product.language}</ParameterValue>
          </ParameterRow>
          <ParameterRow>
            <ParameterLabel>Description:</ParameterLabel>
            <ParameterValue>{product.description}</ParameterValue>
          </ParameterRow>
        
        </>
      );
    } else if (product.type === 'coffee') {
      return (
        <>
          <ParameterRow>
            <ParameterLabel>Origin:</ParameterLabel>
            <ParameterValue>{product.origin}</ParameterValue>
          </ParameterRow>
          <ParameterRow>
            <ParameterLabel>Roast:</ParameterLabel>
            <ParameterValue>{product.roast}</ParameterValue>
          </ParameterRow>
          <ParameterRow>
            <ParameterLabel>Flavour:</ParameterLabel>
            <ParameterValue>{product.flavour}</ParameterValue>
          </ParameterRow>
          <ParameterRow>
            <ParameterLabel>Aroma:</ParameterLabel>
            <ParameterValue>{product.aroma}</ParameterValue>
          </ParameterRow>
          <ParameterRow>
            <ParameterLabel>Acidity:</ParameterLabel>
            <ParameterValue>{product.acidity}</ParameterValue>
          </ParameterRow>
          <ParameterRow>
            <ParameterLabel>Description:</ParameterLabel>
            <ParameterValue>{product.description}</ParameterValue>
          </ParameterRow>
          <ParameterRow>
            <ParameterLabel>Size:</ParameterLabel>
            <ParameterValue>
              <SizeOptions>
                {product.sizes.map((size, index) => (
                  <SizeOption
                    key={size}
                    active={index === selectedSizeIndex}
                    onClick={() => setSelectedSizeIndex(index)}
                  >
                    {size}g
                  </SizeOption>
                ))}
              </SizeOptions>
            </ParameterValue>

          </ParameterRow>
        </>
      );
    }
    return null;
  };

return (
    <ProductContainer>
        <ProductImage 
            src={
                product.images[0]?.url || 
                (product.type === 'book' ? Read : Roast)
            } 
            alt={product.name} 
        />
        <ProductDetails>
            <ProductTitle>{product.name}</ProductTitle>
            {product.type === 'book' && <ProductAuthor>by {product.author}</ProductAuthor>}
            <ProductPrice>
                {product.type === 'coffee' 
                    ? `$${product.prices[selectedSizeIndex].toFixed(2)}` 
                    : `$${product.price.toFixed(2)}`
                }
            </ProductPrice>
            
            {renderParameters()}
            
            <QuantityControl>
                <QuantityButton onClick={decrementQuantity}>-</QuantityButton>
                <QuantityInput 
                    type="number" 
                    min="1" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                />
                <QuantityButton onClick={incrementQuantity}>+</QuantityButton>
            </QuantityControl>
            
            <AddToCartButton onClick={handleAddToCart}>
                Add to Cart
            </AddToCartButton>
        </ProductDetails>
    </ProductContainer>
);
}