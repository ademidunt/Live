import { StatusBar } from 'expo-status-bar';
import React, {useState, useRef, useEffect} from 'react';
import { Modal, TouchableHighlight, TextInput, Image, Button, ScrollView, Text, View, Pressable } from 'react-native';
import CreateNewEvent from './NewEvent/NewEvent';

const VenueProfileHandler = require('../../handlers/VenueProfileHandler')
const styles = require('./VenueProfileScreenStyles')

var isUser = false;

export default function ProfileScreen() {

  const [btnPressed, setActiveBtn] = useState('active');
  const [isEdit , setIsEdit] = useState(false);
  const [editChange , setEditChange] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);

  const [venueData, setVenueData] = useState(VenueProfileHandler.getVenueProfile('AsedlTwX2fdmuN0yWiM1k4BzKFb2'))

  const [venueName, setVenueName] = useState ({cur: "venueName", new:'' })
  const [aboutBioTxt, setBioTxt ] = useState({cur: "venueDesc" , new:''})
  const [venueWeb, setVenueWeb] = useState({cur:"venueWeb", new:''})
  const [venueNum, setVenueNum] = useState({cur:"venueNum", new:''})
  const [venueMail, setVenueMail] = useState({cur:"venueMail", new:''})
  const [location, setLocation] =  useState({cur: venueData.location , new:''})

  useEffect(()=>{
    console.log( )
    const json = VenueProfileHandler.getVenueProfile('AsedlTwX2fdmuN0yWiM1k4BzKFb2')
    console.log(json)

    //console.log(venueData)
  }, []);

  const handleVenueData = () => {
    const venueData ={
      aboutBioTxt,
      venueWeb,
      venueWeb,
      venueMail
    }

    // setVenueName({cur: venueData.venueName, new:'' })
    // setBioTxt({cur: venueData.description , new:''});
    // setLocation({cur: venueData.location , new:''});
    
  }

  const[savedData , setSavedData] = useState([])
  const saveData = () => {
    if(!editChange){
    }
  }

  const discard = () => {
    setEditChange(false)
    setBioTxt({cur:"aboutBioTxt", new:''})
    setVenueWeb({cur:"venueWeb", new:''})
    setVenueNum({cur:"venueNum", new:''})
    setVenueMail({cur:"venueMail", new:''})

    console.log(venueData._j)
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
            <View style={[styles.headerCtnt, styles.starRating]}><Text style={[styles.text]}>3.5</Text><Image source={require('../../../assets/ratingStar.png')}></Image></View>
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
              <Pressable  onPress={()=>{setActiveBtn('review')}} 
              style={({pressed})=> [
              {backgroundColor: pressed || btnPressed == 'review' ? "#9166ED": "#4709CD"},
              styles.btn ]}>
                  <Text style={styles.text}>Reviews</Text>
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

