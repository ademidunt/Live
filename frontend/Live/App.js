import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ProfileScreen from "./src/screens/VenueProfileScreen/VenueProfileScreen";
import SearchScreen from "./src/screens/SearchScreen/SearchScreen";
import ReservationScreen from './src/screens/ReservationScreen/ReservationScreen';
import TestScreen from './src/screens/TestScreen/TestScreen';

const Tab = createBottomTabNavigator();

const tabNavigator = require('./AppStyles')

export default function App() {
  return(
  <NavigationContainer>
    <Tab.Navigator 
    initialRouteName={tabNavigator.initialRouteName}
    screenOptions={tabNavigator.screenOptions}
    >
      <Tab.Screen name="Search" component={SearchScreen}/>
      <Tab.Screen name="Test" component={TestScreen} />
      <Tab.Screen name="Reservation" component={ReservationScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  </NavigationContainer>
  );
}


