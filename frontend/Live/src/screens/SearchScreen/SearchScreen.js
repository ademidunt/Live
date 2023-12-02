import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from '../SearchScreen/SearchScreenStyles'; // Import the styles without using require()


var isUser = true;

const handleNewPost = () => {
  // Implement signin logic here
  navigation.navigate('CreateNewPost');
  console.log('New Post pressed');  
};

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
  
   
     { !isUser &&
      <TouchableOpacity style={styles.newPostButton} onPress={handleNewPost}>
        <Text style={styles.buttonText}>New Post</Text>
      </TouchableOpacity>}
      {/* Other content of the screen */}
    </View>
  );
}