import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Image, SlideWrapper, SliderContainer } from "./ProductSliderStyles.js";

import book1 from "../../assets/img/productImg/books/echo.png";
import book2 from "../../assets/img/productImg/books/unknown.png";
import book3 from "../../assets/img/productImg/books/night.png";
import coffee1 from "../../assets/img/productImg/coffee/autumnMix.png";
import coffee2 from "../../assets/img/productImg/coffee/originalMix.png";
import coffee3 from "../../assets/img/productImg/coffee/springLight.png";
import coffee4 from "../../assets/img/productImg/coffee/summerMix.png";
import coffee5 from "../../assets/img/productImg/coffee/winterBlend.png";

const productImages = [
  book2,
  book3,
  coffee1,
  coffee2,
  coffee3,
  coffee4,
  coffee5,
];

export default function ProductSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <SliderContainer>
      <Slider {...settings}>
        {productImages.map((img, index) => (
          <SlideWrapper key={index}>
            <Image src={img} alt={`product-${index}`} />
          </SlideWrapper>
        ))}
      </Slider>
    </SliderContainer>
  );
}
