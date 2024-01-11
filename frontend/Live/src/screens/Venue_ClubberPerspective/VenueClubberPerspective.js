import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Modal, Button, StyleSheet } from 'react-native';
import VenueReview from './Reviews/VenueReview';

const VenueClubberPerspective = ({ route, navigation }) => {
  navigation.setOptions({title: route.params.headerTitle})
  const [showEvents, setShowEvents] = useState(false);
  const [venueInfo, setVenueInfo] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchVenueInfo = async () => {
      getVenueData();
    };

    fetchVenueInfo();
  }, []); 

  const getVenueData = async () => {
    try {
      const response = await fetch(`http://192.168.1.65:3000/venue/${route.params.id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (response.ok) {
        const venueData = await response.json();
        setVenueInfo(venueData);
      } else {
        console.log(`Something went wrong: ${JSON.stringify(response)}`);
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  const toggleEvents = () => {
    setShowEvents(!showEvents);
  };

  const handleEventRegistration = (eventId) => {
    // Implement logic for event registration
    console.log(`Registered for event with ID: ${eventId}`);
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: 'https://via.placeholder.com/200' }} style={styles.image} />
      <Text style={styles.description}>{venueInfo.description}</Text>
      <Text style={styles.address}>{venueInfo.addressLine1}</Text>
      <Text style={styles.avgRating}>Average Rating: {venueInfo.avgRating}</Text>

      <TouchableOpacity onPress={toggleEvents} style={styles.showEventsButton} disabled={true}>
        <Text style={styles.showEventsButtonText}>Show Events</Text>
      </TouchableOpacity>
      {showEvents && (
        <View style={styles.eventsContainer}>
          {/* Display upcoming events */}
          {venueInfo.upcomingEvents.map((event) => (
            <View key={event.id} style={styles.eventItem}>
              <Text style={styles.eventName}>{event.name}</Text>
              <Text style={styles.eventDate}>{event.date}</Text>
              <Button disabled={true}
                title="Register for Event"
                onPress={() => handleEventRegistration(event.id)}
              />
            </View>
          ))}
        </View>
      )}

      <VenueReview id={route.params.id} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff', // Background color
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 8,
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
    color: '#9166ED', // Primary color
  },
  address: {
    fontSize: 16,
    marginBottom: 10,
  },
  avgRating: {
    fontSize: 16,
    marginBottom: 10,
    color: '#4709CD', // Secondary color
  },
  showEventsButton: {
    backgroundColor: '#4709CD', // Secondary color
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  showEventsButtonText: {
    color: '#fff', // White text color
    textAlign: 'center',
    fontSize: 16,
  },
  eventsContainer: {
    marginTop: 10,
  },
  eventItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#F5E1FF', // Faint purple background color
    borderRadius: 8,
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default VenueClubberPerspective;
