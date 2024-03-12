import React, {useState, useRef} from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { SafeAreaView, Dimensions, StyleSheet, View, TextInput,Text, Button, Alert, Touchable, Keyboard, TouchableOpacity, FlatList } from 'react-native';
import { ButtonDark} from '../Buttons/Button.js'
import { SearchBar} from '../SearchBar/SearchBar.js'
import { H2, H3, P } from '../Text/Text.js';


const {width, height } = Dimensions.get("window")

const ASPECT_RATIO = width/ height
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA *ASPECT_RATIO;
const INITIAL_LAT = 43.009953;
const INITIAL_LNG = -81.273613;
const INITIAL_POSITION= {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

export default function MapComponent() {


  const [searchText, setSearchText] = useState("");
  const [data,setData] = useState()
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const mapKey = useRef(1);

  const searchAddress = async () => {

    if(!searchText.trim().length) return;

    const googleApiUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json"
    const input = searchText.trim()
    const location = `${INITIAL_LAT},${INITIAL_LNG}`
    const url = `${googleApiUrl}?query=${input}&location=${location}&key=AIzaSyB1yq3WvTcJB0vZOc33AR6N0XO7P3kPD3c`

    try{
      const resp = await fetch (url)
      const json = await resp.json()
      var places = []
   

      if (json && json.results){
        const placesData = json.results.map(item => ({
          address: item.formatted_address,
          latitude: item.geometry.location.lat,
          longitude: item.geometry.location.lng
        }));
        setData(placesData);
        setShowDropdown(true);
    }}catch(e){
      console.error(e)
      

    }
  };

  const handleSelectAddress = (address, latitude, longitude) => {
    setSearchText(address);
    setShowDropdown(false);
    setSelectedLocation({ latitude, longitude });
    console.log(latitude,longitude)
    mapKey.current += 1;
  };

  return (
   
    <View style={styles.container}>
    <View style={styles.searchBox}>
      <Text style={styles.searchBoxLabel}>Find Address</Text>
      <TextInput
        style={styles.searchBoxField}
        onChangeText={(text) => {
          setSearchText(text);
        }}
        value={searchText}
        placeholder="Enter address"
        autoCapitalize="sentences"
        onSubmitEditing={searchAddress} // Trigger search when return key is pressed
      />

    </View>
   
    {showDropdown && (
        <View style={styles.dropdownContainer}>
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.dropdownItem}
            onPress={() => handleSelectAddress(item.address, item.longitude, item.latitude)}
          >
            <P>{item.address}</P>
          </TouchableOpacity>
        ))}
      </View>
      )}
    <MapView
      key={mapKey.current}
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      initialRegion={INITIAL_POSITION}
    >
       {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            }}
            title={searchText}
          />
        )}
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
  searchBox: {
  
   
      // borderColor: "#aaa",
      // backgroundColor: "white",
      // padding: 8,
      // alignSelf: "center",
      // marginTop: 20,

  },
  searchBoxField: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,

  },
  buttonContainer: {
    backgroundColor: '#4709CD',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#fff', // Text color

  },
  buttonLabel: {
    // fontSize: 14,
    backgroundColor: "Red",

  },
  resultsContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  resultsLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dropdownContainer: {
    backgroundColor: '(189, 195, 199, 0.5)'
  },
  dropdownItem: {
      fontSize: 24,
      fontWeight: 'regular',
  },

});
