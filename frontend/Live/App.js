import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from "./src/screens/ProfileScreen/ProfileScreen";
import SearchScreen from "./src/screens/SearchScreen/SearchScreen";
import LoginScreen from "./src/screens/LoginScreens/LoginScreen"
import ClubberLoginScreen from "./src/screens/LoginScreens/ClubberLoginScreen";
import ClubLoginScreen from "./src/screens/LoginScreens/ClubLoginScreen";
import CreateClubberProfileScreen from "./src/screens/CreateProfileScreen/CreateClubberProfileScreen";
import CreateClubProfileScreen from "./src/screens/CreateProfileScreen/CreateClubProfileScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const tabNavigator = require('./AppStyles')

export default function App() {
  return(
  <NavigationContainer>
    <Tab.Navigator 
    initialRouteName={tabNavigator.initialRouteName}
    screenOptions={tabNavigator.screenOptions}
    >
      <Tab.Screen name="Login" component={LoginStackNavigator} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  </NavigationContainer>
  );
};

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ClubberLogin" component={ClubberLoginScreen} />
      <Stack.Screen name="ClubLogin" component={ClubLoginScreen} />
      <Stack.Screen name="CreateClubberProfile" component={CreateClubberProfileScreen} />
      <Stack.Screen name="CreateClubProfile" component={CreateClubProfileScreen} />
    </Stack.Navigator>
  );
};


