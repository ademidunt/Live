import EventPost from '../../components/EventPost';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, Text,FlatList, TouchableOpacity, RefreshControl, StatusBar } from 'react-native';
import SearchBar from '../../components/SearchBar/SearchBar';
import FilterPill from '../../components/FilterPills/FilterPill';
import { useFocusEffect } from '@react-navigation/native';

const styles = require('./SearchScreenStyles');

/**
 * Controls all operations on the search screen.
 */
export default SearchScreen = ({ navigation }) => {

  const [search, setSearch] = useState('');//The search value
  const [data, setData] = useState([]);//Manages the data displayed during the search
  const [unfilteredData, setUnfilteredData] = useState([]);//Holds raw unfiltered/searched data
  const [refreshing, setRefreshing] = useState(false);//Whether the search list is refreshing or not

  //Get data for raw data
  const getVenues = async () => {
    setRefreshing(true);
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
      setRefreshing(false);
    });
 }
//Get venue data when first opening the app
 useEffect(() => {
  getVenues();
 }, []);
 
//Refresh when focus is put on search screen.
 useFocusEffect(
  React.useCallback(() => {
    getVenues();
    return () => {
      // Do something when the screen is unfocused
      // Useful for cleanup functions
    };
  }, [])
);

//When someone presses the search button
 function onSearchClick(s) {
  setSearch(search);

  if (s !== undefined) {
    //Search and filter data
    const filteredData = unfilteredData.filter((venue) =>
      venue.venueName.toLowerCase().includes(s.toLowerCase()) || (venue.description && venue.description.toLowerCase().includes(s.toLowerCase()) ||
      (venue.tags && venue.tags.includes(s))
    ));

    console.log("Filtered Data " + JSON.stringify(filteredData));
    setData(filteredData);
  }
}
//Render filter search list item.
const renderItem = ({ item }) => (
  <View style={{alignSelf: 'flex-start', padding: 15}}>
    <TouchableOpacity
      onPress={()=>{navigation.navigate('VenueProfile', {venueId:item.venueId}); }}>
      <Text style={{fontSize: 20, fontWeight: 'light', color: "#000"}}>{item.venueName}</Text>
      <Text style={{fontSize: 15, fontWeight: 'bold', color: '#000', marginTop: 5}}>{item.description}</Text>
      <View style={{flexDirection: 'row'}}>
      {item.tags !== undefined ? (
        item.tags.map((tag, index)=> (
          <FilterPill key={index} tag={tag}/>
        ))
      ) : (
          <View/>
      )}
      
      </View>
    </TouchableOpacity>
  </View>
);
//Render search list.
return (
    <View style={styles.container1}>
      <StatusBar barStyle="light-content" />
      <View style={{width: "100%", marginTop: 15}}> 
        <SearchBar onSearch={(search) => onSearchClick(search)}/>
      </View>
      <View style={{height: 0.5, backgroundColor: "gray", marginTop: 15}}/>
      <View style={{width: "100%", flex: 1}}>
      <FlatList
        style={{backgroundColor: "#ffffff"}}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.venueId} 
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getVenues}
          />
        }
      />
      </View>
    </View>
  );
};