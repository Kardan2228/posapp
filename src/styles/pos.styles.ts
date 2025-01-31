import { StyleSheet } from 'react-native';
import theme from './theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
    paddingTop: 24,
  },
  header: {
    backgroundColor: theme.colors.primary,
    padding: 16,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 16, // Margen inferior para separar el header del input
  },
  headerText: {
    color: theme.colors.surface,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerSubText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 2, // Ajuste de espaciado opcional
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.placeholder,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 16,
    backgroundColor: theme.colors.placeholder,
  },
  productDetails: {
    flex: 1,
  },
  textPrimary: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  textSecondary: {
    color: theme.colors.placeholder,
    fontSize: 14,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 8,
    marginHorizontal: 8,
  },
  quantityButtonText: {
    color: theme.colors.surface,
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityInput: {
    width: 60, // Aumentamos el ancho del input
    height: 35, // Ajustamos la altura para más espacio
    textAlign: 'center',
    borderColor: theme.colors.placeholder,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 12, // Reducimos el tamaño de fuente
    paddingVertical: 4, // Reducimos el padding interno
  },
  addButton: {
    backgroundColor: theme.colors.accent,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: theme.colors.surface,
    fontSize: 14,
    fontWeight: 'bold',
  },
  cartSummary: {
    marginTop: 16,
    padding: 16,
    backgroundColor: theme.colors.surface,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    alignItems: 'center',
  },
  checkoutButton: {
    backgroundColor: theme.colors.accent,
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: theme.colors.surface,
    fontSize: 16,
    fontWeight: 'bold',
  },
});