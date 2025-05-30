// src/pages/WishlistPage/WishlistPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext.jsx';

import {
  WishlistContainer,
  WishlistTitle,
  Message,
  LoginRedirectButton,
  EmptyWishlistMessage,
  WishlistContent,
  WishlistItemsList,
  ItemDetails,
  ItemName,
  ItemControls,
  RemoveItemButton,
} from './WishlistPage.js'; 

export default function WishlistPage() {
  const [Wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { isLoggedIn, logOut } = useContext(AuthContext);

  const Wishlist_API_URL = 'http://localhost:8080/api/wishlist';

  useEffect(() => {
    if (!isLoggedIn) {
      setError('You need to be logged in to view your Wishlist.');
      setLoading(false);
      return;
    }
    fetchWishlist();
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

  const fetchWishlist = async () => {
    console.log("Fetching Wishlist...");
    const data = await makeAuthenticatedRequest(Wishlist_API_URL, 'GET');
    if (data) {
      setWishlist(data);
      console.log("Wishlist fetched:", data);
    } else {
      setWishlist(null);
    }
  };

 
  const handleRemoveItem = async (itemId) => {
    console.log(`Removing item ${itemId}`);
    const result = await makeAuthenticatedRequest(
      `${Wishlist_API_URL}/remove`,
      'POST',
      { itemId }
    );
    if (result) {
      setSuccess('Item removed from Wishlist!');
      fetchWishlist();
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleClearWishlist = async () => {
    console.log("Clearing Wishlist...");
    const result = await makeAuthenticatedRequest(
      `${Wishlist_API_URL}/clear`,
      'POST'
    );
    if (result) {
      setSuccess('Wishlist cleared successfully!');
      fetchWishlist();
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  if (!isLoggedIn) {
      return (
          <WishlistContainer>
              <WishlistTitle>Shopping Wishlist</WishlistTitle>
              <Message type="error">
                  {error || 'You must be logged in to view your Wishlist.'}
                  <LoginRedirectButton onClick={() => navigate('/login')}>Go to Login</LoginRedirectButton>
              </Message>
          </WishlistContainer>
      );
  }

  if (loading && !Wishlist) {
    return (
      <WishlistContainer>
        <WishlistTitle>Shopping Wishlist</WishlistTitle>
        <Message type="info">Loading Wishlist...</Message>
      </WishlistContainer>
    );
  }

  return (
    <WishlistContainer>
      <WishlistTitle>Shopping Wishlist</WishlistTitle>

      {error && <Message type="error">{error}</Message>}
      {success && <Message type="success">{success}</Message>}

      {!Wishlist || !Wishlist.items || Wishlist.items.length === 0 ? (
        <EmptyWishlistMessage>Your Wishlist is empty.</EmptyWishlistMessage>
      ) : (
        <WishlistContent>
          <WishlistItemsList>
            {Wishlist.items.map(WishlistItem => (
              <WishlistItem key={WishlistItem.itemId}> 
              <ItemDetails>
                <ItemName>{WishlistItem.itemName}</ItemName> 
              </ItemDetails>
                <ItemControls>
                   <RemoveItemButton
                    onClick={() => handleRemoveItem(WishlistItem.itemId)}
                    disabled={loading}
                  >
                    Remove
                  </RemoveItemButton>
                </ItemControls>
                 <ClearWishlistButton
                              onClick={handleClearWishlist}
                              disabled={loading || Wishlist.items.length === 0}
                              mt="15px"
                            >
                              Clear Wishlist
                            </ClearWishlistButton>
              </WishlistItem>
            ))}
          </WishlistItemsList>

          
        </WishlistContent>
      )}
    </WishlistContainer>
  );
}