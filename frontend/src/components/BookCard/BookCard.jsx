import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Read from '../../assets/img/read.png';

const Card = styled.div`
  width: 300px;
  height: 420px;
  background-color: #fff;
  border-radius: 20px;
  border-color: #6f4e37;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  margin: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 220px;
  width: 100%;
  background: #f7f4ef;
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
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Title = styled.h3`
  font-size: 18px;
  margin: 0 0 8px 0;
  color: #333;
  font-weight: 600;
`;

const Author = styled.p`
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

const Genre = styled.p`
  font-size: 12px;
  color: #888;
  text-transform: uppercase;
  margin: 8px 0 0 0;
`;

export default function BookCard({ book }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${book.id}`, { state: { product: book } });
  };

  return (
    <Card onClick={handleClick}>
      <ImageWrapper>
        {book.images?.length > 0 ? (
          <Image 
            src={book.images[0].url} 
            alt={book.name}
          />
        ) : (
          <Image 
            src={Read}
            alt="Placeholder"
          />
        )}
      </ImageWrapper>
      <Details>
        <Title>{book.name}</Title>
        <Author>{book.author}</Author>
        <Price>{book.price.toFixed(2)} zł</Price>
        <Genre>{book.genre}</Genre>
      </Details>
    </Card>
  );
}