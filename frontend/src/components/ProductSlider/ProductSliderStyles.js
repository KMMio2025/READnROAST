import { styled } from "styled-components";

export const SliderContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  overflow: hidden;
  padding: 2rem 0;
  margin: 0 auto;

  .slick-slider {
    margin: 0 -1rem;
  }

  .slick-list {
    overflow: visible;
  }

  .slick-slide > div {
    display: flex;
    justify-content: center;
    align-items: center;
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

  /* Always apply brown glow to center card */
  .slick-center > div > * {
    box-shadow: 0 0 24px 0 #6f4e37, 0 8px 32px 0 rgba(111, 78, 55, 0.25);
    border-bottom: 6px solid #6f4e37;
    transition: box-shadow 0.3s, border-bottom 0.3s;
    z-index: 2;
  }
`;