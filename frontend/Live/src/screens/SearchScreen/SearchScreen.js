import { StatusBar } from 'expo-status-bar';
import EventPost from '../../components/EventPost';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchList from '../../components/SearchList/SearchList';


const styles = require('./SearchScreenStyles')

export default SearchScreen = ({ onSearch }) => {

  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [unfilteredData, setUnfilteredData] = useState([]);

  const getVenues = async () => {
    fetch(`${apiUrl}/Venue`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })
    .then(async (res) => {
      if (res.ok) {
        let venueData = await res.json();
        setUnfilteredData(venueData);
        setData(venueData);
        
      }
      else{
        console.log(`something went wrong ${JSON.stringify(res)}`)
      }
    });
 }

 useEffect(() => {
  getVenues();
 }, []);

 function onSearchClick(s) {
  console.log("Search " + s);
   setSearch(search);

  // Filter the demoData based on the search term
  const filteredData = unfilteredData.filter((venue) =>
    venue.venueName.toLowerCase().includes(s.toLowerCase())
  );

  console.log("Filtered Data " + JSON.stringify(filteredData));


   // Update the state with the filtered data
   setData(filteredData);
}

  return (
    <View style={styles.container1}>
      <View style={styles.spacer}/>
      <SearchBar onSearch={(search) => onSearchClick(search)}/>
      <SearchList demoData={data}/>
    </View>
  );
};