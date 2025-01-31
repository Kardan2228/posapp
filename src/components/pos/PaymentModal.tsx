import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { searchStyles as styles } from '../../styles/pos.styles';
import { modalStyles } from '../../styles/pos.styles';

interface PaymentModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  total: number;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isVisible,
  onClose,
  onConfirm,
  total
}) => (
  <Modal
    visible={isVisible}
    transparent={true}
    animationType="fade"
  >
    <View style={modalStyles.modalOverlay}>
      <View style={modalStyles.modalContent}>
        <Text style={modalStyles.modalTitle}>Confirmar Pago</Text>
        <Text style={modalStyles.modalTotal}>Total: ${total.toFixed(2)}</Text>
        <View style={modalStyles.modalButtons}>
          <TouchableOpacity 
            style={[modalStyles.modalButton, modalStyles.modalButtonCancel]} 
            onPress={onClose}
          >
            <Text style={modalStyles.modalButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[modalStyles.modalButton, modalStyles.modalButtonConfirm]}
            onPress={onConfirm}
          >
            <Text style={modalStyles.modalButtonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

export default PaymentModal;