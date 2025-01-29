import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { styles } from '../../styles/components/pos.styles';
import SearchBar from '../../components/pos/SearchBar';
import { useCart } from '../../context/CartContext';

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  quantity?: number;
  image?: string;
};

const sampleProducts: Product[] = [
  { id: 1, name: 'Coca Cola 600ml', price: 18, stock: 10 },
  { id: 2, name: 'Sabritas 50g', price: 15, stock: 5 },
  { id: 3, name: 'Leche 1L', price: 26, stock: 8 },
];

export default function PosScreen() {
  const [search, setSearch] = useState('');
  const [products] = useState<Product[]>(sampleProducts);
  const [selectedQuantities, setSelectedQuantities] = useState<Record<number, string>>({});
  const { cart, total, addToCart } = useCart();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Función para actualizar la cantidad con validación de stock y alerta
  const updateSelectedQuantity = (productId: number, value: string, stock: number) => {
    if (value === '') {
      setSelectedQuantities((prev) => ({
        ...prev,
        [productId]: '',
      }));
      return;
    }

    const numericValue = parseInt(value, 10);

    if (isNaN(numericValue) || numericValue < 1) {
      return;
    }

    if (numericValue > stock) {
      Alert.alert("Stock insuficiente", `Solo hay ${stock} unidades disponibles.`);
      return;
    }

    setSelectedQuantities((prev) => ({
      ...prev,
      [productId]: numericValue.toString(),
    }));
  };

  // Función que se ejecuta cuando el usuario deja el input vacío
  const handleBlur = (productId: number) => {
    setSelectedQuantities((prev) => ({
      ...prev,
      [productId]: prev[productId] === '' ? '1' : prev[productId],
    }));
  };

  // Agregar productos al carrito con la cantidad seleccionada
  const handleAddToCart = (product: Product) => {
    const selectedQuantity = parseInt(selectedQuantities[product.id] || '1', 10);
    addToCart(product, selectedQuantity);
    setSelectedQuantities((prev) => ({
      ...prev,
      [product.id]: '1',
    }));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>POSApp</Text>
        <Text style={styles.headerText}>Comercio XYZ</Text>
      </View>

      {/* Barra de búsqueda */}
      <SearchBar placeholder="Buscar productos..." onChangeText={(text: string) => setSearch(text)} />

      {/* Lista de productos */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const selectedQuantity = selectedQuantities[item.id] ?? '1';
          const numericQuantity = parseInt(selectedQuantity, 10);

          return (
            <View style={styles.card}>
              {item.image && <Image source={{ uri: item.image }} style={styles.productImage} />}
              <View style={styles.productDetails}>
                <Text style={styles.textPrimary}>{item.name}</Text>
                <Text style={styles.textSecondary}>Precio: ${item.price}</Text>
                <Text style={styles.textSecondary}>Stock: {item.stock}</Text>

                {/* Controles de cantidad */}
                <View style={styles.quantityControls}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => {
                      if (numericQuantity > 1) {
                        updateSelectedQuantity(item.id, (numericQuantity - 1).toString(), item.stock);
                      }
                    }}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>

                  <TextInput
                    style={styles.quantityInput}
                    value={selectedQuantity}
                    keyboardType="numeric"
                    onChangeText={(text) => updateSelectedQuantity(item.id, text, item.stock)}
                    onBlur={() => handleBlur(item.id)}
                  />

                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => {
                      if (numericQuantity < item.stock) {
                        updateSelectedQuantity(item.id, (numericQuantity + 1).toString(), item.stock);
                      } else {
                        Alert.alert("Stock insuficiente", `Solo hay ${item.stock} unidades disponibles.`);
                      }
                    }}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
                <Text style={styles.addButtonText}>Agregar</Text>
              </TouchableOpacity>
            </View>
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
