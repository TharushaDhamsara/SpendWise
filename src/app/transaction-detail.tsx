import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function TransactionDetailScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Transaction Details</Text>
        <Text style={styles.desc}>Item: Campus Canteen Meal</Text>
        <Text style={styles.desc}>Category: Food</Text>
        <Text style={styles.desc}>Amount: Rs. 450.00</Text>
        <Text style={styles.desc}>Date: Today, 12:30 PM</Text>
      </View>

      <Pressable style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>Go Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#F8FAFC' },
  card: { backgroundColor: '#FFFFFF', padding: 24, borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 20 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#1E293B', marginBottom: 12 },
  desc: { fontSize: 16, color: '#475569', marginBottom: 8 },
  backBtn: { backgroundColor: '#334155', padding: 16, borderRadius: 10, alignItems: 'center' },
  backText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 }
});