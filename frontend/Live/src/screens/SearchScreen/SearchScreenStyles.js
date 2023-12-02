import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center', // Center other content vertically if needed
    alignItems: 'center', // Center other content horizontally if needed
  },
  newPostButton: {
    position: 'absolute',
    top: 50, // Adjust top position as needed
    right: 35, // Adjust right position as needed
    backgroundColor: '#7a21c0',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;