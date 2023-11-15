import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

const styles = require('./ProfileScreenStyles')

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}

