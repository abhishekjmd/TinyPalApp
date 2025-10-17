// Navigator.js
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppStack } from './AppStack';

const Navigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setUserToken(token);
      } catch (err) {
        console.log('Error reading token', err);
      } finally {
        // keep loader for at least 2 seconds (optional)
        setTimeout(() => setIsLoading(false), 2000);
      }
    };
    checkToken();
  }, []);


  return (
    <NavigationContainer>
       <AppStack /> 
    </NavigationContainer>
  );
};

export default Navigator;
