import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { CartItem } from '../../types';
import { cartStyles as styles } from '../../styles/components/pos.styles';
import PaymentModal from './PaymentModal';

interface CartProps {
    items: CartItem[];
    onUpdateQuantity: (item: CartItem, change: number) => void;
    onRemoveItem: (itemId: string) => void;
   }
   
   const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onRemoveItem }) => {
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
   
    const handlePayment = () => {
      // Aquí iría la lógica de cobro
      setShowPaymentModal(false);
    };
   
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.title}>Carrito</Text>
          <ScrollView style={styles.itemList}>
            {items.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemSubtext}>
                    ${item.price} × {item.quantity}
                  </Text>
                  <Text style={styles.itemTotal}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                </View>
                <View style={styles.quantityControls}>
                  <TouchableOpacity
                    onPress={() => onUpdateQuantity(item, -1)}
                    style={styles.quantityButton}
                  >
                    <Text>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => onUpdateQuantity(item, 1)}
                    style={styles.quantityButton}
                  >
                    <Text>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
          <View style={styles.footer}>
            <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
            <TouchableOpacity 
              style={styles.checkoutButton}
              onPress={() => setShowPaymentModal(true)}
            >
              <Text style={styles.checkoutButtonText}>Cobrar</Text>
            </TouchableOpacity>
          </View>
        </View>
   
        <PaymentModal
          isVisible={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onConfirm={handlePayment}
          total={total}
        />
      </>
    );
   };
   
   export default Cart;