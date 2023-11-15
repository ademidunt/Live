import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import ProfileScreen from "./src/screens/ProfileScreen/ProfileScreen";
import SearchScreen from "./src/screens/SearchScreen/SearchScreen";

export default function App() {
  return(
  <NavigationContainer>
    <Tab.Navigator 
    initialRouteName='./src/screens/SearchScreen/SearchScreen'
    screenOptions={{
      headerShown: false,
      headerTintColor: '#FFFFFF',
      headerStyle: {
        backgroundColor: "#4709CD",
        borderBottomColor: "#4709CD"
      },

      tabBarActiveTintColor: '#FFFFFF',
      tabBarInactiveTintColor: "#9166ED",

      tabBarStyle: {
        backgroundColor: '#4709CD',
        borderTopColor: "#4709CD"
      } 
    }}
    >
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown: true}}/>
    </Tab.Navigator>
  </NavigationContainer>
  );
}


