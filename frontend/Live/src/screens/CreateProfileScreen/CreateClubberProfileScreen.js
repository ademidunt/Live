import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Keyboard, Alert} from 'react-native';
import PhotoUploadComponent from '../../components/ProfileHeader/PhotoUpload';


const CreateProfileScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [dob, setDob] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleProfilePictureChange = (imageUri) => {
    setProfilePicture(imageUri);
  };

  const handleCreateProfile = () => {
    //make sure all the required fields are complete 
    if (!username || !email || !password || !dob || !bio ) {
      Alert.alert('Incomplete profile!', 'Please fill in all fields to create a prodile.');
      return;
    }
    // Send data to the backend here
    const userData = {
      username,
      email,
      dob,
      bio,
      profilePicture,
    };

    // Print user data to the console for testing
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
      <PhotoUploadComponent onChange={handleProfilePictureChange}/> 

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
});

export default CreateProfileScreen;
