import React, { useState } from 'react';
import {  TextInput, Text, View, Pressable, TouchableOpacity, Modal } from 'react-native';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
const styles = require('../VenueProfileScreenStyles');

const CreateNewEvent = ({ _venueId_ }) => {
  const startDate = getFormatedDate(new Date(), 'YYYY/MM/DD h:m');
  const [date, setDate] = useState(startDate.toString());
  const [eventName, setEventName] = useState('');
  const [background, setBackground] = useState('');
  const [numOfPeople, setNumOfPeople] = useState(null);
  const [open, setOpen] = useState(false); // opens and closes modal
  const [showInputFields, setShowInputFields] = useState(true);
  const [eventCreated, setEventCreated] = useState(false);

  function handleOnPress() {
    setOpen(!open);
  }

  function handleDateChange(propDate) {
    setDate(propDate);
  }

  const createEvent = async () => {
    try {
      const response = await fetch(`${apiUrl}/event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include any additional headers or authentication tokens as needed
        },
        body: JSON.stringify({
          name: eventName,
          eventdate: date,
          eventBackground: background,
          maxPeople: numOfPeople,
          venueId: _venueId_,
          registeredPeople: []
          // Add other fields as needed
        }),
      });

      if (response.ok) {
        console.log('Event created successfully');
        setEventCreated(true);
        setShowInputFields(false); // Hide input fields after creating event
        // You may want to update local state or perform additional actions here
      } else {
        console.error('Failed to create event:', await response.text());
        // Handle the error, show a message to the user, etc.
      }
    } catch (error) {
      console.error('Network error:', error.message);
      // Handle network errors, show a message to the user, etc.
    }
  };

  const showCreateNewEventButton = () => {
    setShowInputFields(true);
    setEventCreated(false); // Reset the event created state
  };

  return (
    <View style={styles.contactSctn}>
      {showInputFields ? (
        <>
          <View style={[styles.contactCtnt]}>
            <Text style={[styles.text]}>Event Name:</Text>
            <View style={styles.contactCtntDsply}>
              <TextInput
                onChangeText={(text) => setEventName(text)} style={[styles.text]}
                placeholder='Enter Event Name...'
                placeholderTextColor="#FFFFFF">
              </TextInput>
            </View>
          </View>
          <View>
            <View>
              <TouchableOpacity onPress={handleOnPress}>
                <View style={styles.customButton}><Text style={styles.buttonText}>Select Date</Text></View>
              </TouchableOpacity>
              <Modal
                animationType='slide'
                transparent={true}
                visible={open}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <DatePicker
                      options={{
                        textHeaderColor: "#4709CD",
                        selectedTextColor: "white",
                        mainColor: "#4709CD"
                      }}
                      selected={date}
                      minimumDate={startDate}
                      onSelectedChange={date => handleDateChange(date)}
                    />
                    <TouchableOpacity onPress={handleOnPress}>
                      <Text>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
            <View>
              <Text style={[styles.text]}>Selected Date: </Text><Text style={{ color: "#9166ED", display: "flex", flexDirection: "row", fontSize: 20 }}>{date}</Text>
            </View>
          </View>
          <View style={[styles.contactCtnt]}>
            <Text style={[styles.text]}>Background:</Text>
            <View style={[styles.aboutCtnt, styles.aboutLctn]}><TextInput onChangeText={(text) => setBackground(text)}>Enter Info</TextInput></View>
          </View>
          <Text style={[styles.text]}>Number of People:</Text>
          <View style={[styles.contactCtntDsply]}>
            <TextInput
              keyboardType="numeric"
              style={[styles.text]}
              placeholder='Enter Number...'
              placeholderTextColor="#FFFFFF"
              onChangeText={(text) => setNumOfPeople(text)}>
            </TextInput>
          </View>
          <View style={styles.logout}>
            <Pressable onPress={createEvent} style={({ pressed }) => [
              { backgroundColor: pressed ? "#9166ED" : "#4709CD" },
              styles.logoutBtn, styles.btn]}>
              <Text style={styles.text}>Create Event</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <View style={styles.eventCreatedContainer}>
          {eventCreated && (
            <View style={styles.checkmarkContainer}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
          )}
          <View style={styles.logout}>
            <Text style={styles.text}>Event Created! Click below to create another event</Text>
            <Pressable onPress={showCreateNewEventButton} style={({ pressed }) => [
              { backgroundColor: pressed ? "#9166ED" : "#4709CD" },
              styles.logoutBtn, styles.btn]}>
              <Text style={styles.text}>Create New Event</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  )
}

export default CreateNewEvent;
