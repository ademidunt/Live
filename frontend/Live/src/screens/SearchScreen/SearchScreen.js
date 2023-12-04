
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Pressable } from 'react-native';
import styles from '../SearchScreen/SearchScreenStyles'; // Import the styles without using require()
import { useNavigation } from '@react-navigation/native';



var isUser = false;


export default function SearchScreen() {
  const navigation = useNavigation();

  const handleNewPost = () => {
    // Implement signin logic here
    navigation.navigate('CreateNewPost');
    console.log('New Post pressed');  
  };

  const handleLogout = () => {
    navigation.navigate('Profile');
    console.log('Redirected to profile');
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
  
   
     { !isUser &&
      <TouchableOpacity style={styles.newPostButton} onPress={handleNewPost}>
        <Text style={styles.buttonText}>New Post</Text>
      </TouchableOpacity>}
      {/* Other content of the screen */}
      
          <Pressable onPress={handleLogout}
           style={({pressed})=> [
          {backgroundColor: pressed ? "#9166ED": "#4709CD"},
          styles.logoutBtn, styles.btn ]}
          >
            <Text style={styles.text}>Logout</Text>
          </Pressable>
  
    </View>

    
  );
}