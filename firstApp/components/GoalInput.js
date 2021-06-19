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
      setIsEmpty(true);
      return;
    }
    // Add new goal
    onGoalAdd(enteredGoal);
    beforeCloseModalHandler();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add Goal Here"
          style={styles.input}
          onChangeText={(text) => {
            setEnteredGoal(text);
            setIsEmpty(false);
          }}
          value={enteredGoal}
        />
        {isEmpty && <Text style={styles.errorAlert}>Fill the goal here</Text>}
        <View style={styles.buttonContainer}>
          <Button title="ADD GOAL" color="darkturquoise" onPress={addGoalHandler} />
          <Button title="CANCEL" color="red" onPress={beforeCloseModalHandler} />
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
    padding: 3,
    width: '75%',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorAlert: {
    color: 'red',
  },
});

export default GoalInput;
