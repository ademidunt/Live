import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const SignInScreen = () => {
  // State variables to manage email and password input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle the login process
  const handleSignIn = () => {
    // Validation: Check if email and password are not empty
    if (!email || !password) {
      // Alert the user if fields are incomplete
      Alert.alert('Incomplete Information', 'Please enter email and password.');
      return;
    }

    // Implement logic for authenticating user (communicate with backend, etc.)
    

    // For demonstration purposes, simply logging the entered credentials
    console.log('Login Attempt:', { email, password });

    // Clear email and password fields after login attempt (for demonstration)
    setEmail('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      {/* Email input field */}
      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address" // Set keyboard type to email
        autoCapitalize="none" // Disable auto-capitalization for email
      />

      {/* Password input field */}
      <Text>Password:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true} // Mask text input for password
      />

      {/* Button to trigger the login process */}
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default SignInScreen;