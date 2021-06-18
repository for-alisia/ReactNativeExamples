// React
import React, { useState } from 'react';
import { StyleSheet, View, Button, TextInput, Text } from 'react-native';

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState('');
  const [goals, setGoals] = useState([]);

  return (
    <View style={styles.screen}>
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
            // @ts-ignore
            setGoals([...goals, enteredGoal]);
            setEnteredGoal('');
          }}
        />
      </View>
      <View>
        {goals.length > 0 &&
          goals.map((goal) => {
            return <Text key={goal}>{goal}</Text>;
          })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
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
