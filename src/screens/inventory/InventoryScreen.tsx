import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";
import ProductForm from "../../components/inventory/ProductForm";
import { Product } from "../../types/product";
import { styles } from "../../styles/screens/inventory.styles";

const InventoryScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSaveProduct = (product: Product) => {
    setProducts((prev) => {
      const index = prev.findIndex((p) => p.id === product.id);
      if (index !== -1) {
        const updatedProducts = [...prev];
        updatedProducts[index] = product;
        return updatedProducts;
      }
      return [...prev, product];
    });

    console.log("Productos en InventoryScreen:", products);

    setModalVisible(false);

    setModalVisible(false);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventario</Text>
      <Text style={styles.subtitle}>Gestión de productos y stock</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            {item.image ? <Image source={{ uri: item.image }} style={styles.productImage} /> : <View style={styles.placeholderImage} />}
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productDetails}>Precio: ${item.price}</Text>
              <Text style={styles.productDetails}>Stock: {item.stock}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.editButton} onPress={() => { setSelectedProduct(item); setModalVisible(true); }}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteProduct(item.id)}>
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => { setSelectedProduct(undefined); setModalVisible(true); }}>
        <Text style={styles.buttonText}>+ Agregar Producto</Text>
      </TouchableOpacity>

      <Modal isVisible={modalVisible}>
        <ProductForm product={selectedProduct} onSave={handleSaveProduct} onCancel={() => setModalVisible(false)} />
      </Modal>
    </View>
  );
};

export default InventoryScreen;
