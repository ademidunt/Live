import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

const styles = require('./SearchScreenStyles')

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}

