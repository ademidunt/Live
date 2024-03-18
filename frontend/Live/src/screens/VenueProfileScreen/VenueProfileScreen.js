import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import VenueReview from './Reviews/VenueReview';
import VenueEvent from './Events/VenueEvent';
import { retrieveUID, clearToken } from '../../handlers/authService';
import { useNavigation } from '@react-navigation/native';



const VenueProfileScreen = ({ route }) => {
//added for navigation
  const navigation = useNavigation();
  
  const [selectedComponent, setSelectedComponent] = useState('about');
  const [venueData, setVenueData] = useState([]);

  useEffect(() => {
    const fetchVenueInfo = async () => {
      getVenueData();
    };

    fetchVenueInfo();
  }, []);

  const getVenueData = async () => {
    try {
      const response = await fetch(`${apiUrl}/venue/${route.params.venueId}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (response.ok) {
        const venueData = await response.json();
        setVenueData(venueData);
      } else {
        console.log(`Something went wrong: ${JSON.stringify(response)}`);
      }
    } catch (error) {
      console.error('Error fetching venue data:', error.message);
    }
  };

  const handleLogout = async () => {
    try {
        await clearToken(); // clearToken clears the token
        navigation.navigate('ClubLogin'); // Navigate to the login screen
    } catch (error) {
        console.error('Failed to logout:', error);
        // Handle logout failure, show a message to the user, etc.
    }
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'about':
        return (
          <View style={styles.aboutSection}>
            <Text style={styles.aboutText}>{venueData.description}</Text>
            <Text style={styles.aboutText}>Address: {venueData.addressLine1}</Text>
          </View>
        );
      case 'contact':
        return (
          <View style={styles.contactSection}>
            <Text style={styles.contactText}>Website: {venueData.website}</Text>
            <Text style={styles.contactText}>Number: {venueData.phoneNumber}</Text>
            <Text style={styles.contactText}>Email: {venueData.email}</Text>
          </View>
        );
      case 'events':
        return <VenueEvent _venueId_={route.params.venueId} />;
      case 'reviews':
        return <VenueReview id={route.params.venueId} />;
      case 'reservations':
        <View>

        </View>
      default:
        return null;
    }
  };

  const handleComponentClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: 'https://via.placeholder.com/200' }} style={styles.image} />
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.venueName}>{venueData.venueName}</Text>
          <View style={styles.starRating}>
            <Text style={styles.ratingText}>{Math.round(venueData.avgRating * 10) / 10}</Text>
            <Image source={require('../../../assets/ratingStar.png')} />
          </View>
          <TouchableOpacity style={styles.editButton} onPress={() => setSelectedComponent('edit')}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.componentButtons}>
        <TouchableOpacity
          style={[styles.componentButton, selectedComponent === 'about' && styles.selectedComponent]}
          onPress={() => handleComponentClick('about')}
        >
          <Text style={styles.componentButtonText}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.componentButton, selectedComponent === 'contact' && styles.selectedComponent]}
          onPress={() => handleComponentClick('contact')}
        >
          <Text style={styles.componentButtonText}>Contact Info</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.componentButton, selectedComponent === 'events' && styles.selectedComponent]}
          onPress={() => handleComponentClick('events')}
        >
          <Text style={styles.componentButtonText}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.componentButton, selectedComponent === 'reviews' && styles.selectedComponent]}
          onPress={() => handleComponentClick('reviews')}
        >
          <Text style={styles.componentButtonText}>Ratings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.componentButton, selectedComponent === 'reservations' && styles.selectedComponent]}
          onPress={() => handleComponentClick('reservations')}
        >
          <Text style={styles.componentButtonText}>Reservations</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={handleLogout}>
                    <Text style={styles.editButtonText}>Logout</Text>
                </TouchableOpacity>
      </View>
      {renderComponent()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  header: {
    padding: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  venueName: {
    fontSize: 30,
    color: '#FFFFFF',
  },
  starRating: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
    backgroundColor: '#4709CD',
    borderRadius: 20,
    padding: 5,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  editButton: {
    backgroundColor: '#9166ED',
    borderRadius: 8,
    padding: 10,
  },
  editButtonText: {
    color: '#FFFFFF',
  },
  componentButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  componentButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  componentButtonText: {
    color: '#9166ED',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  selectedComponent: {
    borderBottomColor: '#9166ED',
    borderBottomWidth: 2,
  },
  aboutSection: {
    padding: 20,
  },
  aboutText: {
    fontSize: 22,
    marginBottom: 10,
    color: '#FFFFFF',
  },
  contactSection: {
    padding: 20,
  },
  contactText: {
    fontSize: 22,
    marginBottom: 10,
    color: '#FFFFFF',
  },
});

export default VenueProfileScreen;
