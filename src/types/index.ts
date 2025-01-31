export interface Category {
    id: string;
    name: string;
  }

  export type Product = {
    id: number;
    name: string;
    price: number;
    stock: number;
    image: string;
    expirationDate: string;
    categoryId: string;
  };
  
  
  export interface CartItem extends Product {
    quantity: number;
  }

  