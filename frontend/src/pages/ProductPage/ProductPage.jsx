import React, { useState, useContext } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext.jsx';
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
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const product = state?.product || 
    [...sampleBooks, ...sampleCoffee].find(item => item.id.toString() === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
  
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
  
    setLoading(true);
    setError('');
    setSuccess('');
  
    try {
      const itemToAdd = product.type === 'coffee' ? {
        itemId: product.id,  // Changed from productId to itemId to match your backend
        size: product.sizes[selectedSizeIndex],
        quantity: quantity
      } : {
        itemId: product.id,  // Changed from productId to itemId
        quantity: quantity
      };
  
      const response = await fetch('http://localhost:8080/api/cart/add', {
        method: 'POST',
        credentials: 'include',  // Important for session cookies
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(itemToAdd)
      });
  
      if (response.status === 403) {
        throw new Error('Session expired. Please login again.');
      }
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add item to cart');
      }
  
      setSuccess('Item added to cart successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Add to cart error:', err);
      setError(err.message);
      if (err.message.includes('expired') || err.message.includes('authentication')) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
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
            <i className='bx bx-heart'></i> 
            <i className='bx bxs-heart'></i> 
          </AddToWishlistButton>
        </QuantityControl>
        
        <AddToCartButton onClick={handleAddToCart} disabled={loading}>
          {loading ? 'Adding...' : 'Add to Cart'}
        </AddToCartButton>

        {error && (
          <div style={{ color: 'red', marginTop: '10px' }}>
            {error}
          </div>
        )}
        
        {success && (
          <div style={{ color: 'green', marginTop: '10px' }}>
            {success}
          </div>
        )}
      </ProductDetails>
    </ProductContainer>
  );
}