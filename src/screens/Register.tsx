import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome';
import Toast from 'react-native-toast-message';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false); // loading state

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Toast.show({ type: 'error', text1: 'Please fill all fields' })
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('https://demastore-backend.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Toast.show({ type: 'success', text1: 'Registration successful! Please log in.' })
        navigation.navigate('Login');
      } else {
        Toast.show({ type: 'error', text1: data.message || 'Registration failed' })
      }
    } catch (error) {
      console.error(error);
      Toast.show({ type: 'error', text1: 'Something went wrong. Please try again later.' })
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={20} color="#666" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
                    placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" size={20} color="#666" />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
                    placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="#666" />
        <TextInput
          placeholder="Password"
          // secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
                    placeholderTextColor="#999"
        />
      </View>

      <TouchableOpacity style={styles.signupBtn} onPress={handleRegister}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.signupText}>Sign Up</Text>
        )}

      </TouchableOpacity>

      <TouchableOpacity style={styles.googleBtn}>
        <FontAwesome name="google" size={20} color="#fff" />
        <Text style={styles.googleText}>Sign up with Google</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ color: '#4e54c8', fontWeight: 'bold' }}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7fb',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: { fontSize: 28, fontWeight: '700', color: '#333' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 40 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    elevation: 2,
    height: 50,
  },
  input: { flex: 1, paddingLeft: 10 },
  signupBtn: {
    backgroundColor: '#4e54c8',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  signupText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#db4437',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 20,
  },
  googleText: { color: '#fff', marginLeft: 10, fontWeight: '600' },
  footer: { flexDirection: 'row', marginTop: 20 },
});
