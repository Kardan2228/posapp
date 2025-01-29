import React from 'react';
import { CartProvider } from './src/context/CartContext';
import MainNavigator from './src/navigation/MainNavigator';

console.log("App.tsx se está ejecutando"); // 🔍 Verifica si `App.tsx` se ejecuta

export default function App() {
  return (
    <CartProvider>
      <MainNavigator />
    </CartProvider>
  );
}
