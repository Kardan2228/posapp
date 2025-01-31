import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Product } from "../../types/product";
import { styles } from "../../styles/components/productForm.styles";

interface Props {
  product?: Product;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<Props> = ({ product, onSave, onCancel }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState<string | undefined>(undefined);
  const [expirationDate, setExpirationDate] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price.toString());
      setStock(product.stock.toString());
      setImage(product.image);
      setExpirationDate(product.expirationDate);
    }
  }, [product]);

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // ✅ Uso correcto
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleCameraLaunch = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Se requiere permiso para acceder a la cámara.");
      return;
    }
  
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  
  const handleSave = () => {
    if (!name || !price || !stock) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const newProduct: Product = {
      id: product?.id || Date.now().toString(),
      name,
      price: parseFloat(price),
      stock: parseInt(stock, 10),
      image: image || "",
      expirationDate,
      categoryId: product?.categoryId || "default",
    };

    onSave(newProduct);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.formContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.formTitle}>{product ? "Editar Producto" : "Agregar Producto"}</Text>

        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : (
          <View style={styles.placeholderImage} />
        )}

        <TouchableOpacity style={styles.imageButton} onPress={handleCameraLaunch}>
          <Text style={styles.buttonText}>Tomar Foto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.imageButton} onPress={handleImagePick}>
          <Text style={styles.buttonText}>Seleccionar Imagen</Text>
        </TouchableOpacity>

        <Text style={styles.inputLabel}>Artículo</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.inputLabel}>Precio</Text>
        <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" />

        <Text style={styles.inputLabel}>Cantidad</Text>
        <TextInput style={styles.input} value={stock} onChangeText={setStock} keyboardType="numeric" />

        <View style={styles.formActions}>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProductForm;
