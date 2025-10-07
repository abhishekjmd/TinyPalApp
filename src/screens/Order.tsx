import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@react-native-vector-icons/fontawesome';
import Toast from 'react-native-toast-message';

const Order = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('token'); // get JWT token
        if (!token) {
          Toast.show({ type: 'error', text1: 'Login Required', text2: 'Please login to view your orders' });
          return;
        }

        const response = await fetch('https://demastore-backend.onrender.com/api/orders', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setOrders(data);
        } else {
          Toast.show({ type: 'error', text1: 'Error', text2: data.message || 'Failed to fetch orders' });
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        Toast.show({ type: 'error', text1: 'Error', text2: 'Something went wrong while fetching orders' });

      } finally {
        setLoading(false); // stop loading
      }
    };

    const unsubscribe = navigation.addListener('focus', fetchOrders);
    return unsubscribe;
  }, [navigation]);

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <FontAwesome name="calendar" size={16} color="#4e54c8" />
        <Text style={styles.orderDate}> {item.date}</Text>
      </View>

      <FlatList
        data={item.items}
        keyExtractor={(prod) => prod.id.toString()}
        renderItem={({ item: prod }) => (
          <Text style={styles.orderItem}>
            {prod.name} × {prod.quantity}
          </Text>
        )}
      />

      <Text style={styles.totalText}>
        <FontAwesome name="money" size={16} color="#4e54c8" />  Total: ₹{item.total}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#4e54c8" />
        <Text style={{ marginTop: 10 }}>Loading orders...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <FontAwesome name="shopping-bag" size={60} color="#ccc" />
          <Text style={styles.emptyText}>No orders yet!</Text>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.navigate('Products')}
          >
            <Text style={styles.backText}>Back to Products</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderOrderItem}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      )}
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 22, fontWeight: '700', color: '#4e54c8', marginBottom: 10 },
  orderCard: {
    backgroundColor: '#f8f8ff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  orderHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  orderDate: { fontSize: 14, color: '#333' },
  orderItem: { fontSize: 14, color: '#555', marginVertical: 2, marginLeft: 5 },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4e54c8',
    marginTop: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  emptyText: { color: '#999', fontSize: 16, marginVertical: 10 },
  backBtn: {
    backgroundColor: '#4e54c8',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 10,
  },
  backText: { color: '#fff', fontWeight: '600' },
});
