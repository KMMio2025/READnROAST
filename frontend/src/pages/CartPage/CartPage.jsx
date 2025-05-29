import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import * as S from "./cartPageStyles";

export default function CartPage() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const CART_ENDPOINT = "http://localhost:8080/api/cart";

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    fetchCart();
  }, [isLoggedIn, navigate]);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch(CART_ENDPOINT, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Could not fetch cart data");
      }

      const data = await response.json();
      setCart({
        items: data.items?.map(item => ({
          id: item.id || item.itemId,
          name: item.name || item.itemName,
          price: item.price || item.selectedPrice || 0,
          quantity: item.quantity || 1,
          imageUrl: item.imageUrl || "/placeholder-product.jpg"
        })) || [],
        total: data.total || 0
      });
    } catch (err) {
      setError(err.message);
      setCart({ items: [], total: 0 });
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${CART_ENDPOINT}/remove`, {
        method: "POST",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId: itemId }), // Ensure field name matches backend expectation
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to remove item");
      }

      setSuccess("Item removed successfully");
      setTimeout(() => setSuccess(""), 3000);
      await fetchCart(); // Refresh cart after removal
    } catch (err) {
      setError(err.message);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${CART_ENDPOINT}/update`, {
        method: "POST",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          itemId: itemId, 
          quantity: newQuantity 
        }),
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update quantity");
      }

      setSuccess("Quantity updated successfully");
      setTimeout(() => setSuccess(""), 3000);
      await fetchCart(); // Refresh cart after update
    } catch (err) {
      setError(err.message);
    }
  };

  const clearCart = async () => {
    if (!window.confirm("Are you sure you want to clear your cart?")) return;
    
    const token = localStorage.getItem("token");
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${CART_ENDPOINT}/clear`, {
        method: "POST",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to clear cart");
      }

      setSuccess("Cart cleared successfully");
      setTimeout(() => setSuccess(""), 3000);
      setCart({ items: [], total: 0 });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <S.CartLoading>
        <S.Spinner />
        <p>Loading your cart...</p>
      </S.CartLoading>
    );
  }

  if (error) {
    return (
      <S.CartError>
        <h3>Error</h3>
        <p>{error}</p>
        <S.ErrorButton onClick={() => window.location.reload()}>
          Try Again
        </S.ErrorButton>
      </S.CartError>
    );
  }

  return (
    <S.CartContainer>
      <S.CartTitle>Your Shopping Cart</S.CartTitle>
      
      {cart.items.length === 0 ? (
        <S.EmptyCart>
          <p>Your cart is empty</p>
          <S.ShopButton onClick={() => navigate("/products")}>
            Continue Shopping
          </S.ShopButton>
        </S.EmptyCart>
      ) : (
        <>
          <S.CartItems>
            {cart.items.map(item => (
              <S.CartItem key={item.id}>
                <S.ItemImage>
                  <img src={item.imageUrl} alt={item.name} />
                </S.ItemImage>
                <S.ItemDetails>
                  <S.ItemName>{item.name}</S.ItemName>
                  
                  {/* Updated Price Display */}
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <S.ItemPrice>
                      ${item.price.toFixed(2)} × {item.quantity}
                    </S.ItemPrice>
                    <S.ItemPrice style={{ fontWeight: 'bold' }}>
                      Total: ${(item.price * item.quantity).toFixed(2)}
                    </S.ItemPrice>
                  </div>
                  
                  <S.QuantityControls>
                    <S.QuantityButton 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </S.QuantityButton>
                    <S.Quantity>{item.quantity}</S.Quantity>
                    <S.QuantityButton 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </S.QuantityButton>
                  </S.QuantityControls>
                  
                  <S.RemoveButton onClick={() => removeItem(item.id)}>
                    Remove
                  </S.RemoveButton>
                </S.ItemDetails>
              </S.CartItem>
            ))}
          </S.CartItems>
          
          <S.CartSummary>
            <S.SummaryRow>
              <span>Subtotal</span>
              <span>${(cart.total || 0).toFixed(2)}</span>
            </S.SummaryRow>
            <S.SummaryRow>
              <span>Shipping</span>
              <span>Free</span>
            </S.SummaryRow>
            <S.SummaryRow className="total">
              <span>Total</span>
              <span>${(cart.total || 0).toFixed(2)}</span>
            </S.SummaryRow>
            
            <S.CartActions>
              <S.ClearButton onClick={clearCart}>
                Clear Cart
              </S.ClearButton>
              <S.CheckoutButton onClick={() => navigate("/checkout")}>
                Proceed to Checkout
              </S.CheckoutButton>
            </S.CartActions>
          </S.CartSummary>
          
          {success && (
            <S.SuccessMessage>
              {success}
            </S.SuccessMessage>
          )}
        </>
      )}
    </S.CartContainer>
  );
}