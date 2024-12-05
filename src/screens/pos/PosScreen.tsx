import React, { useState } from 'react';
import { View } from 'react-native';
import SearchBar from '../../components/pos/SearchBar';
import ProductGrid from '../../components/pos/ProductGrid';
import Cart from '../../components/pos/Cart';
import { Product, CartItem } from '../../types';
import { posScreenStyles as styles } from '../../styles/components/pos.styles';

// Datos de ejemplo
const sampleProducts: Product[] = [
  { id: '1', name: 'Coca Cola 600ml', price: 18, stock: 24 },
  { id: '2', name: 'Sabritas', price: 15, stock: 15 },
  { id: '3', name: 'Pan Bimbo', price: 45, stock: 8 },
  { id: '4', name: 'Leche 1L', price: 26, stock: 12 },
];

const PosScreen: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleProductPress = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (item: CartItem, change: number) => {
    setCartItems(prevItems => {
      if (item.quantity + change <= 0) {
        return prevItems.filter(i => i.id !== item.id);
      }
      return prevItems.map(i =>
        i.id === item.id
          ? { ...i, quantity: i.quantity + change }
          : i
      );
    });
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const filteredProducts = sampleProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.productsSection}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <ProductGrid 
          products={filteredProducts}
          onProductPress={handleProductPress}
        />
      </View>
      <View style={styles.cartSection}>
        <Cart
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
        />
      </View>
    </View>
  );
};

export default PosScreen;