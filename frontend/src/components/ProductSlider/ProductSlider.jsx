

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SliderContainer } from "./ProductSliderStyles.js";
import BookCard from "../BookCard/BookCard.jsx";
import CoffeeCard from "../CoffeeCard/CoffeeCard.jsx";

// ... sampleBooks, sampleCoffee, sampleItems ...

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
const sampleBooks = [
  {
    id: 1,
    type: "book",
    name: "Władca Pierścieni",
    description: "Klasyczna powieść fantasy",
    quantity: 10,
    author: "J.R.R. Tolkien",
    genre: "FANTASY",
    language: "POLISH",
    price: 39.99,
    images: [
    ],
  },
  {
    id: 2,
    type: "book",
    name: "Harry Potter i Kamień Filozoficzny",
    description: "Pierwsza część serii o młodym czarodzieju",
    quantity: 15,
    author: "J.K. Rowling",
    genre: "FANTASY",
    language: "POLISH",
    price: 29.99,
    images: [
      {
        id: 2,
        url: "https://m.media-amazon.com/images/I/81q77Q39nEL._AC_UF1000,1000_QL80_.jpg",
      },
    ],
  },
  {
    id: 5,
    type: "book",
    name: "W pustyni i w puszczy",
    description: "Przygodowa powieść dla młodzieży",
    quantity: 7,
    author: "Henryk Sienkiewicz",
    genre: "ACTION_ADVENTURE",
    language: "POLISH",
    price: 27.8,
    images: [],
  },
  {
    id: 6,
    type: "book",
    name: "Metro 2033",
    description: "Postapokaliptyczna powieść science-fiction",
    quantity: 5,
    author: "Dmitry Glukhovsky",
    genre: "SCIENCE_FICTION",
    language: "POLISH",
    price: 35.2,
    images: [],
  },
  {
    id: 7,
    type: "book",
    name: "Gra o tron",
    description: "Pierwszy tom sagi Pieśni Lodu i Ognia",
    quantity: 9,
    author: "George R.R. Martin",
    genre: "FANTASY",
    language: "ENGLISH",
    price: 42.99,
    images: [],
  },
];

const sampleCoffee = [
  {
    id: 101,
    type: "coffee",
    name: "Arabica Etiopia Yirgacheffe",
    description: "Kwiatowo-owocowa kawa o delikatnej kwasowości",
    quantity: 15,
    origin: "Etiopia",
    roast: "LIGHT",
    flavour: "FRUITY",
    aroma: "FLORAL",
    acidity: "HIGH",
    mix: "ARABICA",
    numberOfSizes: 3,
    sizes: [250, 500, 1000],
    prices: [25.99, 45.99, 79.99],
    images: [],
  },
  {
    id: 103,
    type: "coffee",
    name: "Brazil Santos",
    description: "Mocna kawa o ziemistym charakterze",
    quantity: 18,
    origin: "Brazylia",
    roast: "DARK",
    flavour: "NUTTY",
    aroma: "SPICY",
    acidity: "LOW",
    mix: "ARABICA",
    numberOfSizes: 3,
    sizes: [250, 500, 1000],
    prices: [19.99, 35.99, 65.99],
    images: [],
  },
  {
    id: 104,
    type: "coffee",
    name: "Mieszanka Poranna",
    description: "Mocna mieszanka na pobudzenie",
    quantity: 12,
    origin: "Mieszanka",
    roast: "DARK",
    flavour: "CHOCOLATE",
    aroma: "SPICY",
    acidity: "LOW",
    mix: "ROBUSTA",
    numberOfSizes: 2,
    sizes: [250, 500],
    prices: [27.5, 49.99],
    images: [],
  },
  
];

const sampleItems = [...sampleBooks, ...sampleCoffee];


export default function ProductSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: "0",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerMode: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <SliderContainer>
      <Slider {...settings}>
        {sampleItems.map((item) =>
          item.type === "book" ? (
            <BookCard key={item.id} book={item} />
          ) : item.type === "coffee" ? (
            <CoffeeCard key={item.id} coffee={item} />
          ) : null
        )}
      </Slider>
    </SliderContainer>
  );
}