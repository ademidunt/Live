import React, { useState } from 'react';
import { Modal,Text, TouchableOpacity, View, StyleSheet, Button, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export const ModalPicker = ({selectableValues, defaultValue}) => {
  const [pickerVisible, setPickerVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue.toString());

//   const numbers = Array.from({ length: 20 }, (_, i) => `${i + 1}`);

  return (
    <View style={styles.container}>
      <Button title={selectedValue} onPress={() => setPickerVisible(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={pickerVisible}
        onRequestClose={() => {
          setPickerVisible(!pickerVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Picker
              selectedValue={selectedValue}
              style={{ height: 200, width: 150 }}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
            >
              {selectableValues.map((number) => (
                <Picker.Item key={number} label={number} value={number} />
              ))}
            </Picker>
            <Button title="Done" onPress={() => setPickerVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default ModalPicker;
