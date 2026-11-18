import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="transaction-detail" 
        options={{ 
          headerShown: true, 
          title: 'Transaction Details' 
        }} 
      />
    </Stack>
  );
}