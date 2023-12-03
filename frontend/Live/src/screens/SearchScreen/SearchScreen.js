import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Button, FlatList, Keyboard, TouchableWithoutFeedback } from 'react-native';

const styles = require('./SearchScreenStyles');

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  }; 

  const handleSearch = () => {
    // Perform search based on searchQuery and update searchResults state
    // You can replace the dummy data and search logic with your actual implementation
    fetch(`http://192.168.2.50:3000/venue/search/${searchQuery}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        })
        .then(async (res) => {
          if (res.ok) {
            const data = await res.json(); // Parse the response JSON
            console.log('Retrieved from DB successfully:', data);
            setSearchResults(data)
          }
          else{
            console.log(`something went wront ${JSON.stringify(res)}`)
          }
        })
      
    };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
    <View style={[styles.container, { marginTop: 50 }]}>
      <TextInput
        style={styles.input}
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        placeholder="Search"
      />
      <Button title="Search" onPress={handleSearch} />

      <FlatList
        data={searchResults}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text style={styles.resultItem}>{item.name}</Text>
          </View>
        )}
      />

      <StatusBar style="auto" />
    </View>
    </TouchableWithoutFeedback>
  );
}
