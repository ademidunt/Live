import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const UserProfile = () => {
  // Placeholder image URL
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [dob, setDob ]= useState('');
  const [email, setEmail ]= useState('');
  // const [profilePicture, setProfilePicture] = 'https://via.placeholder.com/150';
  //for testing will be deleted 
  const testID = 'lCr4v9sdOdrG7mdFXsTX'
  const placeholderpicture = 'https://via.placeholder.com/150'


  const getUserData = async () => {
    console.log(`new session`)
    // right now I am using my IP address , probably incorrect
    fetch(`http://192.168.2.50:4000/ClubberProfiles/getUser/${testID}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then(async (res) => {
        if (res.ok) {
          let userData = await res.json()
          setFirstName(userData.firstName)
          setLastName(userData.lastName)
          setEmail(userData.email)
          setBio(userData.bio)
          // setDob(userData.DOB), DOB is saved weird so not working 
          console.log(userData)
          
        }
        else{
          console.log(`something went wrong ${JSON.stringify(res)}`)
        }
      })
  }

  getUserData ()
  return (
    <View style={styles.container}>
      <Image
        style={styles.profilePicture}
        source={{ uri: placeholderpicture }}
      />
      <Text style={styles.username}>{firstName}</Text>
      <Text style={styles.username}>{lastName}</Text>
      <Text style={styles.username}>{email}</Text>
      <View style={styles.dateContainer}>
        <Text style={styles.dateOfBirth}> {dob} </Text>
      </View>
      <Text style={styles.bio}>Bio: {bio}</Text>
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  profilePicture: {
    borderRadius: 75,
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dateContainer: {
    marginVertical: 10,
  },
  dateOfBirth: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  bio: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#7a21c0',
    borderRadius: 4,
    padding: 10,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default UserProfile;
