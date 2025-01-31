export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  expirationDate: string;
  categoryId: string;  // ✅ Agregado para corregir el error
}
