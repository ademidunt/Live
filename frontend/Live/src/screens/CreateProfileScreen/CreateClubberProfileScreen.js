import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Keyboard, Alert} from 'react-native';
import PhotoUploadComponent from '../../components/ProfileHeader/PhotoUpload';


const CreateProfileScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [dob, setDob] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState('goodbye');

  //using to update props between this and photoupload component 
  const handleProfilePictureChange = (image) => {
    console.log(image)
    setProfilePicture(image);
  };

  const handleCreateProfile = () => {
    //make sure all the required fields are complete 
    if (!username || !email || !password || !dob || !bio ) {
      Alert.alert('Incomplete profile!', 'Please fill in all fields to create a prodile.');
      return;
    }
    //update the profile picture that was selected 
   
    // Send data to the backend here
    // setProfilePicture(PhotoUploadComponent.selectedImage.uri)
    const userData = {
      username,
      email,
      password,
      dob,
      bio,
      profilePicture,
    };

    const updateDatabase = async () => {
      console.log(`new session`)
      // right now I am using my IP address , probably incorrect
      fetch(`http://192.168.2.50:4000/ClubberProfiles/CreateProfile`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body : JSON.stringify(userData)
        })
        .then(async (res) => {
          if (res.ok) {
            console.log(`added to the databse successfully`)
          }
          else{
            console.log(`something went wront ${JSON.stringify(res)}`)
          }
        })
    }

  updateDatabase();
  // Print user data to the console for testing
  console.log(profilePicture)
  console.log('User Data:', userData);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
    <View style={styles.container}>
      <Text>Username:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

    <Text>email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

    <Text>password:</Text>
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
      <PhotoUploadComponent handleProfilePictureChange={handleProfilePictureChange}/> 

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
    ustifyContent: 'center', 
    alignSelf: 'center', 
    color: '#fff', // Text color
  },
});

export default CreateProfileScreen;
