import React, { useEffect, useState } from 'react';
import { 
    View,
    Text, 
    Pressable, 
    Button, 
    StyleSheet,
    Modal,
    TextInput} from 'react-native';

import { retrieveUID } from '../../handlers/authService';
import DatePicker, { getFormatedDate, getToday } from 'react-native-modern-datepicker';

export default ClubberReservationScreen = () =>{

    const [venueUID, setVenueUID] = useState("AsedlTwX2fdmuN0yWiM1k4BzKFb2")
    const [clubberUID, setClubberUID] = useState()
    const [numGuests, setNumGuests] = useState()

    const [date, setDate] = useState(null)
    const [modalVisible, setModalVisible] = useState(false); //opens and closes modal
    const [approval , setApproval] = useState('pending')
    const [sendStatus, setSendStatus] = useState(false)

    useEffect(()=>{
        //get user uid
        const fetchReservationClubberUID = async () => {
            const retrievedUID = await retrieveUID();
            setClubberUID(retrievedUID)
            console.log("retrieved clubber UID", retrievedUID)
        }

        fetchReservationClubberUID();
        
    }, []);

    const sendReservationRequest = async() => {
        try {

            // Send a request to the server to update the reservation status
            const response = await fetch(`http://192.168.0.90:3000/booking/${reservationId}`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clubberID:clubberUID,
                    numAttendees: numGuests,
                    status:approval,
                    venueId: venueUID,
                    bookingDate: Date.now(),
                    targetDate:Date.now()
                }),
            });

            console.log('server response:', response)
            
            //Check for valid json server response
            if(!response){
                console.log("Invalid json server response:", response)
            }

            if(response.success){
                setSendStatus(true);
                console.log("Reservation made successfully")
            }

        }
        catch (error){
            console.log("error",error)
        }
    }

    return(
        <View>
            <View>
                <Text>
                    You are making a reservation for CLUBNAME
                </Text>
                <Text>
                    How many people would you like to reserve for?
                </Text>
                <TextInput
                    defaultValue='1'
                >

                </TextInput>
                <Text>
                    When would you like to make the reservation for?
                </Text>
                <Modal
                animationType="slide"
                visible={modalVisible}
                transparent={true}
                >
                <View> 
                        <View>
                            <DatePicker
                            options={{
                                textHeaderColor: "#4709CD",
                                selectedTextColor: "white",
                                mainColor: "#4709CD"
                            }}
                            selected={date}
                            minimumDate={getFormatedDate(new Date(), 'YYYY/MM/DD h:m')}
                            onSelectedChange={date => setDate(date)}
                            />
                            <Pressable onPress={()=>{date !== null ? setDate(null) : setDate(date); setModalVisible(!modalVisible); }}>
                                <Text>Close</Text>
                            </Pressable>
                            <Pressable onPress={()=>{ setModalVisible(!modalVisible)}}>
                                <Text>Select Date</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
            <Pressable onPress={()=>{setModalVisible(!modalVisible)}}>
                {!date&&<Text>ChooseDate</Text>}
                {
                date && <Text>{date}</Text>
                }
            </Pressable>
            <Pressable onPress={sendReservationRequest}>
                <Text>Send Reservation</Text>
            </Pressable>
        </View>
    );
}