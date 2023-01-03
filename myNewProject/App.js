import { StatusBar } from 'expo-status-bar';
import { TextInput, StyleSheet, Text, View, Button } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [value, setValue] = useState("");
  const inputHandler = (text) => setValue(text);
  return (
    <>
<View style={styles.container}>
      <TextInput
        placeholder="Type text"
        value={value}
        onChangeText={inputHandler}
      />
    </View>
    <Button title="Log in">Log in</Button></>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});