import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@react-native-vector-icons/fontawesome';
import Toast from 'react-native-toast-message';

export default function CartScreen({ navigation }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) setCart(JSON.parse(storedCart));
    };
    const unsubscribe = navigation.addListener('focus', fetchCart);
    return unsubscribe;
  }, [navigation]);

  const handleCheckout = async () => {
    try {
      const token = await AsyncStorage.getItem('token'); // JWT token
      if (!token) {
        Toast.show({ type: 'error', text1: 'Login Required', text2: 'Please login to place order' });
        return;
      }

      if (cart.length === 0) {
        Toast.show({ type: 'error', text1: 'Cart Empty', text2: 'Add some products first' });
        return;
      }

      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

      const response = await fetch('https://demastore-backend.onrender.com/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items: cart, total }),
      });

      const data = await response.json();

      if (response.ok) {
        Toast.show({ type: 'success', text1: 'Success', text2: 'Order placed successfully!' });
        await AsyncStorage.removeItem('cart'); // clear cart
        setCart([]);
        navigation.navigate('Orders'); // go to orders screen
      } else {
        Alert.alert('Error', data.message || 'Failed to place order');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      Toast.show({ type: 'error', text1: 'Error', text2: 'Something went wrong' });
    }
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };


  const increment = async (id) => {
    const updated = cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updated);
    await AsyncStorage.setItem('cart', JSON.stringify(updated));
  };

  const decrement = async (id) => {
    const updated = cart
      .map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0);
    setCart(updated);
    await AsyncStorage.setItem('cart', JSON.stringify(updated));
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => decrement(item.id)} style={styles.qtyBtn}>
          <Text style={styles.qtyText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.qtyValue}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => increment(item.id)} style={styles.qtyBtn}>
          <Text style={styles.qtyText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      
      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty 🛒</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 100 }}
          />

          <View style={styles.footer}>
            <Text style={styles.total}>Total: ₹{getTotal()}</Text>
            <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f7fb', padding: 15 },
  title: { fontSize: 22, fontWeight: '700', color: '#333', marginBottom: 15 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2,
  },
  image: { width: 70, height: 70, borderRadius: 8, marginRight: 10 },
  name: { fontWeight: '600', color: '#333' },
  price: { color: '#4e54c8', fontWeight: '600' },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBtn: {
    backgroundColor: '#4e54c8',
    width: 30,
    height: 30,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  qtyValue: { marginHorizontal: 10, fontWeight: '600' },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    elevation: 5,
  },
  total: { fontSize: 18, fontWeight: '700', color: '#333' },
  checkoutBtn: {
    backgroundColor: '#4e54c8',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  checkoutText: { color: '#fff', fontWeight: '600' },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#777', fontSize: 16 },
});
