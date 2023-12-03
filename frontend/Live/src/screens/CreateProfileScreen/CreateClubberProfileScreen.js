import React, { useState, useEffect } from 'react';
import { View, Image, Button, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Keyboard, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const CreateProfileScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, SetLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [dob, setDob] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [url, setUrl] = useState('')

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      console.log('Permission to access media library denied');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // console.log(JSON.stringify(result))
      setSelectedImage({ uri: result.assets[0].uri })
      setProfilePicture(result.assets[0].uri)
      //upload image 

      // console.log(profilePicture)
    }
  };

  async function uploadImage () {

    const response = await fetch(profilePicture);
    const blob = await response.blob();
    console.log("the blob is: " + JSON.stringify(blob))
    const imageData = {
      "name": email, 
      "blob": blob
    }

    fetch(`http://192.168.2.50:3000/clubber/imageUpload`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(imageData),
      })
        .then(async (res) => {
          if (res.ok) {
            console.log(`added to the storage successfully`);
          } else {
            console.log(`something went wrong ${JSON.stringify(res)}`);
          }
        })
  }

  const handleCreateProfile = async () => {
    if (!firstName || !email || !password || !dob || !bio) {
      Alert.alert('Incomplete profile!', 'Please fill in all fields to create a profile.');
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      password,
      dob,
      bio,
      profilePicture,
    };

    //should probably add something that catches when the email is already in the adatabse and makes an alert
    const updateDatabase = async () => {
      console.log(`new session`);
      fetch(`http://192.168.2.50:3000/clubber/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then(async (res) => {
          if (res.ok) {
            console.log(`added to the database successfully`);
          } else {
            console.log(`something went wrong ${JSON.stringify(res)}`);
          }
        });
    };
    uploadImage();
    updateDatabase();
  
    // console.log('User Data:', userData);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text>First Name:</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <Text>Last Name:</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={(text) => SetLastName(text)}
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

        <Text>Date of Birth:</Text>
        <TextInput
          style={styles.input}
          value={dob}
          onChangeText={(text) => setDob(text)}
          placeholder="YYYY-MM-DD"
        />

        <Text>Bio:</Text>
        <TextInput
          style={styles.input}
          value={bio}
          onChangeText={(text) => setBio(text)}
          multiline
        />

        <Text>Profile Picture:</Text>
        <View>
          {selectedImage && (
            <Image source={selectedImage} style={{ width: 200, height: 200 }} />
          )}
          <Button title="Select Image" onPress={() => { handleImagePicker(); }} />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleCreateProfile}>
          <Text style={styles.buttonText}>Create Profile</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
