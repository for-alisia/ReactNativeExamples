// React
import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [goals, setGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const goalAddHandler = (enteredGoal) => {
    // @ts-ignore
    setGoals((goals) => [...goals, { id: Math.random().toString(), value: enteredGoal }]);
  };

  const goalDeleteHandler = (id) => {
    // @ts-ignore
    setGoals((goals) => goals.filter((goal) => goal.id !== id));
  };

  return (
    <View style={styles.screen}>
      <Button title="ADD NEW GOAL" onPress={() => setIsAddMode(true)} />
      <GoalInput
        onGoalAdd={goalAddHandler}
        visible={isAddMode}
        onClose={() => setIsAddMode(false)}
      />
      <FlatList
        data={goals}
        renderItem={(itemData) => (
          <GoalItem
            // @ts-ignore
            title={itemData.item.value}
            onDelete={goalDeleteHandler}
            // @ts-ignore
            id={itemData.item.id}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});
