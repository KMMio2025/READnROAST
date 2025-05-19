import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Roast from '../../assets/img/roast.png';

const Card = styled.div`
  width: 300px;
  background-color: #fff;
  border-radius: 20px;
  border-color: #6f4e37;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  margin: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
`;

const Image = styled.img`
  max-width: 200px;
  min-width: 200px;
  max-height: 200px;
  min-height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #eee;
`;

const Details = styled.div`
  padding: 16px;
`;

const Title = styled.h3`
  font-size: 18px;
  margin: 0 0 8px 0;
  color: #333;
  font-weight: 600;
`;

const Origin = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 8px 0;
`;

const Price = styled.p`
  font-size: 16px;
  color: #6f4e37;
  font-weight: bold;
  margin: 0 0 8px 0;
`;

const Flavor = styled.p`
  font-size: 12px;
  color: #888;
  text-transform: uppercase;
  margin: 8px 0 0 0;
`;

export default function CoffeeCard({ coffee }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${coffee.id}`, { state: { product: coffee } });
  };

  return (
    <Card onClick={handleClick}>
      {coffee.images?.length > 0 ? (
        <Image 
          src={coffee.images[0].url} 
          alt={coffee.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
          }}
        />
      ) : (
        <Image 
          src={Roast}
          alt="Placeholder"
        />
      )}
      <Details>
        <Title>{coffee.name}</Title>
        <Price>
          {coffee.sizes[coffee.sizes.length - 1]} g - {coffee.prices[coffee.prices.length - 1].toFixed(2)} zł
        </Price>
        <Origin>{coffee.origin}</Origin>
        <Flavor>{coffee.flavour}</Flavor>
      </Details>
    </Card>
  );
}