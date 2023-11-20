// LoginScreen.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {

    const navigation = useNavigation();

  const handleClubberLogin = () => {
    navigation.navigate('ClubberLogin');
    console.log('Create Profile button pressed');
  };

  const handleClubLogin = () => {

    navigation.navigate('ClubLogin');
    console.log('Create Profile button pressed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcom to Live! Let's get started! </Text>
      
      <TouchableOpacity style={styles.button} onPress={handleClubberLogin}>
        <Text style={styles.buttonText}>I am a Clubber</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleClubLogin}>
        <Text style={styles.buttonText}>I have a Club</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Set your background color
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#7a21c0',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
