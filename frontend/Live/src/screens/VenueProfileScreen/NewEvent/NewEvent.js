import React, { useState } from 'react';
import { TouchableHighlight, TextInput, Image, Button, ScrollView, Text, View, Pressable, TouchableOpacity, Modal } from 'react-native';
import DatePicker, { getFormatedDate, getToday } from 'react-native-modern-datepicker';
const styles = require('../VenueProfileScreenStyles')

const CreateNewEvent = () => {

    const startDate = getFormatedDate(new Date(), 'YYYY/MM/DD h:m')
    const [date, setDate] = useState(startDate.toString())
    const [eventName, setEventName] = useState('')
    const [background, setBackground] = useState('')
    const [open, setOpen] = useState(false) //opens and closes modal

    function handleOnPress () {
        setOpen(!open)
    }

    function handleDateChange (propDate) {
        setDate(propDate)
    }

    const createEvent = async () => {
    //   try {
    //     const response = await fetch(`http://192.168.1.65:3000/event/venueId`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         // Include any additional headers or authentication tokens as needed
    //       },
    //       body: JSON.stringify({
    //         name: eventName,
    //         eventdate: date,
    //         eventBackground: background
    //         // Add other fields as needed
    //       }),
    //     });

    //     if (response.ok) {
    //       console.log('Changes saved successfully');
    //       // You may want to update local state or perform additional actions here
    //     } else {
    //       console.error('Failed to save changes:', await response.text());
    //       // Handle the error, show a message to the user, etc.
    //     }
    //   } catch (error) {
    //     console.error('Network error:', error.message);
    //     // Handle network errors, show a message to the user, etc.
    //   }
    }
    
    return (
        <View style={styles.contactSctn}>
            <View style={[styles.contactCtnt]}>
              <Text style={[styles.text]}>Event Name:</Text>
              <View style={styles.contactCtntDsply}><TextInput onChangeText={(text) => setEventName(text)}style={[styles.text]}>New Event</TextInput></View>
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
              <Text style={[styles.text]}>Selected Date: </Text><Text style={{color: "#9166ED", display: "flex", flexDirection: "row", fontSize: 20}}>{date}</Text>
              </View>
            </View>
            <View style={[styles.contactCtnt]}>
              <Text style={[styles.text]}>Background:</Text>
              <View style={[styles.aboutCtnt,styles.aboutLctn]}><TextInput onChangeText={(text) => setBackground(text)}>Enter Info</TextInput></View>
            </View>
            <View style={styles.logout}>
            <Pressable         onPress={createEvent()}   style={({pressed})=> [
          {backgroundColor: pressed ? "#9166ED": "#4709CD"},
          styles.logoutBtn, styles.btn ]}>
            <Text style={styles.text}>Create Event</Text>
            </Pressable>
            </View>
          </View>
    )
}

export default CreateNewEvent;