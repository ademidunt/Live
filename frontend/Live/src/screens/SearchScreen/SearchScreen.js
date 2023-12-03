import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Button, FlatList } from 'react-native';

const styles = require('./SearchScreenStyles');

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // Perform search based on searchQuery and update searchResults state
    // You can replace the dummy data and search logic with your actual implementation
    const dummyData = [
      { name: 'Result 1' },
      { name: 'Result 2' },
      { name: 'Result 3' },
    ];
    setSearchResults(dummyData);
  };

  return (
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
            <Text>{item.name}</Text>
          </View>
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}
