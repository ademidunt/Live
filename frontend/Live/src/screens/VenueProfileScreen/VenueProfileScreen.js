import { StatusBar } from 'expo-status-bar';
import React, {useState, useRef, useEffect} from 'react';
import { Modal, TouchableHighlight, TextInput, Image, Button, ScrollView, Text, View, Pressable } from 'react-native';
import CreateNewEvent from './NewEvent/NewEvent';
import { retrieveUserType, retrieveUID, clearToken } from '../../handlers/authService';
import CreateNewRating from './NewRating/NewRating';

const VenueProfileHandler = require('../../handlers/VenueProfileHandler')
const styles = require('./VenueProfileScreenStyles')


export default function VenueProfileScreen({ route, navigation }) {
  
  const [isUser, setIsUser] = useState(null);
  const [btnPressed, setActiveBtn] = useState('active');
  const [isEdit , setIsEdit] = useState(false);
  const [editChange , setEditChange] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);

  const [venueData, setVenueData] = useState(VenueProfileHandler.getVenueProfile('AsedlTwX2fdmuN0yWiM1k4BzKFb2'))

  const [venueId, setVenueId] = useState(null)
  const [venueName, setVenueName] = useState ({cur: "venueName", new:'' })
  const [aboutBioTxt, setBioTxt ] = useState({cur: "venueDesc" , new:''})
  const [venueWeb, setVenueWeb] = useState({cur:"venueWeb", new:''})
  const [venueNum, setVenueNum] = useState({cur:"venueNum", new:''})
  const [venueMail, setVenueMail] = useState({cur:"venueMail", new:''})
  const [venueRating, setVenueRating] = useState(5)
  const [location, setLocation] =  useState({cur: venueData.location , new:''})


  const[savedData , setSavedData] = useState([])
  const [UID, setUID] = useState(false); // State to store the retrieved UID

  useEffect(() => {

    // const fetchUID =  (uid) => {
    //   console.log(2,uid)
    //   setVenueId(uid);
    //   getUserData(uid);
    // };

    // //see who looking at page
    // const getUserType = async () => {
    //   const userType = await retrieveUserType()
    //   console.log(1,userType)
    //   setIsUser('venue' == userType)

    //   const loggedInUID = await retrieveUID()
    //   setVenueId(loggedInUID)
    //   console.log(7,venueId)
    // }; 
    // console.log(4,route.params.venueId)

    // getUserType();

    // console.log( 0, isUser, venueId )
    // //if the venue owner display own page
    // if(!isUser && venueId !== null ) {
    //   // setVenueId(loggedInUID);
    //   fetchUID(venueId);
    // }
    // //if clubber display 
    // else{
    //   setUID(route.params.venueId);
    //   console.log(route.params.venueId)
    //   fetchUID(route.params.venueId)
    // }

    
    const fetchUID = async () => {
      const loggedInUID = await retrieveUID()
      setVenueId(loggedInUID); 
      
      const getUserType = async () => {
       const userType = await retrieveUserType()
       var newpage = loggedInUID
        console.log(1,loggedInUID, UID, isUser)
        try{
          console.log("try")
          route.params.venueId? newpage = route.params.venueId : null
          console.log(newpage,loggedInUID, UID, isUser)
        }catch(error){
          console.log('cathc')
          //newpage = loggedInUID
          setUID(true)
        }

        if(((userType == "venue") && (newpage !== loggedInUID ) ) || userType == 'clubber' ){
          getUserData(route.params.venueId);
        }
        else{
          getUserData(await retrieveUID());
        }
        setIsUser((userType == 'venue' && (newpage == loggedInUID ))) 

        // else if(UID == true){
        //   getUserData(route.params.venueId);
        // }
        // else if(userType && (UID == venueId)){
        //   console.log(3)
        //   getUserData(await retrieveUserType());
        // }
        // else{
        //   getUserData(route.params.venueId);
        // }
      }; 
  
      getUserType();

    };

    fetchUID();

    // const loggedInUID = await retrieveUID()
    // setVenueId(loggedInUID)
    // console.log(7,venueId)


  }, []); // Empty dependency array ensures it runs once when the component mounts

  const getUserData = async (uid) => {
    try {
      const response = await fetch(`http:/192.168.0.33:3000/venue/${uid}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setVenueName({cur: userData.venueName, new:'' });
        setBioTxt({cur: userData.description, new:'' });
        setVenueWeb({cur: userData.website, new:'' });
        setVenueNum({cur: userData.phoneNumber, new:'' });
        setVenueMail({cur: userData.email, new:'' });
        setVenueRating(userData.avgRating)
        setSavedData(userData)
        console.log(userData.venueName)
      } else {
        console.log(`Something went wrong: ${JSON.stringify(response)}`);
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  const saveData = async () => {

    savedData.email =  venueMail.new !== '' ? venueMail.new : venueMail.cur,
    savedData.website = venueWeb.new !== '' ? venueWeb.new : venueWeb.cur,
    savedData.description = aboutBioTxt.new !== '' ? aboutBioTxt.new : aboutBioTxt.cur,
    savedData.phoneNumber = venueNum.new !== '' ? venueNum.new : venueNum.cur,

    console.log(editChange)
    if(!editChange){
      console.log("no edits have been made")
    }
    else if(!venueId){
      console.log("no uid for page found")
    }
    else{
      try {
        const response = await fetch(`http:/192.168.0.33:3000/venue/update/${venueId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Include any additional headers or authentication tokens as needed
          },
          body: 
          JSON.stringify({
            addressLine1: savedData.addressLine1,
            addressLine2: savedData.addressLine1,
            avgRating: savedData.avgRating,
            city: savedData.avgRating,
            country: savedData.country,
            description: savedData.description, 
            email: savedData.email, 
            password: savedData.password, 
            phoneNumber: savedData.phoneNumber, 
            postalCode: savedData.postalCode, 
            province: savedData.province, 
            ratings: savedData.ratings, 
            tags: savedData.tags, 
            venueName: savedData.venueName, 
            website: savedData.website}),
        });

        if (response.ok) {
          console.log('Changes saved successfully');
          // You may want to update local state or perform additional actions here
          setEditChange(!editChange)
        } else {
          console.error('Failed to save changes:', await response.text());
          // Handle the error, show a message to the user, etc.
          console.log('error', response.status)
        }
      } catch (error) {
        console.error('Network error:', error.message);
        // Handle network errors, show a message to the user, etc.
        console.log('error',savedData)
      }

      // Fetch user data after updating to reflect changes
      getUserData(venueId);

      console.log('Updated fields:');
    
    }
  }

  const discard = () => {
    setEditChange(false)
    setBioTxt({cur:aboutBioTxt.cur, new:''})
    setVenueWeb({cur:venueWeb.cur, new:''})
    setVenueNum({cur:venueNum.cur, new:''})
    setVenueMail({cur:venueMail.cur, new:''})
  }

  const EditTextInput = (newText, prop) => {
    if(prop.cur != newText){
      setEditChange(true);
      prop.new = newText
    }
    return prop
  }

  return (
    <View style={styles.ProfileScreen}>
      <ScrollView style={styles.screen}>
      {/* <Image></Image> */}
      <Text style={styles.image}>Venue Pic:</Text>

      <View style={styles.container}>

        <View style={styles.header}>
          <View style={[styles.headerCtnt, styles.venueName]}><Text style={[styles.text, styles.venueNameTxt]}>{venueName.cur}</Text></View>
          {
            isUser &&
            <View style={[styles.headerCtnt, styles.edit]}>
              <Pressable 
              onPress={()=>{setIsEdit(!isEdit), isEdit && editChange ?setModalVisible(true):''}}
              style={[]}>
                { !isEdit &&
                <Text style={[styles.text, styles.editTxt,]}>Edit</Text>
                }
                { isEdit &&
                <Text style={[styles.text, styles.editTxt, styles.doneTxt]}>Done</Text>
                }
              </Pressable>

              <Modal
                animationType="slide"
                visible={modalVisible}
                transparent={true}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text style={styles.text}>Save Changes?</Text>

                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {setModalVisible(!modalVisible); saveData()}}>
                        <Text style={styles.textStyle}>Save</Text>
                      </Pressable>

                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {setModalVisible(!modalVisible);discard();}}>
                        <Text style={styles.textStyle}>Discard</Text>
                      </Pressable>

                    </View>
                  </View>
                </Modal>

            </View>
          }
          {
            !isUser &&
            <View style={[styles.headerCtnt, styles.starRating]}><Text style={[styles.text]}>{venueRating.toFixed(2)}</Text><Image source={require('../../../assets/ratingStar.png')}></Image></View>
          }
        </View>

        <View style={styles.btnPnl}>
          <View style={[styles.btnPnlRow , styles.btnPnlRow1]}>
            <View style={styles.aboutBtn}>
              <Pressable onPress={()=>{setActiveBtn('active')}} 
                style={({pressed})=> [
                {backgroundColor: pressed || btnPressed == 'active' ? "#9166ED": "#4709CD"},
                styles.btn ]}>
                  <Text style={styles.text}>About</Text>
              </Pressable>
            </View>
            <View style={styles.reviewBtn}>
            <Pressable onPress={()=>{setActiveBtn('newRating')}} 
            style={({pressed})=> [
            {backgroundColor: pressed || btnPressed == 'newRating' ? "#9166ED": "#4709CD"},
            styles.btn ]}>
              <Text style={styles.text}>Rating/Review</Text>
            </Pressable>
            </View>
          </View>
          <View style={[styles.btnPnlRow, styles.btnPnlRow2]}>
          <View style={styles.contactInfoBtn}>
            <Pressable onPress={()=>{setActiveBtn('contact')}} 
            style={({pressed})=> [
            {backgroundColor: pressed || btnPressed == 'contact' ? "#9166ED": "#4709CD"},
            styles.btn ]}>
              <Text style={styles.text}>Contact Info</Text>
            </Pressable>
          </View>
          </View>
          <View style={[styles.btnPnlRow, styles.btnPnlRow2]}>
          <View style={styles.contactInfoBtn}>
            <Pressable onPress={()=>{setActiveBtn('newEvent')}} 
            style={({pressed})=> [
            {backgroundColor: pressed || btnPressed == 'newEvent' ? "#9166ED": "#4709CD"},
            styles.btn ]}>
              <Text style={styles.text}>Create New Event</Text>
            </Pressable>
          </View>
          </View>
        </View>

          {/* About section */}
          {btnPressed == 'active' &&
          <View style={styles.aboutSctn}>
            <View style={[styles.aboutCtnt, isEdit? styles.aboutEdit: '']}>
              <TextInput 
              style={[styles.text, styles.aboutBioTxt, ]}
              editable = {isEdit}
              multiline
              defaultValue = {aboutBioTxt.new != '' && editChange ? aboutBioTxt.new : aboutBioTxt.cur}
              onEndEditing={(val) =>{setBioTxt(EditTextInput(val.nativeEvent.text, aboutBioTxt));}}
              >
              </TextInput>
              {/* <EditTextInput text={aboutBioTxt} fnctn={aboutBioTxtFnc}></EditTextInput> */}
            </View>
            
            <View style={[styles.aboutCtnt,styles.aboutLctn]}>
              <Text>Location</Text>
            </View>
          </View>
          }

          {/* Contact section */}
          {btnPressed == 'contact' &&
          <View style={[styles.contactSctn]}>
            <View style={[styles.contactCtnt]}>
              <Text style={[styles.text]}>Website:</Text>
              <View style={[styles.contactCtntDsply, isEdit? styles.aboutEdit: '']}>
                <TextInput defaultValue= {venueWeb.new != '' && editChange? venueWeb.new : venueWeb.cur} 
                            onEndEditing={(val) =>{setVenueWeb(EditTextInput(val.nativeEvent.text, venueWeb));}}                           
                            editable = {isEdit} 
                            style={[styles.text]}>
                </TextInput>
              </View>
            </View>
            <View style={[styles.contactCtnt]}>
              <Text style={[styles.text]}>Number:</Text>
              <View style={[styles.contactCtntDsply, isEdit? styles.aboutEdit: '']}>
                <TextInput defaultValue= {venueNum.new != '' && editChange? venueNum.new : venueNum.cur} 
                           onEndEditing={(val) =>{setVenueNum(EditTextInput(val.nativeEvent.text, venueNum));}}
                           editable = {isEdit} 
                           style={[styles.text]}>                         
                </TextInput>
              </View>
            </View>
            <View style={[styles.contactCtnt]}>
              <Text style={[styles.text]}>Email:</Text>
              <View style={[styles.contactCtntDsply, isEdit? styles.aboutEdit: '']}>
                <TextInput defaultValue= {venueMail.new != '' && editChange? venueMail.new : venueMail.cur} 
                            onEndEditing={(val) =>{setVenueMail(EditTextInput(val.nativeEvent.text, venueMail));}} 
                            editable = {isEdit} 
                            style={[styles.text]}>
                </TextInput>
              </View>
            </View>
            {/* <View style={[styles.contactCtnt]}>
              <Text style={[styles.text]}>Instagram:</Text>
              <View style={styles.instagramDsply}>
                <Image style={[styles.instagram]} source={require('../../../assets/icons8-instagram-96.png')}></Image>
                <View style={[styles.contactCtntDsply]}>
                  <Text style={[styles.text]}>www.Instagram.com</Text>
                </View>
              </View>
            </View> */}
          </View>
          }

          {btnPressed == 'newRating' &&
            <CreateNewRating/>
          }

          {btnPressed == 'newEvent' &&
            <CreateNewEvent/>
          }

          {
            isUser &&
          <View style={styles.logout}>
          <Pressable
           style={({pressed})=> [
          {backgroundColor: pressed ? "#9166ED": "#4709CD"},
          styles.logoutBtn, styles.btn ]}
          >
            <Text style={styles.text}>Logout</Text>
          </Pressable>
        </View>
          }          
      </View>

      </ScrollView>
      {
        !isUser &&
        <View style={styles.userPnl}>
          <View style={styles.userPnlCnt}>
            <View style={styles.prices}>
              <Text style={styles.text}>Prices?</Text>
              <Pressable onPress={()=>{setActiveBtn('contact')}} 
                  style={[styles.contactUsBtn]}>
                    <Text style={[styles.text,styles.contactUsTxt]}>Contact Us</Text>
              </Pressable>
            </View>
            <View style={styles.reservation}>
              <Pressable onPress={()=>{}} 
                style={({pressed})=> [
                {backgroundColor: pressed ? "#9166ED": "#6A2EEB"},
                styles.btn,styles.reservationBtn ]}>
                  <Text style={[styles.text, styles.reservationTxt]}>Reservations</Text>
              </Pressable>
            </View>
          </View>
        </View>
      }
    </View>
  );
}

