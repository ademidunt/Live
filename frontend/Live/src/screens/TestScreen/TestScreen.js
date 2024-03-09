import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View } from 'react-native';

const styles = require('./TestScreenStyles')

export default function TestScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollview}>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

