import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, AppState, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, router } from 'expo-router';

export default function DashboardScreen() {
  const [appState, setAppState] = useState(AppState.currentState);
  const [statusMessage, setStatusMessage] = useState('App is active');
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  // AppState API Requirement
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState && appState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground!');
        setStatusMessage('Welcome back! App resumed from background.');
        loadFinancialData();
      }
      setAppState(nextAppState);
    });

    return () => subscription.remove();
  }, [appState]);

  useFocusEffect(
    useCallback(() => {
      loadFinancialData();
    }, [])
  );

  const loadFinancialData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('spendwise_transactions');
      if (storedData) {
        const transactions = JSON.parse(storedData);
        let income = 0;
        let expense = 0;

        transactions.forEach((item: any) => {
          if (item.type === 'income') {
            income += item.amount;
          } else {
            expense += item.amount;
          }
        });

        setTotalIncome(income);
        setTotalExpense(expense);
      } else {
        setTotalIncome(0);
        setTotalExpense(0);
      }
    } catch (error) {
      console.error('Failed to load budget data', error);
    }
  };

  const balance = totalIncome - totalExpense;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Summary Budget Cards */}
      <View style={[styles.card, balance >= 0 ? styles.bgPositive : styles.bgNegative]}>
        <Text style={styles.cardLabel}>Current Net Balance</Text>
        <Text style={styles.cardAmount}>Rs. {balance.toFixed(2)}</Text>
        <Text style={styles.syncText}>{statusMessage}</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.subCard}>
          <Text style={styles.subLabel}>Total Income</Text>
          <Text style={[styles.subAmount, { color: '#10B981' }]}>+Rs. {totalIncome.toFixed(2)}</Text>
        </View>
        <View style={styles.subCard}>
          <Text style={styles.subLabel}>Total Expenses</Text>
          <Text style={[styles.subAmount, { color: '#EF4444' }]}>-Rs. {totalExpense.toFixed(2)}</Text>
        </View>
      </View>

      <Pressable 
        style={styles.detailBtn} 
        onPress={() => router.push('/transaction-detail')}
      >
        <Text style={styles.detailBtnText}>View Transaction Details</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8FAFC' },
  card: { padding: 24, borderRadius: 16, marginBottom: 20 },
  bgPositive: { backgroundColor: '#0EA5E9' },
  bgNegative: { backgroundColor: '#DC2626' },
  cardLabel: { color: '#E0F2FE', fontSize: 14, fontWeight: '600' },
  cardAmount: { color: '#FFFFFF', fontSize: 32, fontWeight: 'bold', marginVertical: 8 },
  syncText: { color: '#BAE6FD', fontSize: 12, fontStyle: 'italic' },
  row: { flexDirection: 'row', gap: 15, marginBottom: 20 },
  subCard: { flex: 1, backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  subLabel: { fontSize: 12, color: '#64748B', fontWeight: '600', marginBottom: 6 },
  subAmount: { fontSize: 18, fontWeight: 'bold' },
  detailBtn: { backgroundColor: '#334155', padding: 15, borderRadius: 10, alignItems: 'center' },
  detailBtnText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 }
});