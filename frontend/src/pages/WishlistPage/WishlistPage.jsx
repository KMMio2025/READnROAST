// src/pages/wishlistPage/wishlistPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext.jsx';

// Import styled components
import {
  wishlistContainer,
  wishlistTitle,
  Message,
  LoginRedirectButton,
  EmptywishlistMessage,
  wishlistContent,
  wishlistItemsList,
  wishlistItem,
  ItemDetails,
  ItemName,
  ItemPricePerUnit, // Adjusted for consistent price
  ItemControls,
  QuantityButton,
  QuantityInput,
  ItemTotalPrice,
  RemoveItemButton,
  wishlistSummary,
  SummaryTitle,
  SummaryRow,
  TotalPrice,
  ClearwishlistButton,
  CheckoutButton
} from './wishlistPage.js'; 

export default function wishlistPage() {
  const [wishlist, setwishlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { isLoggedIn, logOut } = useContext(AuthContext);

  const wishlist_API_URL = 'http://localhost:8080/api/wishlist';

  useEffect(() => {
    if (!isLoggedIn) {
      setError('You need to be logged in to view your wishlist.');
      setLoading(false);
      return;
    }
    fetchwishlist();
  }, [isLoggedIn]);

  const makeAuthenticatedRequest = async (url, method = 'GET', body = null) => {
    setLoading(true);
    setError('');
    setSuccess('');

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No JWT token found, redirecting to login.');
      navigate('/login');
      return null;
    }

    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      const options = {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
      };

      const response = await fetch(url, options);

      if (response.status === 403) {
        console.error('API Error: 403 Forbidden - Session expired or invalid token.');
        setError('Session expired. Please log in again.');
        localStorage.removeItem('token');
        logOut();
        navigate('/login');
        return null;
      }

      if (!response.ok) {
        const errorData = await response.json();
        console.error(`API Error: ${response.status} -`, errorData);
        // Display a more user-friendly message if the backend sends one
        throw new Error(errorData.message || `API request failed with status: ${response.status}`);
      }

      const text = await response.text();
      return text ? JSON.parse(text) : {};
    } catch (err) {
      console.error('Error during authenticated request:', err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchwishlist = async () => {
    console.log("Fetching wishlist...");
    const data = await makeAuthenticatedRequest(wishlist_API_URL, 'GET');
    if (data) {
      setwishlist(data);
      console.log("wishlist fetched:", data);
    } else {
      setwishlist(null);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(itemId);
      return;
    }

    console.log(`Updating item ${itemId} to quantity ${newQuantity}`);
    const result = await makeAuthenticatedRequest(
      `${wishlist_API_URL}/update`,
      'POST',
      { itemId, quantity: newQuantity }
    );
    if (result) {
      setSuccess('Item quantity updated!');
      fetchwishlist();
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleRemoveItem = async (itemId) => {
    console.log(`Removing item ${itemId}`);
    const result = await makeAuthenticatedRequest(
      `${wishlist_API_URL}/remove`,
      'POST',
      { itemId }
    );
    if (result) {
      setSuccess('Item removed from wishlist!');
      fetchwishlist();
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleClearwishlist = async () => {
    console.log("Clearing wishlist...");
    const result = await makeAuthenticatedRequest(
      `${wishlist_API_URL}/clear`,
      'POST'
    );
    if (result) {
      setSuccess('wishlist cleared successfully!');
      fetchwishlist();
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  if (!isLoggedIn) {
      return (
          <wishlistContainer>
              <wishlistTitle>Shopping wishlist</wishlistTitle>
              <Message type="error">
                  {error || 'You must be logged in to view your wishlist.'}
                  <LoginRedirectButton onClick={() => navigate('/login')}>Go to Login</LoginRedirectButton>
              </Message>
          </wishlistContainer>
      );
  }

  if (loading && !wishlist) {
    return (
      <wishlistContainer>
        <wishlistTitle>wishlist</wishlistTitle>
        <Message type="info">Loading wishlist...</Message>
      </wishlistContainer>
    );
  }

  return (
    <wishlistContainer>
      <wishlistTitle>wishlist</wishlistTitle>

      {error && <Message type="error">{error}</Message>}
      {success && <Message type="success">{success}</Message>}

      {!wishlist || !wishlist.items || wishlist.items.length === 0 ? (
        <EmptywishlistMessage>Your wishlist is empty.</EmptywishlistMessage>
      ) : (
        <wishlistContent>
          <wishlistItemsList>
            {wishlist.items.map(wishlistItem => (
              <wishlistItem key={wishlistItem.itemId}> 
              <ItemDetails>
                <ItemName>{wishlistItem.itemName}</ItemName> 
                <ItemPricePerUnit>${(wishlistItem.price || 0)} / unit</ItemPricePerUnit> 
              </ItemDetails>
                <ItemControls>
                  
                  <ItemTotalPrice>${(wishlistItem.price)}</ItemTotalPrice>
                  <RemoveItemButton
                    onClick={() => handleRemoveItem(wishlistItem.itemId)}
                    disabled={loading}
                  >
                    Remove
                  </RemoveItemButton>
                </ItemControls>
              </wishlistItem>
            ))}
          </wishlistItemsList>

          
        </wishlistContent>
      )}
    </wishlistContainer>
  );
}