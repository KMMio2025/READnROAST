import styled from 'styled-components';

export const ProductContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  max-height: 500px;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const BackButton = styled.img`
  width: 32px;
  height: 32px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

export const ProductTitle = styled.h1`
  font-size: 2rem;
  margin: 0;
  color: #333;
  flex-grow: 1;
`;

export const ProductSubtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin: 0.5rem 0 0 0;
`;

export const ProductPrice = styled.p`
  font-size: 1.8rem;
  font-weight: bold;
  color: #6f4e37;
  margin: 1rem 0;
`;

export const ParameterRow = styled.div`
  display: flex;
  padding: 0.8rem 0;
  border-bottom: 1px solid #eee;
`;

export const ParameterLabel = styled.span`
  font-weight: bold;
  min-width: 150px;
  color: #555;
`;

export const ParameterValue = styled.span`
  color: #333;
`;

export const SizeOptions = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
`;

export const SizeOption = styled.div`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.$active ? '#6f4e37' : '#ddd'};
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => props.$active ? '#f8f1e9' : 'white'};
  color: ${props => props.$active ? '#6f4e37' : '#333'};
  font-weight: ${props => props.$active ? 'bold' : 'normal'};
  transition: all 0.2s;

  &:hover {
    border-color: #6f4e37;
  }
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0;
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
  transition: background 0.2s;

  &:hover {
    background: #f5f5f5;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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
  margin-top: 1rem;

  &:hover {
    background-color: #5a3d2a;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export const Description = styled.p`
  color: #555;
  line-height: 1.6;
  margin-top: 1rem;
`;