import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View } from 'react-native';

const ProfileHandler = require('../../handlers/ProfileHandler')
const styles = require('./ProfileScreenStyles')

import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";

const text = ProfileHandler.getMovies();
export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ProfileHeader/>
      <ScrollView style={styles.scrollview}>
        <Text style={styles.text}>Name</Text>
        <View style={styles.emailContainer}>
          <Text style={styles.text}>Email:</Text>
          <Text style={styles.text}>Email:</Text>
        </View>
        <Text style={styles.text}>Profile Screen</Text>
        <Text style={styles.text}>Email:</Text>
        <Text style={styles.text}>Test Screen</Text>
        <Text style={styles.text}>Phone Number:</Text>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

