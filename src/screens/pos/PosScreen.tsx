import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import SearchBar from '../../components/pos/SearchBar';
import CategoryTabs from '../../components/pos/CategoryTabs';
import ProductGrid from '../../components/pos/ProductGrid';
import Cart from '../../components/pos/Cart';
import { Product, CartItem, Category } from '../../types';
import { posScreenStyles as styles, searchStyles } from '../../styles/components/pos.styles';
import OutOfStockModal from '../../components/pos/OutOfStockModal';
import { Search } from 'lucide-react-native';
import BarcodeScanner from '../../components/pos/BarcodeScanner';

// Datos de ejemplo
const sampleCategories: Category[] = [
    { id: 'bebidas', name: 'Bebidas' },
    { id: 'snacks', name: 'Snacks' },
    { id: 'pan', name: 'Panadería' },
    { id: 'lacteos', name: 'Lácteos' },
];

const sampleProducts: Product[] = [
    { id: '1', name: 'Coca Cola 600ml', price: 18, stock: 24, categoryId: 'bebidas', barcode: '7501055300556' },
    { id: '2', name: 'Sabritas', price: 15, stock: 15, categoryId: 'snacks', barcode: '7501011123456' },
    { id: '3', name: 'Pan Bimbo', price: 45, stock: 8, categoryId: 'pan', barcode: '7501030428809' },
    { id: '4', name: 'Leche 1L', price: 26, stock: 12, categoryId: 'lacteos', barcode: '7501055384655' }
];

const PosScreen: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [products, setProducts] = useState(sampleProducts);
    const [showOutOfStock, setShowOutOfStock] = useState(false);
    const [outOfStockProduct, setOutOfStockProduct] = useState('');
    const [showScanner, setShowScanner] = useState(false);

    const handleScan = (barcode: string) => {
        const product = products.find(p => p.barcode === barcode);
        if (product) {
            handleProductPress(product);
        }
    };

    const handleProductPress = (product: Product) => {
        const currentInCart = cartItems.find(item => item.id === product.id)?.quantity || 0;

        if (currentInCart + 1 > product.stock) {
            setOutOfStockProduct(product.name);
            setShowOutOfStock(true);
            return;
        }

        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const handleUpdateQuantity = (item: CartItem, change: number) => {
        setCartItems(prevItems => {
            if (item.quantity + change <= 0) {
                return prevItems.filter(i => i.id !== item.id);
            }
            return prevItems.map(i =>
                i.id === item.id
                    ? { ...i, quantity: i.quantity + change }
                    : i
            );
        });
    };

    const handleRemoveItem = (itemId: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const handleSale = (items: CartItem[]) => {
        const updatedProducts = products.map(product => {
            const soldItem = items.find(item => item.id === product.id);
            if (soldItem) {
                return {
                    ...product,
                    stock: product.stock - soldItem.quantity
                };
            }
            return product;
        });
        setProducts(updatedProducts);
        setCartItems([]);
        alert('Venta realizada con éxito');
    };

    const filteredProducts = products.filter(product =>
        (!selectedCategory || product.categoryId === selectedCategory) &&
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <View style={styles.productsSection}>
                <View style={searchStyles.searchContainer}>
                    <SearchBar
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <TouchableOpacity
                        style={searchStyles.scanButton}
                        onPress={() => setShowScanner(true)}
                    >
                        <Search size={24} />
                    </TouchableOpacity>
                </View>
                <CategoryTabs
                    categories={sampleCategories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />
                <ProductGrid
                    products={filteredProducts}
                    onProductPress={handleProductPress}
                />
            </View>
            <View style={styles.cartSection}>
                <Cart
                    items={cartItems}
                    products={products}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemoveItem={handleRemoveItem}
                    onSale={handleSale}
                />
            </View>
            <OutOfStockModal
                isVisible={showOutOfStock}
                onClose={() => setShowOutOfStock(false)}
                product={outOfStockProduct}
            />
            <BarcodeScanner
                isVisible={showScanner}
                onClose={() => setShowScanner(false)}
                onScan={handleScan}
            />
        </View>
    );
};

export default PosScreen;
