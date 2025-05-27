import ShopFilters from "../../components/ShopFilters/ShopFilters";
import BookCard from "../../components/BookCard/BookCard";
import CoffeeCard from "../../components/CoffeeCard/CoffeeCard";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchProducts } from "../../http.js";
import { useNavigate, useLocation } from "react-router-dom";

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

export default function ExplorePage() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        const products = data?.content || [];
        setAllProducts(products);
        
        // Check for search query in URL
        const searchParams = new URLSearchParams(location.search);
        const searchQuery = searchParams.get('search');
        
        if (searchQuery && searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const filtered = products.filter(item => {
            const name = item?.name?.toLowerCase() || '';
            const description = item?.description?.toLowerCase() || '';
            const author = item?.type === 'book' ? (item?.author?.toLowerCase() || '') : '';
            
            return name.includes(query) || 
                   description.includes(query) || 
                   author.includes(query);
          });
          setFilteredProducts(filtered);
        } else {
          setFilteredProducts(products);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setAllProducts([]);
        setFilteredProducts([]);
      }
    }

    loadProducts();
  }, [location.search]);

  const handleProductClick = (product) => {
    if (product?.id) {
      navigate(`/product/${product.id}`, { state: { product } });
    }
  };

  return (
    <BooksPageContainer>
      <PageTitle>Explore..</PageTitle>
      <ShopFilters items={allProducts} onFilteredItems={setFilteredProducts} />
      <BooksGrid>
        {filteredProducts.map((item) =>
          item?.type === "book" ? (
            <BookCard 
              key={item.id} 
              book={item} 
              onClick={() => handleProductClick(item)}
            />
          ) : item?.type === "coffee" ? (
            <CoffeeCard 
              key={item.id} 
              coffee={item} 
              onClick={() => handleProductClick(item)}
            />
          ) : null
        )}
      </BooksGrid>
    </BooksPageContainer>
  );
}