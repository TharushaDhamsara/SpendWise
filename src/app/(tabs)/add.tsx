import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function AddScreen() {
  const [type, setType] = useState('expense'); // 'income' or 'expense'
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleSave = async () => {
    if (!title || !amount) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      const existingData = await AsyncStorage.getItem('spendwise_transactions');
      const transactionsArray = existingData ? JSON.parse(existingData) : [];

      const newTransaction = {
        id: Date.now().toString(),
        type, // 'income' or 'expense'
        title,
        category: category || (type === 'income' ? 'Salary' : 'General'),
        amount: parseFloat(amount) || 0,
        date: new Date().toLocaleDateString(),
      };

      transactionsArray.push(newTransaction);
      await AsyncStorage.setItem('spendwise_transactions', JSON.stringify(transactionsArray));

      // Trigger local notification
      await Notifications.scheduleNotificationAsync({
        content: {
          title: type === 'income' ? 'Income Added! 💵' : 'Expense Recorded! 💸',
          body: `Successfully logged ${title} of Rs. ${amount}`,
        },
        trigger: null,
      });

      Alert.alert('Success', `${type === 'income' ? 'Income' : 'Expense'} added successfully!`);
      setTitle('');
      setCategory('');
      setAmount('');
      router.push('/(tabs)');
    } catch (error) {
      console.error('Failed to save record', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Type Toggle Buttons */}
      <View style={styles.toggleRow}>
        <Pressable 
          style={[styles.toggleBtn, type === 'expense' && styles.activeExpense]} 
          onPress={() => setType('expense')}
        >
          <Text style={[styles.toggleText, type === 'expense' && styles.activeText]}>Expense</Text>
        </Pressable>
        <Pressable 
          style={[styles.toggleBtn, type === 'income' && styles.activeIncome]} 
          onPress={() => setType('income')}
        >
          <Text style={[styles.toggleText, type === 'income' && styles.activeText]}>Income</Text>
        </Pressable>
      </View>

      <Text style={styles.label}>Title</Text>
      <TextInput 
        style={styles.input} 
        placeholder={type === 'income' ? 'e.g. Freelance, Allowance' : 'e.g. Lunch, Bus Fare'} 
        value={title} 
        onChangeText={setTitle} 
      />

      <Text style={styles.label}>Category</Text>
      <TextInput 
        style={styles.input} 
        placeholder={type === 'income' ? 'Salary, Gift...' : 'Food, Transport, Utilities...'} 
        value={category} 
        onChangeText={setCategory} 
      />

      <Text style={styles.label}>Amount (LKR)</Text>
      <TextInput 
        style={styles.input} 
        placeholder="0.00" 
        keyboardType="numeric" 
        value={amount} 
        onChangeText={setAmount} 
      />

      <Pressable style={[styles.saveBtn, type === 'income' ? styles.bgIncome : styles.bgExpense]} onPress={handleSave}>
        <Text style={styles.saveText}>Save {type === 'income' ? 'Income' : 'Expense'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8FAFC' },
  toggleRow: { flexDirection: 'row', marginBottom: 20, backgroundColor: '#E2E8F0', borderRadius: 8, padding: 4 },
  toggleBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 6 },
  activeExpense: { backgroundColor: '#EF4444' },
  activeIncome: { backgroundColor: '#10B981' },
  toggleText: { fontWeight: 'bold', color: '#64748B' },
  activeText: { color: '#FFFFFF' },
  label: { fontSize: 14, fontWeight: '600', color: '#334155', marginBottom: 8, marginTop: 10 },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', padding: 12, borderRadius: 8, fontSize: 16 },
  saveBtn: { padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 30 },
  bgExpense: { backgroundColor: '#EF4444' },
  bgIncome: { backgroundColor: '#10B981' },
  saveText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }
});