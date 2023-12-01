import React from 'react';
import { View, Text, Image, StyleSheet,Dimensions } from 'react-native';

const PromotionPost = ({ businessName, description, imageURL }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageURL }} style={styles.image} />
      <Text style={styles.businessName}>{businessName}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginHorizontal: width * 0.000001, // Adjusted margin to 5% of the device width on each side
    padding: 40,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  businessName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'white',
  },
});

export default PromotionPost;
