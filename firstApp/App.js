// React
import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [goals, setGoals] = useState([]);

  const goalAddHandler = (enteredGoal) => {
    // @ts-ignore
    setGoals((goals) => [...goals, { id: Math.random().toString(), value: enteredGoal }]);
  };

  return (
    <View style={styles.screen}>
      <GoalInput onGoalAdd={goalAddHandler} />
      <FlatList
        data={goals}
        // @ts-ignore
        renderItem={(itemData) => <GoalItem title={itemData.item.value} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});
