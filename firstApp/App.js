// React
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

// Expo
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <View style={{ padding: 50 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextInput
          placeholder="Add Goal Here"
          style={{ borderColor: 'darkturquoise', borderWidth: 1, padding: 8, flexGrow: 2 }}
        />
        <Button title="ADD" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
