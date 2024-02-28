import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import './global.js';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from "./src/screens/VenueProfileScreen/VenueProfileScreen";
import SearchScreen from "./src/screens/SearchScreen/SearchScreen";
import ReservationScreen from './src/screens/ReservationScreen/ReservationScreen';
import TestScreen from './src/screens/TestScreen/TestScreen';
import LoginScreen from "./src/screens/LoginScreens/LoginScreen";
import ClubberLoginScreen from "./src/screens/LoginScreens/ClubberLoginScreen";
import ClubLoginScreen from "./src/screens/LoginScreens/ClubLoginScreen";
import CreateClubberProfileScreen from "./src/screens/CreateProfileScreen/CreateClubberProfileScreen";
import CreateClubProfileScreen from "./src/screens/CreateProfileScreen/CreateClubProfileScreen";
import ViewClubberProfileScreen from "./src/screens/ClubberProfileScreen/ViewClubberProfile";
import clubberLogin from "./src/screens/LoginScreens/clubberLogin";
import venueLogin from "./src/screens/LoginScreens/venueLogin";
import ViewClubberReviews from "./src/screens/ClubberProfileScreen/ViewClubberReviews"
import VenueClubberPerspective from './src/screens/Venue_ClubberPerspective/VenueClubberPerspective';
import createClubberProfileLogin from "./src/screens/LoginScreens/clubberSuccessfulProfileLogin";
import createClubProfileLogin from "./src/screens/LoginScreens/CreateClubSuccessProfileLogin.js";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const tabNavigator = require('./AppStyles')

export default function App() {

  return(
  <NavigationContainer>
    <Tab.Navigator 
    initialRouteName={tabNavigator.initialRouteName}
    screenOptions={({ route }) => ({
      ...tabNavigator.screenOptions,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Search') {
          iconName = focused ? 'search' : 'search-outline';
        } else if (route.name === 'Login') {
          iconName = focused ? 'log-in' : 'log-in-outline';
        } else if (route.name === 'Reservation') {
          iconName = focused ? 'calendar' : 'calendar-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    >
      <Tab.Screen name="Search" component={SearchStackNavigator}/>
      <Tab.Screen name="Login" component={LoginStackNavigator} />
      <Tab.Screen name="Reservation" component={ReservationStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />

    </Tab.Navigator>
  </NavigationContainer>
  );
};

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login"
    screenOptions={{
      headerStyle: {
        backgroundColor: '#4709CD',
      },
      headerTintColor: '#FFFFFF',
      headerTitleStyle: {
        color: '#FFFFFF',
      },
    }}>
      <Stack.Screen name="Welcome" component={LoginScreen} />
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

const SearchStackNavigator = () => {
  return(
  <Stack.Navigator initialRouteName='Search Stack' 
  screenOptions={{
    headerStyle: {
      backgroundColor: '#4709CD',
    },
    headerTintColor: '#FFFFFF',
    headerTitleStyle: {
      color: '#FFFFFF',
    },
  }}>
    <Stack.Screen name="Search Venues" component={SearchScreen}/>
    <Stack.Screen name="VenueClubberPerspective" component={VenueClubberPerspective}/>
  </Stack.Navigator>
  );
}

const ReservationStackNavigator = () => {
  return(
    <Stack.Navigator initialRouteName='Reservation Stack' screenOptions={{
      headerStyle: {
        backgroundColor: '#4709CD',
      },
      headerTintColor: '#FFFFFF',
      headerTitleStyle: {
        color: '#FFFFFF',
      },
    }}>
      <Stack.Screen name="Reservations" component={ReservationScreen}/>
    </Stack.Navigator>
  )
}

const ProfileStackNavigator = () => {
  return(
    <Stack.Navigator initialRouteName='Profile Stack' screenOptions={{
      headerStyle: {
        backgroundColor: '#4709CD',
      },
      headerTintColor: '#FFFFFF',
      headerTitleStyle: {
        color: '#FFFFFF',
      },
    }}>
      {/*Static venue ID for now to implement event functionality*/}
      <Stack.Screen name="Your Profile" component={ProfileScreen} initialParams={{venueId: 'AsedlTwX2fdmuN0yWiM1k4BzKFb2'}}/> 
    </Stack.Navigator>
  )
}