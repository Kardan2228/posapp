import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/components/productCard.styles';
import { Product } from '../../types';

type Props = {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
};

export default function ProductCard({ product, onEdit, onDelete }: Props) {
  return (
    <View style={styles.card}>
      {product.image && (
        <Image source={{ uri: product.image }} style={styles.productImage} />
      )}
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productDetails}>Precio: ${product.price}</Text>
        <Text style={styles.productDetails}>Stock: {product.stock}</Text>
        {product.expirationDate && (
          <Text style={styles.productDetails}>
            Caduca: {product.expirationDate}
          </Text>
        )}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.editButton} onPress={onEdit}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
