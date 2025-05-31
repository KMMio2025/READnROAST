import React, { useState, useContext, useEffect } from 'react';
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
} from './ProductPage.js'; // Ensure this path is correct for your styled components

import Read from '../../assets/img/read.png'; // Verify image paths
import Roast from '../../assets/img/roast.png'; // Verify image paths

export default function ProductPage() {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0); // For coffee, if applicable
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Base URL for fetching product details (e.g., from /api/items/{id})
  const PRODUCTS_API_BASE_URL = 'http://localhost:8080/api/items'; // Adjust if your endpoint is different
  const CART_API_BASE_URL = 'http://localhost:8080/api/cart';
  const WISHLIST_API_BASE_URL = 'http://localhost:8080/api/wishlist'; 

  // Effect to load product data if not provided via navigation state
  useEffect(() => {
    const fetchProductDetails = async () => {
      // If product is already in navigation state and matches ID, use it
      if (state?.product && state.product.id && state.product.id.toString() === id) {
        console.log("Using product from navigation state:", state.product);
        setProduct(state.product);
        // Set initial selected size if coffee and sizes exist
        if (state.product.type === 'coffee' && state.product.sizes && state.product.sizes.length > 0) {
            setSelectedSizeIndex(0);
        }
        return;
      }

      setLoading(true);
      setError('');
      console.log(`Fetching product details for ID: ${id} from ${PRODUCTS_API_BASE_URL}/${id}`);
      try {
        const token = localStorage.getItem('token');
        // Even fetching product details might require a token depending on your backend security config
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

        const response = await fetch(`${PRODUCTS_API_BASE_URL}/${id}`, { headers });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Product not found.');
          }
          throw new Error(`Failed to fetch product details: ${response.statusText} (${response.status})`);
        }

        const data = await response.json();
        console.log("Product data fetched:", data);
        setProduct(data);
        // Set initial selected size for coffee after fetching
        if (data.type === 'coffee' && data.sizes && data.sizes.length > 0) {
            setSelectedSizeIndex(0);
        }

      } catch (err) {
        console.error('Error loading product details:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id, state?.product, PRODUCTS_API_BASE_URL]); // Dependencies: URL ID, navigation state.product, API base URL

  // Display loading or not found message if product is not yet loaded or not found
  if (loading && !product) {
    return <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '24px' }}>Loading product...</div>;
  }
  if (!product) {
    return <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '24px', color: 'red' }}>Product not found or failed to load.</div>;
  }

  // Quantity control functions
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  // --- Add to Cart function (Modified) ---
  const handleAddToCart = async () => {
    console.log("Attempting to add to cart...");
    if (!isLoggedIn) {
      console.log("User not logged in, redirecting to login.");
      navigate('/login');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.log("JWT token not found in localStorage, redirecting to login.");
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const itemToAdd = {
        itemId: product.id,
        quantity: quantity,
        price: product.type == 'coffee' ?  product.prices[selectedSizeIndex] :product.price
      };
      console.log("Sending to cart backend:", itemToAdd);
      console.log("Using token:", token.substring(0, 30) + "..."); // Log partial token for privacy

      const response = await fetch(`${CART_API_BASE_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Crucial for authentication
        },
        body: JSON.stringify(itemToAdd)
      });

      console.log("Cart add response status:", response.status);

      if (response.status === 403) {
        // Forbidden status, likely due to invalid or expired token
        throw new Error('Session expired. Please log in again.');
      }

      if (!response.ok) {
        // Attempt to read error message from response body
        const errorData = await response.json();
        console.error("Backend error response:", errorData);
        throw new Error(errorData.message || 'Failed to add item to cart.');
      }

      // Success!
      setSuccess('Item added to cart successfully!');
      setTimeout(() => setSuccess(''), 3000);
      console.log("Item added successfully.");

    } catch (err) {
      console.error('Add to cart error:', err);
      setError(err.message);
      if (err.message.includes('expired') || err.message.includes('authentication')) {
        localStorage.removeItem('token'); // Clear token if session expired
        navigate('/login'); // Redirect to login
      }
    } finally {
      setLoading(false);
    }
  };

  // --- Add to Wishlist function ---
  const handleAddToWishList = async () => {
    console.log("Attempting to add to wishlist...");
    if (!isLoggedIn) {
      console.log("User not logged in for wishlist, redirecting to login.");
      navigate('/login');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.log("JWT token not found in localStorage for wishlist, redirecting to login.");
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const itemToAdd = {itemId: product.id };
      console.log("Sending to wishlist backend:", itemToAdd);

      const response = await fetch(`${WISHLIST_API_BASE_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(itemToAdd)
      });

      console.log("Wishlist add response status:", response.status);

      if (response.status === 403) {
        throw new Error('Session expired. Please log in again.');
      }

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error response for wishlist:", errorData);
        throw new Error(errorData.message || 'Failed to add item to wishlist.');
      }

      setSuccess('Item added to wishlist successfully!');
      setTimeout(() => setSuccess(''), 3000);
      console.log("Item added to wishlist successfully.");

    } catch (err) {
      console.error('Add to wishlist error:', err);
      setError(err.message);
      if (err.message.includes('expired') || err.message.includes('authentication')) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  // --- Render product parameters (remains similar, adjusted for data structure) ---
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
                {product.sizes && product.sizes.map((size, index) => (
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
          product.images && product.images.length > 0
            ? product.images[0]?.url
            : (product.type === 'book' ? Read : Roast) // Fallback images
        }
        alt={product.name}
      />
      <ProductDetails>
        <ProductTitle>{product.name}</ProductTitle>
        {product.type === 'book' && <ProductAuthor>by {product.author}</ProductAuthor>}
        <ProductPrice>
          {/* Ensure product.prices (for coffee) and product.price (for book) exist */}
          {product.type === 'coffee'
            ? product.prices && product.prices[selectedSizeIndex] ? `$${product.prices[selectedSizeIndex].toFixed(2)}` : 'N/A'
            : product.price ? `$${product.price.toFixed(2)}` : 'N/A'
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

          <AddToWishlistButton onClick={handleAddToWishList} disabled={loading || !isLoggedIn}>
            <i className='bx bx-heart'></i>
          </AddToWishlistButton>
        </QuantityControl>

        <AddToCartButton onClick={handleAddToCart} disabled={loading || !isLoggedIn}>
          {loading ? 'Adding...' : 'Add to Cart'}
        </AddToCartButton>

        {error && (
          <div style={{ color: 'red', marginTop: '10px', fontWeight: 'bold' }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ color: 'green', marginTop: '10px', fontWeight: 'bold' }}>
            {success}
          </div>
        )}
      </ProductDetails>
    </ProductContainer>
  );
}