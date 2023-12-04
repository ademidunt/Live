import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import EventPost from '../../components/EventPost';

const styles = require('./SearchScreenStyles')

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      {/* <EventPost/> */}
      <StatusBar style="auto" />
    </View>
  );
}

