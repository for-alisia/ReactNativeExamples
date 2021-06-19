import React, { useState } from 'react';

import { View, TextInput, StyleSheet, Button, Modal, Text } from 'react-native';

const GoalInput = ({ onGoalAdd, visible, onClose }) => {
  const [enteredGoal, setEnteredGoal] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);

  const beforeCloseModalHandler = () => {
    // Clear input
    setEnteredGoal('');
    // Reset error
    setIsEmpty(false);
    // Close Modal
    onClose();
  };

  const addGoalHandler = () => {
    if (enteredGoal === '') {
      // Show alert
      setIsEmpty(true);
      return;
    }
    // Add new goal
    onGoalAdd(enteredGoal);
    beforeCloseModalHandler();
  };

  const changeInputHandler = (text) => {
    setEnteredGoal(text);
    setIsEmpty(false);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add Goal Here"
          style={styles.input}
          onChangeText={changeInputHandler}
          value={enteredGoal}
        />
        {isEmpty && <Text style={styles.errorAlert}>Fill the goal here</Text>}
        <View style={styles.buttonsContainer}>
          <View style={styles.addButtonContainer}>
            <Button title="ADD" color="darkturquoise" onPress={addGoalHandler} />
          </View>
          <View style={styles.cancelButtonContainer}>
            <Button title="CANCEL" color="red" onPress={beforeCloseModalHandler} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderColor: 'darkturquoise',
    borderWidth: 1,
    padding: 8,
    width: '75%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '40%',
    marginTop: 16,
  },
  errorAlert: {
    color: 'red',
  },
  addButtonContainer: {
    width: 88,
    marginRight: 8,
  },
  cancelButtonContainer: {
    width: 88,
  },
});

export default GoalInput;
