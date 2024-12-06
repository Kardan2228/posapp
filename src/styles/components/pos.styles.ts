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
  productCardDisabled: {
    opacity: 0.6,
  },
  outOfStock: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.xs,
    fontWeight: '600',
  }
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
    searchContainer: {
  padding: spacing.sm,
  borderBottomWidth: 1,
  borderBottomColor: colors.background.default,
},
searchWrapper: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: colors.background.default,
  borderRadius: spacing.sm,
  paddingHorizontal: spacing.sm,
},
searchIcon: {
  marginRight: spacing.sm,
},
searchInput: {
  flex: 1,
  padding: spacing.sm,
  fontSize: 16,
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

  export const searchStyles = StyleSheet.create({
    searchContainer: {
      padding: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: colors.background.default,
    },
    searchWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background.default,
      borderRadius: spacing.sm,
      paddingHorizontal: spacing.sm,
    },
    searchIcon: {
      marginRight: spacing.sm,
    },
    searchInput: {
      flex: 1,
      padding: spacing.sm,
      fontSize: 16,
    },
    categoryContainer: {
        backgroundColor: colors.background.paper,
        paddingHorizontal: spacing.sm,
      },
      categoryTab: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        marginRight: spacing.sm,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
      },
      categoryTabSelected: {
        borderBottomColor: colors.primary.main,
      },
      categoryText: {
        ...typography.body1,
        color: colors.text.secondary,
        fontWeight: '500',
      },
  });

  export const modalStyles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: colors.background.paper,
      borderRadius: spacing.md,
      padding: spacing.lg,
      width: '80%',
      maxWidth: 400,
    },
    modalTitle: {
      ...typography.h2,
      textAlign: 'center',
      marginBottom: spacing.md,
    },
    modalTotal: {
      ...typography.h1,
      textAlign: 'center',
      color: colors.primary.main,
      marginBottom: spacing.lg,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: spacing.md,
    },
    modalButton: {
      flex: 1,
      padding: spacing.md,
      borderRadius: spacing.sm,
      alignItems: 'center',
    },
    modalButtonCancel: {
      backgroundColor: colors.background.default,
    },
    modalButtonConfirm: {
      backgroundColor: colors.primary.main,
    },
    modalButtonText: {
      ...typography.body1,
      fontWeight: '600',
      color: colors.text.primary,
    },
    modalText: {
        ...typography.body1,
        textAlign: 'center',
        marginBottom: spacing.md,
      }
  });