import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import PosScreen from '../screens/pos/PosScreen';
import InventoryScreen from '../screens/inventory/InventoryScreen';
import ReportsScreen from '../screens/reports/ReportsScreen';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {

  console.log("TabNavigator se está ejecutando"); // 🔍 Verifica que el navigator está cargando

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'POS') {
            iconName = 'cart';
          } else if (route.name === 'Inventario') {
            iconName = 'cube';
          } else if (route.name === 'Reportes') {
            iconName = 'bar-chart';
          }
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="POS" component={PosScreen} />
      <Tab.Screen name="Inventario" component={InventoryScreen} />
      <Tab.Screen name="Reportes" component={ReportsScreen} />
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
