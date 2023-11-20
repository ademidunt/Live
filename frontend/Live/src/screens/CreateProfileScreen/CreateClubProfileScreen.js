import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';

const CreateProfileScreen = () => {
  const [clubName, setClubName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [bio, setBio] = useState('');

  const handleCreateClub = () => {
    // Send data to the backend here
    const userData = {
      name: clubName,
      email,
      password,
      bio,

    };
  };

  return (
    <View style={styles.container}>
      <Text>Name:</Text>
      <TextInput
        style={styles.input}
        value={clubName}
        onChangeText={(text) => setClubName(text)}
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

      <Text>Bio:</Text>
      <TextInput
        style={styles.input}
        value={bio}
        onChangeText={(text) => setBio(text)}
        multiline
        placeholder ="be sure to use descriptive keywords in your bio!"
      />

      <Button title="Create Club" onPress={handleCreateClub} />
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
