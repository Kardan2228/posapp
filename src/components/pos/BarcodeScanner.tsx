// src/components/pos/BarcodeScanner.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity, Platform } from 'react-native';
import * as ExpoBarCodeScanner from 'expo-barcode-scanner';
import { modalStyles } from '../../styles/pos.styles';

interface BarcodeScannerProps {
  isVisible: boolean;
  onClose: () => void;
  onScan: (barcode: string) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ isVisible, onClose, onScan }) => {
  React.useEffect(() => {
    if (Platform.OS !== 'web' && isVisible) {
      (async () => {
        try {
          const { status } = await ExpoBarCodeScanner.getPermissionsAsync();
          if (status !== 'granted') {
            await ExpoBarCodeScanner.requestPermissionsAsync();
          }
        } catch (err) {
          console.error('Error requesting camera permission:', err);
        }
      })();
    }
  }, [isVisible]);

  if (Platform.OS === 'web') {
    return (
      <Modal visible={isVisible} transparent animationType="fade">
        <View style={modalStyles.modalOverlay}>
          <View style={modalStyles.modalContent}>
            <Text>Escáner disponible solo en versión móvil</Text>
            <TouchableOpacity 
              style={modalStyles.modalButton}
              onPress={onClose}
            >
              <Text style={modalStyles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={modalStyles.modalOverlay}>
        <View style={modalStyles.modalContent}>
          <ExpoBarCodeScanner.BarCodeScanner
            style={modalStyles.camera}
            onBarCodeScanned={({data}) => {
              onScan(data);
              onClose();
            }}
          />
          <TouchableOpacity 
            style={modalStyles.modalButton}
            onPress={onClose}
          >
            <Text style={modalStyles.modalButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default BarcodeScanner;