import { StyleSheet } from 'react-native';
import { colors, spacing, typography, shadows } from '../system';

export const productGridStyles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.md,
  },
  productCard: {
    width: '30%',
    margin: '1.66%',
    padding: spacing.md,
    backgroundColor: colors.background.paper,
    borderRadius: spacing.sm,
    ...shadows.small,
  },
  productName: {
    ...typography.body1,
    color: colors.text.primary,
  },
  productPrice: {
    ...typography.h2,
    color: colors.primary.main,
    marginTop: spacing.xs,
  },
  productStock: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
});

export const cartStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.paper,
    },
    title: {
      ...typography.h2,
      padding: spacing.md,
    },
    itemList: {
      flex: 1,
    },
    cartItem: {
      flexDirection: 'row',
      padding: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.background.default,
      alignItems: 'center',
    },
    itemInfo: {
      flex: 1,
    },
    itemName: {
      ...typography.body1,
      fontWeight: '500',
    },
    itemSubtext: {
      ...typography.body2,
      color: colors.text.secondary,
      marginTop: spacing.xs,
    },
    itemTotal: {
      ...typography.body2,
      color: colors.primary.main,
      fontWeight: '600',
      marginTop: spacing.xs,
    },
    quantityControls: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    quantityButton: {
      padding: spacing.sm,
      backgroundColor: colors.background.default,
      borderRadius: spacing.xs,
    },
    quantity: {
      paddingHorizontal: spacing.md,
      ...typography.body1,
    },
    footer: {
      padding: spacing.md,
      borderTopWidth: 1,
      borderTopColor: colors.background.default,
    },
    total: {
      ...typography.h1,
      marginBottom: spacing.md,
    },
    checkoutButton: {
      backgroundColor: colors.primary.main,
      padding: spacing.md,
      borderRadius: spacing.sm,
      alignItems: 'center',
    },
    checkoutButtonText: {
      color: colors.background.paper,
      ...typography.h2,
    },
  });
export const posScreenStyles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: colors.background.default,
    },
    productsSection: {
      flex: 2,
    },
    cartSection: {
      flex: 1,
    },
  });