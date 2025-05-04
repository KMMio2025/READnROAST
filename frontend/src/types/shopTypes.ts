// frontend/src/types/shopTypes.ts
export interface Item {
    id: number;
    name: string;
    description: string;
    quantity: number;
    images: Image[];
  }
  
  export interface Coffee extends Item {
    type: 'coffee';
    origin: string;
    roast: string;
    flavour: string;
    aroma: string;
    acidity: string;
    sizes: number[];
    prices: number[];
    mix: string;
  }
  
  export interface Book extends Item {
    type: 'book';
    author: string;
    genre: string;
    language: string;
    price: number;
  }
  
  export type ShopItem = Coffee | Book;
  
  export interface Image {
    id: number;
    url: string;
  }