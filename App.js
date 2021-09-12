import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';

import GoalItem from './components/GoalItem'
import GoalInput from './components/GoalInput'

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);
  console.log('RE-RENDERING');
  console.log(courseGoals);

  const addGoalHandler = goalTitle => {
    if (goalTitle.length === 0 ) {
      return;
    }

    setCourseGoals(currentGoals => [
      ...courseGoals,
      { id: Math.random().toString(), value: goalTitle }
    ]);
    setIsAddMode(false);
  }

  const removeGoalHandler = goalId => {
    console.log('TO BE DELETED: ', + goalId);
    console.log(courseGoals);
    setCourseGoals(
      currentGoals => {
        return currentGoals.filter((goal) => goal.id !== goalId);
      }
    )
  }

  const cancelGoalAddMode = () => {
    setIsAddMode(false);
  }

  return (
    <View style={styles.screen}>
      <Button title="Add new goal" onPress={() => setIsAddMode(true) }/>
      <GoalInput
        visible={isAddMode}
        onAddGoal={addGoalHandler}
        onCancel={cancelGoalAddMode}
      />
      <View>
        <FlatList
          keyExtractor={(item) => item.id }
          data={courseGoals}
          renderItem={itemData => <GoalItem id={itemData.item.id} onDelete={removeGoalHandler} title={itemData.item.value}/>}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});
