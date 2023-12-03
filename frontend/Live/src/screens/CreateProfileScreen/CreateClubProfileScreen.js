import React, { useState, useEffect } from 'react';
import { View,  Button, ScrollView, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Keyboard, Alert } from 'react-native';

const CreateProfileScreen = () => {
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
      fetch(`http://192.168.2.50:3000/venue/`, {
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
  
      <Text>Address Line 1</Text>
        <TextInput
          style={styles.input}
          value={addressLine1}
          onChangeText={(text) => setAddressLine1(text)}
        />
      <Text>Address Line 2</Text>
        <TextInput
          style={styles.input}
          value={addressLine2}
          onChangeText={(text) => setAddressLine2(text)}
        />

      <Text>Postal Code</Text>
        <TextInput
          style={styles.input}
          value={postalCode}
          onChangeText={(text) => setPostalCode(text)}
        />
 
      <Text>City </Text>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={(text) => setCity(text)}
        />

      <Text>Province/State </Text>
        <TextInput
          style={styles.input}
          value={province}
          onChangeText={(text) => setProvince(text)}
        />

      <Text>Country </Text>
        <TextInput
          style={styles.input}
          value={country}
          onChangeText={(text) => setCountry(text)}
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
        placeholder="Add tags (music, age demographic, etc) one by one"
      />
      <Button title="Add Tag" onPress={handleAddTag} />

        <TouchableOpacity style={styles.button} onPress={handleCreateProfile}>
          <Text style={styles.buttonText}>Create Profile</Text>
        </TouchableOpacity>
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
