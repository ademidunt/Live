import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import PhotoUploadComponent from '../../components/'

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
    // Send data to the backend here
    const userData = {
      name: username,
      email,
      dob,
      bio,
      profilePicture,
    };


  };

  return (
    <View style={styles.container}>
      <Text>Name:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

    <Text>Username:</Text>
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
      <PhotoUploadComponent
        selectedImage = {profilePicture}
        onImageChange={handleProfilePictureChange}
      />

      <Button title="Create Profile" onPress={handleCreateProfile} />
    </View>
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
