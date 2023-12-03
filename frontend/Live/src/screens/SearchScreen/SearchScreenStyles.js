import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1E1E1E',
      alignItems: 'center',
      justifyContent: 'center',
      borderTopColor: '#4709CD'
    },
  
    input: {
      borderWidth: 1,
      borderColor: '#fff',
      borderRadius: 5,
      padding: 10,
      width: '80%',
      marginBottom: 20,
      marginTop: 40,
      color: '#fff',
    },
    searchButton: {
      backgroundColor: '#7a21c0',
      padding: 10,
      borderRadius: 5,
      width: '80%',
    },
    searchButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    resultItem: {
      marginVertical: 10,
      color: '#fff',
    },
  });

module.exports = styles ;