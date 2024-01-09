import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, Text, Pressable } from 'react-native';

const CreateNewRating = () => {
  const [selectedRating, setSelectedRating] = useState('1'); // Initial rating value

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };

  const createRating = () => {
    // Logic to create a new rating with the selected value (selectedRating)
    console.log(`New Rating: ${selectedRating}`);
    // Perform actions here, such as API calls to save the rating, etc.
  };

  return (
    <View style={styles.contactSctn}>
      <View style={styles.contactCtnt}>
        <Text style={styles.text}>Select Rating:</Text>
        <View style={styles.contactCtntDsply}>
          <RNPickerSelect
            onValueChange={handleRatingChange}
            items={[
              { label: '1', value: '1' },
              { label: '2', value: '2' },
              { label: '3', value: '3' },
              { label: '4', value: '4' },
              { label: '5', value: '5' },
            ]}
            value={selectedRating}
            style={pickerSelectStyles}
          />
        </View>
      </View>
      <View style={styles.logout}>
        <Pressable
          style={({ pressed }) => [
            { backgroundColor: pressed ? '#9166ED' : '#4709CD' },
            styles.logoutBtn,
            styles.btn,
          ]}
          onPress={createRating}
        >
          <Text style={styles.text}>Create Rating</Text>
        </Pressable>
      </View>
    </View>
  );
};

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black', // text color
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: 'lightgray',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black', // text color
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: 'lightgray',
  },
};
const styles = {
  
  
  input: {
    // Your styles for the text input
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: 'lightgray'
  },

  btn: {
    // Your shared styles for buttons
    minWidth: 150,
    alignItems: 'center',
  },
  text: {
    // Your styles for text elements
    color: 'white',
  },
};

export default CreateNewRating;