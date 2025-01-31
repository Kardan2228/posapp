import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { CartItem, Product } from '../../types';
import { cartStyles as styles } from '../../styles/pos.styles';
import PaymentModal from './PaymentModal';
import OutOfStockModal from './OutOfStockModal';

interface CartProps {
 items: CartItem[];
 products: Product[];
 onUpdateQuantity: (item: CartItem, change: number) => void;
 onRemoveItem: (itemId: string) => void;
 onSale: (items: CartItem[]) => void;
}

const Cart: React.FC<CartProps> = ({ items, products, onUpdateQuantity, onRemoveItem, onSale }) => {
 const [showPaymentModal, setShowPaymentModal] = useState(false);
 const [showOutOfStock, setShowOutOfStock] = useState(false);
 const [outOfStockProduct, setOutOfStockProduct] = useState('');

 const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

 const handlePayment = () => {
   onSale(items);
   setShowPaymentModal(false);
 };

 const handleUpdateQuantity = (item: CartItem, change: number) => {
   const product = products.find(p => p.id === item.id);
   if (!product) return;

   const newQuantity = item.quantity + change;
   if (newQuantity > product.stock) {
     setOutOfStockProduct(item.name);
     setShowOutOfStock(true);
     return;
   }

   if (newQuantity <= 0) {
     onRemoveItem(item.id);
     return;
   }

   onUpdateQuantity(item, change);
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
                 onPress={() => handleUpdateQuantity(item, -1)}
                 style={styles.quantityButton}
               >
                 <Text>-</Text>
               </TouchableOpacity>
               <Text style={styles.quantity}>{item.quantity}</Text>
               <TouchableOpacity
                 onPress={() => handleUpdateQuantity(item, 1)}
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

     <OutOfStockModal
       isVisible={showOutOfStock}
       onClose={() => setShowOutOfStock(false)}
       product={outOfStockProduct}
     />
   </>
 );
};

export default Cart;