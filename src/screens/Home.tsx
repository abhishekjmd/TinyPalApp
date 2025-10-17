import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestBody } from '../config';

const Home = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.Button,
        {
          backgroundColor: '#E7809E',
          borderColor: '#B65672'
        }]}
        onPress={() => navigation.navigate('doYouKnow')}
      >
        <Text style={styles.text}>Do you Know</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.Button,
        {
          backgroundColor: '#4C7B9E',
          borderColor: '#395F7B'
        }]}
        onPress={() => navigation.navigate('flashcard')}
      >
        <Text style={styles.text}>Flashcard</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20
  },
  Button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  text: {
    color: 'white'
  },
})