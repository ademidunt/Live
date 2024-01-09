import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        height:  50, 
        marginHorizontal: 20, 
        flexDirection: 'row', 
        borderWidth: 1.5, 
        borderColor: 'gray', 
        borderRadius: 15
    },
    touchableOpacity: {
      alignSelf: 'center', 
      marginHorizontal: 5
    },
    textInput: {
      height: 50
    },
  });

module.exports = styles;