import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

export default function MapComponent() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825, // Example latitude
          longitude: -122.4324, // Example longitude
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Example marker */}
        <Marker
          coordinate={{
            latitude: 37.78825, // Example marker latitude
            longitude: -122.4324, // Example marker longitude
          }}
          title="Example Marker"
          description="This is an example marker"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: 300, // Adjust the height as per your requirement
  },
});
