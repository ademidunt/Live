import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';

const CreateProfileScreen = () => {
  const [name, setName] = useState('');
  const [usernamename, setuserName] = useState('');
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
      name,
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
        value={name}
        onChangeText={(text) => setName(text)}
      />

    <Text>Username:</Text>
      <TextInput
        style={styles.input}
        value={usernamename}
        onChangeText={(text) => setUsername(text)}
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
      {profilePicture && (
        <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
      )}
      <Button
        title="Select Profile Picture"
        onPress={() => {
          // Implement image picker logic here
          // For example, you can use a library like react-native-image-picker
          // and update the handleProfilePictureChange function
        }}
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
