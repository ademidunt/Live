import React from 'react';
import { View, Pressable, Text, FlatList, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import FilterPill from '../FilterPills/FilterPill';

//const styles = require('./SearchListStyles')

const SearchList = (demoData) => {

    const navigation = useNavigation();

    const renderItem = ({ item }) => (
      <View style={{alignSelf: 'flex-start', padding: 15}}>
        <TouchableOpacity
          onPress={()=>{navigation.navigate('Profile', {venueId:item.venueId}); console.log("club selected", item.venueId)}}>
          <Text style={{fontSize: 20, fontWeight: 'light', color: "#000"}}>{item.venueName}</Text>
          <Text style={{fontSize: 15, fontWeight: 'bold', color: '#000', marginTop: 5}}>{item.description}</Text>
          <View style={{flexDirection: 'row'}}>
          {item.tags !== undefined ? (
            item.tags.map((tag, index)=> (
              <FilterPill tag={tag}/>
            ))
          ) : (
              <View/>
          )}
          
          </View>
        </TouchableOpacity>
      </View>
    );
  
    return (
      <View style={{width: "100%", flex: 1}}>
        <FlatList
          data={demoData.demoData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    );
  };
  

  export default SearchList;