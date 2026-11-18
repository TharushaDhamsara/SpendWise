import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0EA5E9',
        tabBarInactiveTintColor: '#64748B',
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons 
              name="view-dashboard" 
              size={size} 
              color={typeof color === 'string' ? color : '#0EA5E9'} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transactions',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons 
              name="format-list-bulleted" 
              size={size} 
              color={typeof color === 'string' ? color : '#0EA5E9'} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add Record', // Changed from 'Add Expense' to 'Add Record'
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons 
              name="plus-circle" 
              size={size} 
              color={typeof color === 'string' ? color : '#0EA5E9'} 
            />
          ),
        }}
      />
    </Tabs>
  );
}