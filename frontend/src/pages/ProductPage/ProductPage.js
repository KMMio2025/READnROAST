import styled from 'styled-components';

export const ProductContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  max-height: 500px;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ProductTitle = styled.h1`
  font-size: 2rem;
  margin: 0;
  color: #333;
`;

export const ProductAuthor = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin: 0;
`;

export const ProductPrice = styled.p`
  font-size: 1.8rem;
  font-weight: bold;
  color: #6f4e37;
  margin: 0;
`;

export const ParameterRow = styled.div`
  display: flex;
  padding: 0.8rem 0;
  border-bottom: 1px solid #eee;
`;

export const ParameterLabel = styled.span`
  font-weight: bold;
  min-width: 120px;
  color: #555;
`;

export const ParameterValue = styled.span`
  color: #333;
`;

export const SizeOptions = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-top: 0.5rem;
`;

export const SizeOption = styled.div`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.active ? '#6f4e37;' : '#ddd'};
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => props.active ? '#c6946f' : 'white'};
  color: ${props => props.active ? '#6f4e37;' : '#333'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};

  &:hover {
    border-color: #6f4e37;
  }
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
`;

export const QuantityButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  background: white;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f5f5f5;
  }
`;

export const QuantityInput = styled.input`
  width: 60px;
  height: 40px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

export const AddToCartButton = styled.button`
  padding: 1rem 2rem;
  background-color: #6f4e37;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #493628;

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;
export const AddToWishlistButton = styled.button`
  color: white;
  border: none;
  border-color: transparent;
  cursor: pointer;
  color: #6f4e37;
  background-color: transparent;
  font-size: 2.1rem;
  &:hover {
    color: red;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;