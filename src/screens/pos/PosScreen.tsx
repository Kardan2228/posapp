import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Animated,
} from 'react-native';
import { styles } from '../../styles/pos.styles';
import SearchBar from '../../components/pos/SearchBar';
import { useCart } from '../../context/CartContext';

// Definimos el tipo del producto con imagen opcional
type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  quantity?: number;
  image?: string;
};

// Datos de productos de ejemplo
const sampleProducts: Product[] = [
  { id: 1, name: 'Coca Cola 600ml', price: 18, stock: 24, image: 'https://via.placeholder.com/100' },
  { id: 2, name: 'Sabritas 50g', price: 15, stock: 10, image: 'https://via.placeholder.com/100' },
  { id: 3, name: 'Leche 1L', price: 26, stock: 12, image: 'https://via.placeholder.com/100' },
];

export default function PosScreen() {
  const [search, setSearch] = useState<string>('');
  const [products] = useState<Product[]>(sampleProducts);
  const [selectedQuantities, setSelectedQuantities] = useState<Record<number, number>>({});
  const { addToCart, total } = useCart();

  // Animación del botón de agregar
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Manejo de cantidades asegurando que no sean mayores al stock
  const updateSelectedQuantity = (productId: number, newQuantity: number, stock: number) => {
    if (isNaN(newQuantity) || newQuantity < 1) {
      newQuantity = 1;
    }
    if (newQuantity > stock) {
      Alert.alert('Cantidad no disponible', `Solo hay ${stock} unidades en stock.`);
      return;
    }

    setSelectedQuantities((prev) => ({
      ...prev,
      [productId]: newQuantity,
    }));
  };

  // Agregar productos al carrito con la cantidad seleccionada
  const handleAddToCart = (product: Product) => {
    const selectedQuantity = selectedQuantities[product.id] || 1;
    addToCart(product, selectedQuantity);
    animateButton();
    setSelectedQuantities((prev) => ({
      ...prev,
      [product.id]: 1,
    }));
  };

  return (
    <View style={styles.container}>
      {/* Header animado */}
      <Animated.View style={[styles.header, { transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.headerText}>Punto de venta</Text>
        <Text style={styles.headerSubText}>El Pumita abarrotero</Text>
      </Animated.View>

      {/* Barra de búsqueda */}
      <SearchBar placeholder="Buscar productos..." onChangeText={(text: string) => setSearch(text)} />

      {/* Lista de productos */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const selectedQuantity = selectedQuantities[item.id] || 1;

          return (
            <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
              <View style={styles.productDetails}>
                <Text style={styles.textPrimary}>{item.name}</Text>
                <Text style={styles.textSecondary}>Precio: ${item.price}</Text>
                <Text style={styles.textSecondary}>Stock: {item.stock}</Text>

                {/* Controles de cantidad */}
                <View style={styles.quantityControls}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateSelectedQuantity(item.id, selectedQuantity - 1, item.stock)}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>

                  <TextInput
                    style={styles.quantityInput}
                    value={selectedQuantities[item.id]?.toString() || ''}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      const numericValue = parseInt(text || '0', 10);
                      updateSelectedQuantity(item.id, numericValue, item.stock);
                    }}
                    onBlur={() => {
                      if (!selectedQuantities[item.id]) {
                        setSelectedQuantities((prev) => ({
                          ...prev,
                          [item.id]: 1,
                        }));
                      }
                    }}
                  />

                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateSelectedQuantity(item.id, selectedQuantity + 1, item.stock)}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Imagen del producto */}
              {item.image && <Image source={{ uri: item.image }} style={styles.productImage} />}

              <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
                <Text style={styles.addButtonText}>Agregar</Text>
              </TouchableOpacity>
            </Animated.View>
          );
        }}
        ListFooterComponent={
          <View style={styles.cartSummary}>
            <Text style={styles.textPrimary}>Total: ${total}</Text>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>Cobrar</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}
