import ShopFilters from "../../components/ShopFilters/CoffeeFilters";
import CoffeeCard from "../../components/CoffeeCard/CoffeeCard";
import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { fetchProducts } from "../../http.js";

const CoffeePageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const CoffeeGrid = styled.div`
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

export default function CoffeePage() {
  const [coffeeProducts, setCoffeeProducts] = useState([]);
  const [filteredCoffeeProducts, setFilteredCoffeeProducts] = useState([]);
    useEffect(() => {
      async function loadProducts() {
        try {
          //fetching products from database
          const data = await fetchProducts({type: "coffee"});
          setCoffeeProducts(data.content);
          setFilteredCoffeeProducts(data.content);
        } catch (err) {
          console.error("Błąd przy pobieraniu produktów:", err);
        }
      }
  
      loadProducts();
    }, []);
  return (
    <CoffeePageContainer>
      <ShopFilters items={coffeeProducts} onFilteredItems={setFilteredCoffeeProducts} />
      
      <CoffeeGrid>
        {filteredCoffeeProducts.map(coffee => (
          <CoffeeCard key={coffee.id} coffee={coffee} />
        ))}
      </CoffeeGrid>
    </CoffeePageContainer>
  );
}


// const sampleCoffee = [
//   {
//     id: 101,
//     type: 'coffee',
//     name: 'Arabica Etiopia Yirgacheffe',
//     description: 'Kwiatowo-owocowa kawa o delikatnej kwasowości',
//     quantity: 15,
//     origin: 'Etiopia',
//     roast: 'LIGHT',
//     flavour: 'FRUITY',
//     aroma: 'FLORAL',
//     acidity: 'HIGH',
//     mix: 'ARABICA',
//     numberOfSizes: 3,
//     sizes: [250, 500, 1000],
//     prices: [25.99, 45.99, 79.99],
//     images: [
//     ]
//   },
//   {
//     id: 102,
//     type: 'coffee',
//     name: 'Colombia Supremo',
//     description: 'Zbalansowana kawa o orzechowo-czekoladowym smaku',
//     quantity: 20,
//     origin: 'Kolumbia',
//     roast: 'MEDIUM',
//     flavour: 'CHOCOLATE',
//     aroma: 'SWEET',
//     acidity: 'MEDIUM',
//     mix: 'ARABICA',
//     numberOfSizes: 2,
//     sizes: [250, 500],
//     prices: [22.50, 39.99],
//     images: [
//     ]
//   },
//   {
//     id: 103,
//     type: 'coffee',
//     name: 'Brazil Santos',
//     description: 'Mocna kawa o ziemistym charakterze',
//     quantity: 18,
//     origin: 'Brazylia',
//     roast: 'DARK',
//     flavour: 'NUTTY',
//     aroma: 'SPICY',
//     acidity: 'LOW',
//     mix: 'ARABICA',
//     numberOfSizes: 3,
//     sizes: [250, 500, 1000],
//     prices: [19.99, 35.99, 65.99],
//     images: []
//   },
//   {
//     id: 104,
//     type: 'coffee',
//     name: 'Mieszanka Poranna',
//     description: 'Mocna mieszanka na pobudzenie',
//     quantity: 12,
//     origin: 'Mieszanka',
//     roast: 'DARK',
//     flavour: 'CHOCOLATE',
//     aroma: 'SPICY',
//     acidity: 'LOW',
//     mix: 'ROBUSTA',
//     numberOfSizes: 2,
//     sizes: [250, 500],
//     prices: [27.50, 49.99],
//     images: [
//     ]
//   },
//   {
//     id: 105,
//     type: 'coffee',
//     name: 'Kenya AA',
//     description: 'Wyrazista kawa o winno-owocowych nutach',
//     quantity: 10,
//     origin: 'Kenia',
//     roast: 'MEDIUM',
//     flavour: 'FRUITY',
//     aroma: 'FLORAL',
//     acidity: 'HIGH',
//     mix: 'ARABICA',
//     numberOfSizes: 2,
//     sizes: [250, 500],
//     prices: [29.99, 54.99],
//     images: [
//     ]
//   },
//   {
//     id: 106,
//     type: 'coffee',
//     name: 'Decaf Colombia',
//     description: 'Bezkofeinowa wersja klasycznej kolumbijskiej',
//     quantity: 8,
//     origin: 'Kolumbia',
//     roast: 'MEDIUM',
//     flavour: 'CHOCOLATE',
//     aroma: 'SWEET',
//     acidity: 'MEDIUM',
//     mix: 'ARABICA',
//     numberOfSizes: 1,
//     sizes: [250],
//     prices: [24.99],
//     images: []
//   }
// ];