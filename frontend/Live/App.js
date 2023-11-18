import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from "./src/screens/ProfileScreen/ProfileScreen";
import SearchScreen from "./src/screens/SearchScreen/SearchScreen";
import LoginScreen from "./src/screens/LoginScreen/LoginScreen";
import CreateProfileScreen from "./src/screens/CreateProfileScreen/CreateProfileScreen";

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
      <Stack.Screen name="CreateProfile" component={CreateProfileScreen} />
    </Stack.Navigator>
  );
};


