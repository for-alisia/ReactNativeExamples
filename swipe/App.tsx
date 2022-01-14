import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

// Components
import Ball from './src/components/Ball.component';

export default function App() {
  return (
    <View style={styles.container}>
      <Ball />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
