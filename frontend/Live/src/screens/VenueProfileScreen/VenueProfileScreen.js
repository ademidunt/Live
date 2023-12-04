import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { TouchableHighlight, TextInput, Image, Button, ScrollView, Text, View, Pressable } from 'react-native';

const ProfileHandler = require('../../handlers/ProfileHandler')
const styles = require('./VenueProfileScreenStyles')

var isUser = true;

export default function ProfileScreen() {

  const [btnPressed, setActiveBtn] = useState('active');

  return (
    <View style={styles.ProfileScreen}>
      <ScrollView style={styles.screen}>
      {/* <Image></Image> */}
      <Text style={styles.image}>Venue Pic:</Text>

      <View style={styles.container}>

        <View style={styles.header}>
          <View style={[styles.headerCtnt, styles.venueName]}><Text style={[styles.text, styles.venueNameTxt]}>Venue Name</Text></View>
          {
            isUser &&
            <View style={[styles.headerCtnt, styles.edit]}><Text style={[styles.text, styles.editTxt,]}>Edit</Text></View>
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
        </View>

          {/* About section */}
          {btnPressed == 'active' &&
          <View style={styles.aboutSctn}>
            <View style={[styles.aboutCtnt,styles.abouBio]}>
              <Text style={[styles.text, styles.aboutBioTxt]}>Lolus in metus. Egestas maecenas pharetra convallis posuere morbi leo urna. Arcu vitae elementum curabitur vitae nunc. Scelerisque varius morbi enim nunc faucibus a pellentesque. Faucibus pulvinar elementum integer enim neque volutpat. Nibh tellus molestie nunc non blandit. Tellus orci ac auctor augue mauris augue neque gravida. Vitae nunc sed velit dignissim sodales ut eu sem. Gravida neque convallis</Text>
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
              <View style={styles.contactCtntDsply}><Text style={[styles.text]}>www.Venue.com</Text></View>
            </View>
            <View style={[styles.contactCtnt]}>
              <Text style={[styles.text]}>Number:</Text>
              <View style={styles.contactCtntDsply}><Text style={[styles.text]}>1800-000-000</Text></View>
            </View>
            <View style={[styles.contactCtnt]}>
              <Text style={[styles.text]}>Email:</Text>
              <View style={styles.contactCtntDsply}><Text style={[styles.text]}>mail@mail.com</Text></View>
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

          {
            isUser &&
          <View style={styles.logout}>
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

