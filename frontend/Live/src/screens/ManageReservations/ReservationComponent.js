import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import axios from 'axios';

const ReservationListComponent = () => {
  const [reservationRequests, setReservationRequests] = useState([]);

  useEffect(() => {
    // Fetch reservation requests from the server
    axios.get('https://api.example.com/venue/reservation-requests')
      .then(response => {
        setReservationRequests(response.data);
      })
      .catch(error => {
        console.error('Error fetching reservation requests:', error);
      });
  }, []);

  const handleAction = (reservationId, action) => {
    // Send a request to the server to perform the specified action (accept/reject)
    axios.post(`https://api.example.com/venue/process-reservation/${reservationId}`, { action })
      .then(response => {
        // Update the local state or handle accordingly
        console.log(`Reservation ${reservationId} ${action}ed successfully`);
      })
      .catch(error => {
        console.error(`Error ${action}ing reservation:`, error);
      });
  };

  const renderItem = ({ item }) => (
    <View style={{ marginVertical: 10 }}>
      <Text>{`Customer: ${item.customerName}`}</Text>
      <Text>{`Date: ${item.date}`}</Text>
      <Text>{`Time: ${item.time}`}</Text>
      <Button title="Accept" onPress={() => handleAction(item.id, 'accept')} />
      <Button title="Reject" onPress={() => handleAction(item.id, 'reject')} />
    </View>
  );

  return (
    <View>
      <Text>Reservation Requests:</Text>
      <FlatList
        data={reservationRequests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ReservationListComponent;
