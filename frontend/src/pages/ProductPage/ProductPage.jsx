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
  AddToCartButton,
  AddToWishlistButton
} from './ProductPage.js';

import Read from '../../assets/img/read.png';
import Roast from '../../assets/img/roast.png';

  
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

            <AddToWishlistButton>
            < i class='bx  bx-heart'  ></i> 
            < i class='bx  bxs-heart'  ></i> 
            </AddToWishlistButton>
            </QuantityControl>
            
            <AddToCartButton onClick={handleAddToCart}>
                Add to Cart
            </AddToCartButton>
        </ProductDetails>
    </ProductContainer>
);
}