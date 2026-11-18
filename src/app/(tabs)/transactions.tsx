import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TransactionsScreen() {
  const [transactions, setTransactions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Re-loads transactions every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  const loadTransactions = async () => {
    try {
      const storedData = await AsyncStorage.getItem('spendwise_transactions');
      if (storedData) {
        setTransactions(JSON.parse(storedData));
      } else {
        setTransactions([]);
      }
    } catch (error) {
      console.error('Failed to load transactions', error);
    }
  };

  const filteredData = selectedCategory === 'All' 
    ? transactions 
    : transactions.filter((item: any) => item.category === selectedCategory);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>All Expenses</Text>
        <Pressable style={styles.filterBtn} onPress={() => setModalVisible(true)}>
          <MaterialCommunityIcons name="filter-variant" size={20} color="#0EA5E9" />
          <Text style={styles.filterText}>{selectedCategory}</Text>
        </Pressable>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item: any) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>No expenses recorded yet. Add one!</Text>}
        renderItem={({ item }: any) => (
          <View style={styles.rowCard}>
            <View>
              <Text style={styles.rowTitle}>{item.title}</Text>
              <Text style={styles.rowCategory}>{item.category} • {item.date}</Text>
            </View>
            <Text style={styles.rowAmount}>-Rs. {item.amount.toFixed(2)}</Text>
          </View>
        )}
      />

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Category</Text>
            {['All', 'Food', 'Transport', 'Academic', 'Utilities'].map((cat) => (
              <Pressable 
                key={cat} 
                style={styles.modalOption}
                onPress={() => { setSelectedCategory(cat); setModalVisible(false); }}
              >
                <Text style={styles.modalOptionText}>{cat}</Text>
              </Pressable>
            ))}
            <Pressable style={styles.closeBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8FAFC' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1E293B' },
  filterBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E0F2FE', padding: 8, borderRadius: 8, gap: 4 },
  filterText: { color: '#0EA5E9', fontWeight: '600' },
  rowCard: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, marginBottom: 10, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  rowTitle: { fontSize: 16, fontWeight: '600', color: '#1E293B' },
  rowCategory: { fontSize: 12, color: '#64748B', marginTop: 2 },
  rowAmount: { fontSize: 16, fontWeight: 'bold', color: '#EF4444' },
  emptyText: { textAlign: 'center', color: '#64748B', marginTop: 40, fontSize: 16 },
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
  modalContent: { backgroundColor: '#FFFFFF', padding: 24, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  modalOption: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  modalOptionText: { fontSize: 16, color: '#334155' },
  closeBtn: { marginTop: 15, backgroundColor: '#E2E8F0', padding: 12, borderRadius: 8, alignItems: 'center' },
  closeText: { fontWeight: 'bold', color: '#475569' }
});