import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Product } from '../../types';
import { productGridStyles as styles } from '../../styles/components/pos.styles';

interface ProductGridProps {
  products: Product[];
  onProductPress: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductPress }) => {
  return (
    <View style={styles.grid}>
      {products.map((product) => (
        <TouchableOpacity
          key={product.id}
          style={styles.productCard}
          onPress={() => onProductPress(product)}
        >
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
          <Text style={styles.productStock}>Stock: {product.stock}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ProductGrid;