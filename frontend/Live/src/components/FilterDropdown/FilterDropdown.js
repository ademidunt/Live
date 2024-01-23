import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Button, StyleSheet } from 'react-native';
import HalfModal from '../HalfModal/HalfModal';

const FilterDropdown = ({ items }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Select Items" onPress={() => setModalVisible(true)} />
      <Text>Selected Items: {selectedItems.join(', ')}</Text>
      <HalfModal visible={modalVisible} setModalVisible={(visible) => setModalVisible(visible)}/>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalView}>
          {items.map(item => (
            <TouchableOpacity
              key={item}
              style={[
                styles.item,
                { backgroundColor: selectedItems.includes(item) ? '#6e3b6e' : '#f9c2ff' },
              ]}
              onPress={() => handleSelect(item)}
            >
              <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>
          ))}
          <Button title="Done" onPress={() => setModalVisible(false)} />
        </View>
      </Modal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
  },
  item: {
    padding: 10,
    marginVertical: 8,
  },
  text: {
    color: '#fff',
  },
  modalView: {
    backgroundColor: "#ffffff"
  },
});

export default FilterDropdown;