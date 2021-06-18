import React, { useState } from 'react';

import { View, TextInput, StyleSheet, Button } from 'react-native';

const GoalInput = ({ onGoalAdd }) => {
  const [enteredGoal, setEnteredGoal] = useState('');

  return (
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
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    borderColor: 'darkturquoise',
    borderWidth: 1,
    padding: 3,
    flexGrow: 1,
  },
});

export default GoalInput;
