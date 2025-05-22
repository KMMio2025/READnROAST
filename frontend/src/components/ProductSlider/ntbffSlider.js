import { styled } from "styled-components";

export const SliderContainer = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 2rem 0;
  margin: 0 auto;

  .slick-slider {
    margin: 0 -1rem; // kompensuje padding slajdów
  }

  .slick-list {
    overflow: visible; // pozwala na hover efekt
    padding: 0 20% !important; // dodaje przestrzeń po bokach dla lepszego centrowania
  }

  .slick-slide > div {
    padding: 1rem;
    display: flex;
    justify-content: center;
  }

  .slick-dots {
    bottom: -30px;
  }

  .slick-dots li button:before {
    font-size: 10px;
    color: #999;
  }

  .slick-dots li.slick-active button:before {
    color: #333;
  }

  .slick-center {
    transform: scale(1.05);
    z-index: 1;
  }
`;

export const SlideWrapper = styled.div`
  box-sizing: border-box;
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%; /* Reduced width */
  height: 400px; /* Increased height */
  transition: transform 0.3s ease;
  margin: 0 auto;

  &:hover {
    transform: scale(1.02);
  }
`;

export const Image = styled.img`
  max-height: 300px;
  width: auto;
  object-fit: contain;
  border-radius: 12px;
  display: block;
  margin: 0 auto;
`;