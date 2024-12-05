import React, { useState } from 'react';
import { View } from 'react-native';
import SearchBar from '../../components/pos/SearchBar';
import CategoryTabs from '../../components/pos/CategoryTabs';
import ProductGrid from '../../components/pos/ProductGrid';
import Cart from '../../components/pos/Cart';
import { Product, CartItem, Category} from '../../types';
import { posScreenStyles as styles } from '../../styles/components/pos.styles';

// Datos de ejemplo

const sampleCategories: Category[] = [
    { id: 'bebidas', name: 'Bebidas' },
    { id: 'snacks', name: 'Snacks' },
    { id: 'pan', name: 'Panadería' },
    { id: 'lacteos', name: 'Lácteos' },
  ];

const sampleProducts: Product[] = [
  { id: '1', name: 'Coca Cola 600ml', price: 18, stock: 24, categoryId: 'bebidas' },
  { id: '2', name: 'Sabritas', price: 15, stock: 15, categoryId: 'snacks' },
  { id: '3', name: 'Pan Bimbo', price: 45, stock: 8, categoryId: 'pan' },
  { id: '4', name: 'Leche 1L', price: 26, stock: 12, categoryId: 'lacteos' },
];

const PosScreen: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState(sampleProducts);

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

  const handleSale = (items: CartItem[]) => {
    const updatedProducts = products.map(product => {
      const soldItem = items.find(item => item.id === product.id);
      if (soldItem) {
        return {
          ...product,
          stock: product.stock - soldItem.quantity
        };
      }
      return product;
    });
    setProducts(updatedProducts);
    // Limpiar carrito
    setCartItems([]);
  
    // Opcional: mostrar mensaje de éxito
    alert('Venta realizada con éxito');
  };

  const filteredProducts = products.filter(product =>
    (!selectedCategory || product.categoryId === selectedCategory) &&
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.productsSection}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <CategoryTabs
          categories={sampleCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <ProductGrid 
          products={filteredProducts.filter(p => p.stock > 0)}
          onProductPress={handleProductPress}
        />
      </View>
      <View style={styles.cartSection}>
        <Cart
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onSale={handleSale}
        />
      </View>
    </View>
  );
};

export default PosScreen;