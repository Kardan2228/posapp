import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { modalStyles } from '../../styles/pos.styles';

interface OutOfStockModalProps {
 isVisible: boolean;
 onClose: () => void;
 product: string;
}

const OutOfStockModal = ({ isVisible, onClose, product }: OutOfStockModalProps) => (
 <Modal visible={isVisible} transparent animationType="fade">
   <View style={modalStyles.modalOverlay}>
     <View style={modalStyles.modalContent}>
       <Text style={modalStyles.modalTitle}>Producto Agotado</Text>
       <Text style={modalStyles.modalText}>{product} no tiene suficiente stock disponible.</Text>
       <TouchableOpacity 
         style={[modalStyles.modalButton, modalStyles.modalButtonConfirm]}
         onPress={onClose}
       >
         <Text style={modalStyles.modalButtonText}>Entendido</Text>
       </TouchableOpacity>
     </View>
   </View>
 </Modal>
);

export default OutOfStockModal;