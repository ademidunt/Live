import React, { useState, useEffect } from 'react';
import { View,  Button, ScrollView, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ButtonDark } from '../../components/Buttons/Button';
import MapComponent from '../../components/Map/MapComponent';

const CreateProfileScreen = () => {
  const navigation = useNavigation();
  const [venueName, setVenueName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');


  const handleCreateProfile = () => {
    if (!venueName || !email || !password || !description || !city|| !province|| !postalCode || !country) {
      Alert.alert('Incomplete profile!', 'Please fill in all fields to create a profile.');
      return;
    }        

    const userData = {
      venueName,
      addressLine1,
      addressLine2,
      postalCode,
      city,
      province,
      country,
      email,
      password,
      description,
      tags,
    };

    //should probably add something that catches when the email is already in the adatabse and makes an alert
    const updateDatabase = async () => {
      console.log(`new session`);
      fetch(`${apiUrl}/venue/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then(async (res) => {
          if (res.ok) {
            console.log(`added to the database successfully`);
            navigation.navigate('ReloginClub');
          } else {
            console.log(`something went wrong ${JSON.stringify(res)}`);
          }
        });
    };

    updateDatabase();
    console.log('User Data:', userData);
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>

    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text>Venue Name:</Text>
        <TextInput
          style={styles.input}
          value={venueName}
          onChangeText={(text) => setVenueName(text)}
        />

<Text>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Text>Password:</Text>
        <TextInput
          style={styles.input}
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setpassword(text)}
        />

        <Text>Description:</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={(text) => setDescription(text)}
          multiline
        />

  
    <MapComponent></MapComponent>
     
    <Text>Tags:</Text>
      <View style={styles.tagContainer}>
        {tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text>{tag}</Text>
          </View>
        ))}
      </View>
      <TextInput
        style={styles.input}
        value={tagInput}
        onChangeText={(text) => setTagInput(text)}
        placeholder="Add tags one by one"
      />
      <Button title="Add Tag" onPress={handleAddTag} />

        <ButtonDark title={"Create Profile"} onPress={handleCreateProfile} style={{marginBottom: 5, width: 200, alignSelf: 'center'}}/>
      </View>
    </TouchableWithoutFeedback>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  mapcontainer: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: 300, // Adjust the height as per your requirement
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  profilePicture: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#7a21c0',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#fff', // Text color
  },
});

export default CreateProfileScreen;
