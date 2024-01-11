import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { retrieveUID, clearToken } from '../../handlers/authService';

const UserProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePic, setProfilePicture] = useState(null)
  const [bio, setBio] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [editableFields, setEditableFields] = useState({
    firstName: '',
    lastName: '',
    bio: '',
  });
  const [UID, setUID] = useState(null); // State to store the retrieved UID

  const placeholderPicture = 'https://via.placeholder.com/150';

  useEffect(() => {
    const fetchUID = async () => {
      const uid = await retrieveUID();
      setUID(uid);
      getUserData(uid);
    };

    fetchUID();
  }, []); // Empty dependency array ensures it runs once when the component mounts

  const getUserData = async (uid) => {
    try {
      const response = await fetch(`http://192.168.86.25:3000/clubber/${uid}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setEmail(userData.email);
        setBio(userData.bio);
        setDob(userData.DOB);
        setProfilePicture(userData.newURL)
        setEditableFields({
          firstName: userData.firstName,
          lastName: userData.lastName,
          bio: userData.bio,
        });
      } else {
        console.log(`Something went wrong: ${JSON.stringify(response)}`);
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  const handleEditToggle = async () => {
    if (editMode) {
      // Ensure UID is available before attempting to update
      if (UID) {
        try {
          const response = await fetch(`http://192.168.86.25:3000/clubber/update/${UID}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Include any additional headers or authentication tokens as needed
            },
            body: JSON.stringify({
              email: email,
              dob: dob,
              bio: editableFields.bio,
              firstName: editableFields.firstName,
              lastName: editableFields.lastName,
              // Add other fields as needed
            }),
          });
  
          if (response.ok) {
            console.log('Changes saved successfully');
            // You may want to update local state or perform additional actions here
          } else {
            console.error('Failed to save changes:', await response.text());
            // Handle the error, show a message to the user, etc.
          }
        } catch (error) {
          console.error('Network error:', error.message);
          // Handle network errors, show a message to the user, etc.
        }
  
        // Fetch user data after updating to reflect changes
        getUserData(UID);
  
        console.log('Updated fields:', editableFields);
      } else {
        console.error('UID not available for editing');
      }
    }
  
    setEditMode(!editMode);
  };

  const handleFieldChange = (field, value) => {
    setEditableFields((prevFields) => ({ ...prevFields, [field]: value }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false} // Hide the vertical scrollbar
      >
        <Image style={styles.profilePicture} source={{ uri: profilePic }} />

        {/* Display labels for the fields under "Edit Profile" */}
        <Text style={styles.username}>Profile</Text>


        {/* First name input with label */}
        <Text style={styles.inputLabel}>First Name:</Text>
        <TextInput
          style={styles.editableField}
          placeholder="Enter first name..."
          value={editableFields.firstName}
          onChangeText={(text) => handleFieldChange('firstName', text)}
          editable={editMode}
        />

        {/* Last name input with label */}
        <Text style={styles.inputLabel}>Last Name:</Text>
        <TextInput
          style={styles.editableField}
          placeholder="Enter last name..."
          value={editableFields.lastName}
          onChangeText={(text) => handleFieldChange('lastName', text)}
          editable={editMode}
        />

        {/* Bio input with label */}
        <Text style={styles.inputLabel}>Bio:</Text>
        <TextInput
          style={styles.editableField}
          placeholder="Enter bio..."
          value={editableFields.bio}
          onChangeText={(text) => handleFieldChange('bio', text)}
          editable={editMode}
        />

        {/* Save Changes button */}
        <TouchableOpacity style={styles.editButton} onPress={handleEditToggle}>
          <Text style={styles.editButtonText}>
            {editMode ? 'Save Changes' : 'Edit Profile'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    textAlign: 'center',
  },
  normalField: {
    fontWeight: 'normal',
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  dateContainer: {
    marginVertical: 10,
  },
  dateOfBirth: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  editableField: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100%', // Full width for editable fields
  },
  editButton: {
    backgroundColor: '#7a21c0',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    width: '100%', // Full width for the button
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
});

export default UserProfile;
