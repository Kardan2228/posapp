import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Product } from '../../types';
import { productGridStyles } from '../../styles/pos.styles';

interface ProductGridProps {
  products: Product[];
  onProductPress: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductPress }) => (
    <View style={productGridStyles.grid}>
      {products.map((product) => (
        <TouchableOpacity
          key={product.id}
          onPress={() => onProductPress(product)}
          style={[
            productGridStyles.productCard,
            product.stock <= 0 && productGridStyles.productCardDisabled
          ]}
        >
          <Text style={productGridStyles.productName}>{product.name}</Text>
          <Text style={productGridStyles.productPrice}>${product.price}</Text>
          {product.stock <= 0 ? (
            <Text style={productGridStyles.outOfStock}>Agotado</Text>
          ) : (
            <Text style={productGridStyles.productStock}>Stock: {product.stock}</Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

export default ProductGrid;