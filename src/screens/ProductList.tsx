import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome';
import Toast from 'react-native-toast-message';


const categories = ['All', 'Cleanser', 'Serum', 'Sunscreen', 'Moisturizer'];

export default function ProductList({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [search, selectedCategory, products]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://demastore-backend.onrender.com/api/products');
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to fetch products',
        text2: error.message || 'Something went wrong',
        visibilityTime: 3000, // optional
      });
    } finally {
      setLoading(false);
    }
  };


  const addToCart = async (product) => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      let cart = storedCart ? JSON.parse(storedCart) : [];

      // check if product already exists
      const existingItem = cart.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      setCart(cart); // update state for badge
      // alert(`${product.name} added to cart`);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error adding to cart:',
        text2: error.message || 'Something went wrong',
        visibilityTime: 3000, // optional
      });
    }
  };


  const filterProducts = () => {
    let filtered = products;
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    if (search) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#4e54c8" />
        <Text style={{ marginTop: 10 }}>Loading products...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>DermaStore</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cart', { cart })}>
          <FontAwesome name="shopping-cart" size={28} color="#333" />
          {cart.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.badgeText}>{cart.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        {/* <Icon name="magnify" size={20} color="#999" /> */}
        <TextInput
          placeholder="Search products..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
          placeholderTextColor="#999"
        />
      </View>

      {/* Category Filter */}
      <View style={{height:50}}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryChip,
              selectedCategory === item && styles.activeCategory,
            ]}
            onPress={() => setSelectedCategory(item)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === item && styles.activeCategoryText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
        style={styles.categoryList}
      />
</View>
      {/* Product List */}
      <FlatList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>₹{item.price}</Text>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => addToCart(item)}
            >
              <Text style={styles.addText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f7fb', padding: 15 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  cartBadge: {
    position: 'absolute',
    right: -8,
    top: -5,
    backgroundColor: '#ff5252',
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  badgeText: { color: '#fff', fontSize: 12 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 45,
    marginBottom: 15,
    elevation: 2,
  },
  searchInput: { flex: 1, marginLeft: 10 },
  categoryList: { marginBottom: 15 },
  categoryChip: {
    backgroundColor: '#fff',
    justifyContent:'center',alignItems:'center',
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    elevation: 2,
    height:30
  },
  activeCategory: {
    backgroundColor: '#4e54c8',
  },
  categoryText: { color: '#333', fontWeight: '500' },
  activeCategoryText: { color: '#fff' },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    margin: 5,
    padding: 10,
    alignItems: 'center',
    elevation: 3,
  },
  image: { width: 100, height: 100, borderRadius: 10, marginBottom: 10 },
  name: { fontWeight: '600', textAlign: 'center' },
  price: { color: '#4e54c8', marginVertical: 5 },
  addBtn: {
    backgroundColor: '#4e54c8',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 15,
  },
  addText: { color: '#fff', fontWeight: '600' },
});
