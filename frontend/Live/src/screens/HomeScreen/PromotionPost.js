import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PromotionPost = ({ businessName, description, imageURL }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageURL }} style={styles.image} />
      <Text style={styles.businessName}>{businessName}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    margin: 16,
    padding: 16,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  businessName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PromotionPost;
