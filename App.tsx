import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useState } from 'react';

type ScreenType = 'pos' | 'inventory' | 'reports';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('pos');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'pos':
        return <Text style={styles.title}>Punto de Venta</Text>;
      case 'inventory':
        return <Text style={styles.title}>Inventario</Text>;
      case 'reports':
        return <Text style={styles.title}>Reportes</Text>;
      default:
        return <Text style={styles.title}>Punto de Venta</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {renderScreen()}
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          onPress={() => setCurrentScreen('pos')}
          style={[
            styles.tabButton,
            currentScreen === 'pos' && styles.tabButtonActive
          ]}
        >
          <Text style={[
            styles.tabText,
            currentScreen === 'pos' && styles.tabTextActive
          ]}>Ventas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setCurrentScreen('inventory')}
          style={[
            styles.tabButton,
            currentScreen === 'inventory' && styles.tabButtonActive
          ]}
        >
          <Text style={[
            styles.tabText,
            currentScreen === 'inventory' && styles.tabTextActive
          ]}>Inventario</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setCurrentScreen('reports')}
          style={[
            styles.tabButton,
            currentScreen === 'reports' && styles.tabButtonActive
          ]}
        >
          <Text style={[
            styles.tabText,
            currentScreen === 'reports' && styles.tabTextActive
          ]}>Reportes</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
    backgroundColor: 'white',
    paddingBottom: 20,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
  },
  tabButtonActive: {
    backgroundColor: '#f0f0f0',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  tabTextActive: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});