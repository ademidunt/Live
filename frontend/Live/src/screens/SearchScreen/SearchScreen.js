import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import PostList from '../HomeScreen/PostList'

const styles = require('./SearchScreenStyles')

export default function SearchScreen() {
  

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <PostList/>
      <StatusBar style="auto" />
    </View>
  );
}

