// src/pages/wishlistPage/wishlistPage.js
import styled from 'styled-components';

export const wishlistContainer = styled.div`
  max-width: 900px;
  margin: 30px auto;
  padding: 25px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

export const wishlistTitle = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 2.5em;
  font-weight: 600;
`;

export const Message = styled.div`
  padding: 12px 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  font-weight: 500;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${props => props.type === 'error' && `
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  `}

  ${props => props.type === 'success' && `
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  `}

  ${props => props.type === 'info' && `
    background-color: #d1ecf1;
    color: #0c5460;
    border: 1px solid #bee5eb;
  `}
`;

export const LoginRedirectButton = styled.button`
  background-color:  #6f4e37;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.2s ease;

  &:hover {
    background-color:  #493628;
  }
`;

export const EmptywishlistMessage = styled.div`
  text-align: center;
  padding: 50px;
  font-size: 1.2em;
  color: #666;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px dashed #ddd;
`;

export const wishlistContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const wishlistItemsList = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fcfcfc;
`;

export const wishlistItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

export const ItemDetails = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ItemName = styled.span`
  font-weight: 600;
  color: #444;
  font-size: 1.1em;
`;

export const ItemPricePerUnit = styled.span`
  font-size: 0.9em;
  color: #777;
  margin-top: 3px;
`;

export const ItemControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 20px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    margin-left: 0;
  }
`;

export const QuantityButton = styled.button`
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 5px;
  width: 35px;
  height: 35px;
  font-size: 1.2em;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover:not(:disabled) {
    background-color: #5a6268;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const QuantityInput = styled.input`
  width: 50px;
  padding: 8px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
`;

export const ItemTotalPrice = styled.span`
  font-weight: 600;
  color: #333;
  min-width: 80px;
  text-align: right;
  margin-right: 10px;
  font-size: 1.1em;

  @media (max-width: 768px) {
    text-align: left;
    min-width: unset;
  }
`;

export const RemoveItemButton = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #c82333;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const wishlistSummary = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const SummaryTitle = styled.h2`
  text-align: center;
  color: #333;
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.8em;
  font-weight: 600;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.1em;
  padding-bottom: 8px;
  border-bottom: 1px dashed #eee;

  &:last-of-type {
    border-bottom: none;
    font-weight: bold;
    font-size: 1.2em;
    color: #222;
  }
`;

export const TotalPrice = styled.span`
  font-size: 1.3em;
  color:  #6f4e37;
`;

export const wishlistActionButton = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1em;
  font-weight: 600;
  transition: background-color 0.2s ease, transform 0.1s ease;
  width: 100%;
  margin-top: ${props => props.mt || '0px'};

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const ClearwishlistButton = styled(wishlistActionButton)`
  background-color: #c6946f;
  color: #333;
`;

export const CheckoutButton = styled(wishlistActionButton)`
  background-color: #6f4e37;
  color: white;
`;