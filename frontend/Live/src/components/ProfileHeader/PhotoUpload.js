import React, { useState } from 'react';
import { View, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

//create a component with select image field
const PhotoUploadComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImagePicker = async () => {
    //request permission to access media libary
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      console.log('Permission to access media library denied');
      return;
    }

    //one granted, use image picker API to launch media libary and let use pick image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //this checks if user canceld out of media libary 
    if (!result.cancelled) {
      setSelectedImage({ uri: result.uri });
    }
  };

  return (
    <View>
      {selectedImage && (
        <Image source={selectedImage} style={{ width: 200, height: 200 }} />
      )}
      <Button title="Select Image" onPress={handleImagePicker} />
    </View>
  );
};

export default PhotoUploadComponent;
