import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1E1E1E',
      alignItems: 'center',
      justifyContent: 'center',
      //borderTopColor: '#red'
    },
  
    text:{
      color: '#FFFFFF',
    },

    emailContainer:{
      flex: 1,
      flexDirection: 'row',
      columnGap: 10
    },

    scrollview:{
      flex: 0.5,
      backgroundColor:'red',
      padding: 20
    },

  });

module.exports = styles ;