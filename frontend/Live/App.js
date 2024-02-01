import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import './global.js'
import { retrieveUserType } from './src/handlers/authService.js';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from "./src/screens/VenueProfileScreen/VenueProfileScreen";
import SearchScreen from "./src/screens/SearchScreen/SearchScreen";
import ReservationScreen from './src/screens/ReservationScreen/ReservationScreen';
import TestScreen from './src/screens/TestScreen/TestScreen';
import LoginScreen from "./src/screens/LoginScreens/LoginScreen"
import ClubberLoginScreen from "./src/screens/LoginScreens/ClubberLoginScreen";
import ClubLoginScreen from "./src/screens/LoginScreens/ClubLoginScreen";
import CreateClubberProfileScreen from "./src/screens/CreateProfileScreen/CreateClubberProfileScreen";
import CreateClubProfileScreen from "./src/screens/CreateProfileScreen/CreateClubProfileScreen";
import ViewClubberProfileScreen from "./src/screens/ClubberProfileScreen/ViewClubberProfile"
import clubberLogin from "./src/screens/LoginScreens/clubberLogin"
import venueLogin from "./src/screens/LoginScreens/venueLogin"
import ViewClubberReviews from "./src/screens/ClubberProfileScreen/ViewClubberReviews"
import VenueClubberPerspective from './src/screens/Venue_ClubberPerspective/VenueClubberPerspective';
import createClubberProfileLogin from "./src/screens/LoginScreens/clubberSuccessfulProfileLogin"
import createClubProfileLogin from "./src/screens/LoginScreens/CreateClubSuccessProfileLogin.js"

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const tabNavigator = require('./AppStyles')

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ViewClubber" component={ViewClubberProfileScreen} />
      <Stack.Screen name="ClubberReviews" component={ViewClubberReviews}/>
      <Stack.Screen name="ClubberLogin" component={ClubberLoginScreen} />
      <Stack.Screen name="ClubLogin" component={ClubLoginScreen} />
      <Stack.Screen name="CreateClubberProfile" component={CreateClubberProfileScreen} />
      <Stack.Screen name="CreateClubProfile" component={CreateClubProfileScreen} />
      <Stack.Screen name="clubberLogin" component={clubberLogin} />
      <Stack.Screen name="venueLogin" component={venueLogin} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Relogin" component={createClubberProfileLogin} />
      <Stack.Screen name="ReloginClub" component={createClubProfileLogin} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName="LoginScreen"
        screenOptions={tabNavigator.screenOptions}
      >
        <Tab.Screen name="LoginScreen" component={LoginStackNavigator} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Reservation" component={ReservationScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};