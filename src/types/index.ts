export interface Category {
    id: string;
    name: string;
  }

export interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    categoryId: string;
  }
  
  export interface CartItem extends Product {
    quantity: number;
  }

  