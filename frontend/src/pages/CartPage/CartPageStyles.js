import styled from 'styled-components';

export const CartContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
`;

export const CartTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
`;

export const EmptyCart = styled.div`
  text-align: center;
  padding: 3rem;
  background: #f9f9f9;
  border-radius: 8px;
  
  p {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }
`;

export const ShopButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: #6f4e37;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #5a3c2c;
  }
`;

export const CartItems = styled.div`
  margin-bottom: 2rem;
`;

export const CartItem = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid #eee;
`;

export const ItemImage = styled.div`
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
`;

export const ItemDetails = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ItemName = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
`;

export const ItemPrice = styled.p`
  margin: 0 0 1rem 0;
  font-weight: bold;
  color: #6f4e37;
`;

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    background: #e0e0e0;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Quantity = styled.span`
  min-width: 30px;
  text-align: center;
`;

export const RemoveButton = styled.button`
  align-self: flex-start;
  padding: 0.5rem 1rem;
  background: transparent;
  color: #d32f2f;
  border: 1px solid #d32f2f;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #ffebee;
  }
`;

export const CartSummary = styled.div`
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  max-width: 400px;
  margin-left: auto;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
  
  &.total {
    font-weight: bold;
    font-size: 1.1rem;
    border-bottom: none;
  }
`;

export const CartActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

export const ClearButton = styled.button`
  padding: 0.8rem;
  background: transparent;
  color: #6f4e37;
  border: 1px solid #6f4e37;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(111, 78, 55, 0.1);
  }
`;

export const CheckoutButton = styled.button`
  padding: 0.8rem;
  background: #6f4e37;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #5a3c2c;
  }
`;

export const SuccessMessage = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: #e8f5e9;
  color: #2e7d32;
  border-radius: 4px;
  text-align: center;
`;

export const CartLoading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
`;

export const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #6f4e37;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const CartError = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  text-align: center;
  
  h3 {
    color: #d32f2f;
    margin-bottom: 8px;
  }
`;

export const ErrorButton = styled.button`
  padding: 10px 20px;
  background: #6f4e37;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.2s;
  
  &:hover {
    background: #5a3c2c;
  }
`;