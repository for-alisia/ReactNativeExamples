import React, { useState } from 'react';

import { View, TextInput, StyleSheet, Button, Modal } from 'react-native';

const GoalInput = ({ onGoalAdd, visible, onClose }) => {
  const [enteredGoal, setEnteredGoal] = useState('');

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add Goal Here"
          style={styles.input}
          onChangeText={setEnteredGoal}
          value={enteredGoal}
        />
        <Button
          title="ADD GOAL"
          color="darkturquoise"
          onPress={() => {
            onGoalAdd(enteredGoal);
            setEnteredGoal('');
            onClose();
          }}
        />
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
});

export default GoalInput;
