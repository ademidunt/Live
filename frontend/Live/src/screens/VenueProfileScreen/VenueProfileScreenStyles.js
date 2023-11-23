import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    ProfileScreen:{
      backgroundColor:'#1E1E1E',
      flex:1,
      alignItems:'stretch'
    },

    screen:{
      flex:2,
      //alignSelf:'stretch'
    },

    container: {
      flex:1,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      rowGap:30,
      //backgroundColor:'purple'
    },
  
    image:{
      backgroundColor: '#4709CD',
      borderColor: '#4709CD',
      width:'100%',
      //alignSelf:'stretch',
      height: 150
    },

    header:{
      flex:1,
      flexDirection:"row",
      alignSelf:'stretch',
    },

    headerCtnt:{
      alignItems:'flex-end',
      flexDirection:'row'
    },

    venueName:{
      flexDirection:'row',
      justifyContent:'flex-start',
      flex:2,
      //backgroundColor:'black',
    },

    venueNameTxt:{
      fontSize: 30,
      //backgroundColor:'black',
      },

    edit:{
      flex:1,
      flexDirection:'row',
      justifyContent:'flex-end',
      //backgroundColor:'red'
    },

    editTxt:{
      color: "#4709CD",
      fontSize: '17rem'
      //backgroundColor:'black'
    },

    starRating:{
      alignItems:'center',
      //justifyContent:'center'
      columnGap:5,
      // borderWidth:2,
      // borderColor:'#FFFFFF',
      backgroundColor:'#4709CD',
      borderRadius:20,
      padding:5
    },

    btnPnl:{
      flex:1,
      alignSelf:'stretch',
      rowGap:25,
      //backgroundColor:'black'
    },

    btnPnlRow:{
      flex:1,
      flexDirection:'row',
      alignSelf:'stretch',
      //backgroundColor:'red'
    },

    btnPnlRow1:{
      columnGap: 20
    },

    btnPnlRow2:{
      
    },

    aboutBtn:{
      //flexDirection:'row'
      flex: 1
    },

    reviewBtn:{
      flex: 1
    },

    contactInfoBtn:{
      flex: 1,
      //borderBlockColor:'purple'
    },

    btn:{
      justifyContent:'center',
      alignItems:'center',
      //backgroundColor:'#4709CD',
      borderColor: '#4709CD',
      borderWidth:2,

       borderRadius:10,
       paddingVertical: 4,
       //paddingHorizontal: 10,
      // paddingVertical: 4,
    },

    text:{
      color: '#FFFFFF',
      fontSize:20
      //ustifyContent:'center',
      //alignItems:'center'
    },

    aboutSctn:{
      flex:1,
      rowGap: 20
      //flexDirection:'row'
    },

    aboutCtnt:{

    },

    aboutBioTxt:{
      fontSize:15
    },

    aboutLctn:{
      backgroundColor:'white',
      height: 100,
      borderWidth:2,
      borderColor:'#6A2EEB',
      borderRadius:8,
      padding:5
    },

    contactSctn:{
      alignSelf:'stretch',
      flex:1,
      rowGap: 20
      //flexDirection:'row'
    },

    contactCtnt:{
      flex:1,
      rowGap:5
    },

    contactCtntDsply:{
      borderWidth:2,
      borderColor:'#6A2EEB',
      borderRadius:8,
      padding:5
    },
    instagramDsply:{
      flex:1,
      flexDirection:'row',
      alignItems:'center'
    },
    instagram:{
      width:30,
      height:30
      //borderWidth:2,
      //borderColor:"#6A2EEB",
    },

    logout:{
      flex:1,
      justifyContent: 'flex-end'
    },

    logoutBtn:{
      //backgroundColor:'#1E1E1E',
      //backgroundColor:'#4709CD',
      paddingHorizontal: 30
      //padding: 20
    },

    userPnl:{
      backgroundColor:'#1E1E1E',
      borderWidth:2,
      borderColor:'#4709CD',
      borderTopLeftRadius:10,
      borderTopRightRadius:10

    },

    userPnlCnt:{
      flexDirection:'row',
      columnGap:10,
      alignSelf:'stretch',
      padding:30,
    },
    prices:{
      flex:1,
      rowGap:10
    },

    reservation:{
      flex:1,
      justifyContent: 'center',
      alignItems:'center'
    },

    reservationBtn:{
      paddingHorizontal:20,
      paddingVertical: 15
    },

    contactUsBtn:{

    },
    contactUsTxt:{
      color: '#9166ED'
    },

    reservationTxt:{
      fontSize:20
    },

    doneTxt:{
      color:'#9166ED'
    },

    
  });

module.exports = styles ;