import { styled } from "styled-components";

export const SliderContainer = styled.div`
  width: 100vw;
  overflow: hidden;
  padding: 2rem 0;

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

  width: 100%;
  height: 360px;

  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

export const Image = styled.img`
  max-height: 300px;
  width: auto;
  object-fit: contain;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
