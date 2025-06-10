
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext.jsx';

import {
  CartContainer,
  CartTitle,
  Message,
  LoginRedirectButton,
  EmptyCartMessage,
  CartContent,
  CartItemsList,
  CartItem,
  ItemDetails,
  ItemName,
  ItemPricePerUnit, 
  ItemControls,
  QuantityButton,
  QuantityInput,
  ItemTotalPrice,
  RemoveItemButton,
  CartSummary,
  SummaryTitle,
  SummaryRow,
  TotalPrice,
  ClearCartButton,
  CheckoutButton
} from './CartPage.js'; 

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [cartTotal, setCartTotal] = useState(0);
  const navigate = useNavigate();
  const { isLoggedIn, logOut } = useContext(AuthContext);

  const CART_API_URL = 'http://localhost:8080/api/cart';

  useEffect(() => {
    if (!isLoggedIn) {
      setError('You need to be logged in to view your cart.');
      setLoading(false);
      return;
    }
    fetchCart();
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

  const calculateTotalPrice = (items) => {
    let totalPrice = 0;
    if (!items || items.length === 0) return 0;
    items.forEach(item => {
      totalPrice += (item.price) * item.quantity;
    });
    return parseFloat(totalPrice.toFixed(2));
  };
  
  const fetchCart = async () => {
    console.log("Fetching cart...");
    const data = await makeAuthenticatedRequest(CART_API_URL, 'GET');
    if (data) {
      setCart(data);
      setCartTotal(calculateTotalPrice(data.items));
      console.log("Cart fetched:", data);
    } else {
      setCart(null);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(itemId);
      return;
    }
    
    console.log(`Updating item ${itemId} to quantity ${newQuantity}`);
    const result = await makeAuthenticatedRequest(
      `${CART_API_URL}/update`,
      'POST',
      { itemId, quantity: newQuantity }
    );
    if (result) {
      setSuccess('Item quantity updated!');
      fetchCart();
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleRemoveItem = async (itemId) => {
    console.log(`Removing item ${itemId}`);
    const result = await makeAuthenticatedRequest(
      `${CART_API_URL}/remove`,
      'POST',
      { itemId }
    );
    if (result) {
      setSuccess('Item removed from cart!');
      fetchCart();
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleClearCart = async () => {
    console.log("Clearing cart...");
    const result = await makeAuthenticatedRequest(
      `${CART_API_URL}/clear`,
      'POST'
    );
    if (result) {
      setSuccess('Cart cleared successfully!');
      fetchCart();
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  if (!isLoggedIn) {
      return (
          <CartContainer>
              <CartTitle>Shopping Cart</CartTitle>
              <Message type="error">
                  {error || 'You must be logged in to view your cart.'}
                  <LoginRedirectButton onClick={() => navigate('/login')}>Go to Login</LoginRedirectButton>
              </Message>
          </CartContainer>
      );
  }

  if (loading && !cart) {
    return (
      <CartContainer>
        <CartTitle>Shopping Cart</CartTitle>
        <Message type="info">Loading cart...</Message>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <CartTitle>Shopping Cart</CartTitle>

      {error && <Message type="error">{error}</Message>}
      {success && <Message type="success">{success}</Message>}

      {!cart || !cart.items || cart.items.length === 0 ? (
        <EmptyCartMessage>Your cart is empty.</EmptyCartMessage>
      ) : (
        <CartContent>
          <CartItemsList>
            {cart.items.map(cartItem => (
              <CartItem key={cartItem.itemId}> 
                <ItemDetails>
                  <ItemName>{cartItem.itemName}</ItemName> 
                  <ItemPricePerUnit>${(cartItem.price || 0).toFixed(2)} / unit</ItemPricePerUnit> 
                </ItemDetails>
                <ItemControls>
                  <QuantityButton
                    onClick={() => handleUpdateQuantity(cartItem.itemId, cartItem.quantity - 1)}
                    disabled={loading || cartItem.quantity <= 1}
                  >
                    -
                  </QuantityButton>
                  <QuantityInput
                    type="number"
                    value={cartItem.quantity}
                    min="1"
                    onChange={(e) => handleUpdateQuantity(cartItem.itemId, parseInt(e.target.value) || 1)}
                    disabled={loading}
                  />
                  <QuantityButton
                    onClick={() => handleUpdateQuantity(cartItem.itemId, cartItem.quantity + 1)}
                    disabled={loading}
                  >
                    +
                  </QuantityButton>
                  <ItemTotalPrice>${((cartItem.price || 0) * cartItem.quantity).toFixed(2)}</ItemTotalPrice>
                  <RemoveItemButton
                    onClick={() => handleRemoveItem(cartItem.itemId)}
                    disabled={loading}
                  >
                    Remove
                  </RemoveItemButton>
                </ItemControls>
              </CartItem>
            ))}
          </CartItemsList>

          <CartSummary>
            <SummaryTitle>Cart Summary</SummaryTitle>
            <SummaryRow>
              <span>Total Items:</span>
              <span>{cart.items.reduce((acc, item) => acc + item.quantity, 0)}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Total Price:</span>
              <TotalPrice>${cartTotal.toFixed(2)}</TotalPrice>
            </SummaryRow>
            <ClearCartButton
              onClick={handleClearCart}
              disabled={loading || cart.items.length === 0}
              mt="15px"
            >
              Clear Cart
            </ClearCartButton>
            <CheckoutButton
              onClick={() => alert('Proceeding to checkout (not implemented)')}
              disabled={loading || cart.items.length === 0}
              mt="10px"
            >
              Proceed to Checkout
            </CheckoutButton>
          </CartSummary>
        </CartContent>
      )}
    </CartContainer>
  );
}