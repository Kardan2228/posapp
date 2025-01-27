export interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    categoryId: string;
    barcode?: string; // Agregar esta línea
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

  