import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Button, StyleSheet, ScrollView, ActivityIndicator  } from 'react-native';
import { retrieveUID, retrieveUserType } from '../../handlers/authService';
import { ButtonDark } from '../../components/Buttons/Button';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { ModalPicker } from '../../components/Picker/Picker';

const ClubberManageReservation = () => {
    const [reservationRequests, setReservationRequests] = useState([]);
    const [userType, setUserType] = useState('');
    const [UID, setUID] = useState('');
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [clubList, setClubList] = useState([])
    const [selectedClub, setSelectedClub] = useState(null);

    //const [loading, setLoading] = useState(false);

    const fetchData = async () => {

      try {
        const retrievedUserType = await retrieveUserType();
        const retrievedUID = await retrieveUID();
        setUID(retrievedUID)
        // retrieveUID = "terkdgiBIHhztW1Q9NHKWIuNd7H2"
        // retrievedUserType = "clubber"

        setUserType(retrievedUserType);
        setUID(retrievedUID);
        console.log(UID)

        console.log('User type retrieved successfully:', retrievedUserType);
        console.log('UID retrieved successfully:', retrievedUID);
  
        // Fetch reservation requests from the server using fetch API
        const response = await fetch(`${apiUrl}/booking/clubber/${retrievedUID}`);
        const data = await response.json();

        const venueListResponse = await fetch(`${apiUrl}/venue/`);
        const venueListData =  await venueListResponse.json();
    
        // Transform the data for the Modal picker
        const modalPickerClubList = venueListData.map(item => ({
          label: item.venueName,
          value: item.venueId,
        }));

        setReservationRequests(data);
        setClubList(modalPickerClubList);

        console.log("Reservation Data retrieved")
          // Append new data to existing data
        setPage(page => page + 1);
        setHasNextPage(data.length > 0); // Check if there's more data to fetch

      } catch (error) {
        console.error('Error retrieving user type and UID:', error);
      }
      
    };

    useEffect(() => {
    
      fetchData();
    }, []);

    const handleNextPage = () => {
      fetchData();
    };

    const handlePreviousPage = () => {
      if (page > 1) {
        setReservationRequests([]); // Clear existing data
        setPage(page => page - 1);
        fetchData();
      }
    };

    const handleValueChange = (valueIndex) => {
      console.log("retrieved clubID:", clubList[valueIndex]);
      setSelectedClub( clubList[valueIndex].value);
    };
 // Helper function to format timestamp to a readable date string
    const formatDate = (timestampObject) => {
      if (!timestampObject || !timestampObject.seconds) {
        return 'N/A'; // Return a default value or handle accordingly
      }

      const seconds = timestampObject.seconds;
      const nanoseconds = timestampObject.nanoseconds || 0;

      // Convert the timestamp to milliseconds
      const milliseconds = seconds * 1000 + nanoseconds / 1e6;

      const date = new Date(milliseconds);

      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'N/A'; // Return a default value or handle accordingly
      }

      return date.toLocaleDateString(); // Adjust the formatting as needed
    };

    const sendReservationRequest = async() => {

      const retrievedUID = await retrieveUID();

      const reservationRequest =  {
        venueId,
        clubberId: retrievedUID ,
        numAttendees,
        date,
        status: "pending"
      }

      try {
  
        const sendReservationRequest = await fetch(`${apiUrl}/booking/${retrievedUID}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reservationRequest),
        });

      }catch(error){
        console.log("Unable to send reservation request")
      }
    }

    // const handleAction = async (item, reservationId, action) => {
    //   try {
    //     // Update the status field based on the action
    //     const updatedItem = {
    //       ...item,
    //       status: action === 'accept' ? 'accepted' : 'rejected',
    //     };
    
    //     // Send a request to the server to update the reservation status
    //     const updateResponse = await fetch(`${apiUrl}/booking/${reservationId}`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(updatedItem),
    //     });
    
    //     console.log('Raw server response:'+ JSON.stringify(updateResponse));
    //     // Check if the update was successful
    //     if (updateResponse.ok) {
    //     console.log(`Reservation ${reservationId} ${action}ed successfully`);
    //     // Fetch the updated reservation requests after the action is completed
    //     fetchData();
    //   } else {
    //     console.error(`Error ${action}ing reservation. Status: ${updateResponse.status}`);
    //   }
  
    //   } catch (error) {
    //     console.error(`Error ${action}ing reservation:`, error);
    //   }
    // };
    


    const renderItem = ({ item }) => (
      <View style={styles.reservationContainer}>
        <Text>{`Booking Date: ${formatDate(item.bookingDate)}`}</Text>
        <Text>{`Target Date: ${formatDate(item.targetDate)}`}</Text>
        <Text>{`Status: ${item.status}`}</Text>
        <Text>{`Number of Attendees: ${item.numAttendees}`}</Text>
      </View>
    );

    // const renderTest = () => {
    //   return(<Text>Test Works</Text>);
    // };

    const renderTest = () => {
      return (
        <View>
          {/* Pass components as props */}
          <CustomComponent>
            <Text>This is a text component rendered inside CustomComponent</Text>
          </CustomComponent>
        </View>
      );
    };
        
    
    // const renderFooter = () => {
    //   if (!loading) return null;
    //   return <ActivityIndicator />;
    // };
  
    const clubberName =  "Club Name"
    //console.log(clubList)

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Clubber Management Reservation</Text>
        <View style={styles.visualContainer}>
            <Text>You are booking a resrvation at:</Text>
            <ModalPicker selectableValues={clubList} defaultValue={clubList[1]} onValueChange={handleValueChange} style={{ height: 200, width: 200 }} renderItem={renderTest}/>
            <Text>How many guest are you expecting? </Text>
            {/* <ModalPicker selectableValues={[0,1,2,3,4,5]} defaultValue={0}/> */}
            <ButtonDark title={"Submit"} style={{marginBottom: 5, width: 200}}/>
        </View>
        <View style={styles.visualContainer}>
        <Text>Your resrvations</Text>
        {/* <SearchBar onSearch={(search) => console.log(search)}/> */}
            {/* <TextInput
                style={styles.input}
                placeholder="Username"
                value={""}
            /> */}
            <ScrollView>
                <FlatList
                data={reservationRequests}
                keyExtractor={(item, index) => (item && item.bookingId ? item.bookingId : index.toString())}
                onEndReached={fetchData}
                onEndReachedThreshold={0.5}
                renderItem={renderItem}
               // ListFooterComponent={renderFooter}
                />
            </ScrollView>
            
          {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
            <Button title="Previous Page" onPress={handlePreviousPage} disabled={page === 1} />
            <Button title="Next Page" onPress={handleNextPage} disabled={!hasNextPage} />
          </View> */}
        </View>
      </View>
    );
  };

  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    reservationContainer: {
      marginVertical: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10,
    },
    visualContainer: {
        flex:1,
        borderRadius:5,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10
    },
    submitContainer: {
        height:1,
        flex: 1
    }
  });
  
  export default ClubberManageReservation