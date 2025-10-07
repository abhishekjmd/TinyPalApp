import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Splash({ navigation }) {
  useEffect(() => {
    const checkLogin = async () => {
      // Show splash for at least 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Check if user is logged in
      const token = await AsyncStorage.getItem('token');

      if (token) {
        navigation.replace('Home'); // go to Home if logged in
      } else {
        navigation.replace('Login'); // go to Login if not logged in
      }
    };

    checkLogin();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5Kr9wEdk_6GSVpCc3jNZMPgxQNvE55K2xoQ&s' }}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Derma Store</Text>
      <Text style={styles.subtitle}>Your Gateway to Skincare</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#4e54c8',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
});
