export interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
  }
  
  export interface CartItem extends Product {
    quantity: number;
  }