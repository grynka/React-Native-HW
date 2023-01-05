import { StatusBar } from 'expo-status-bar';
import { TextInput, StyleSheet, Text, View, Button } from 'react-native';
import { useState } from 'react';
import { Header, Icon } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";


export default function App() {
  const [value, setValue] = useState("");
  const inputHandler = (text) => setValue(text);
  return (
    <>
    <Header
      backgroundImageStyle={{}}
      barStyle="default"
      centerComponent={{
        text: "AVTOPARTS EXPERT",
        style: { color: "#fff" }
      }}
      centerContainerStyle={{}}
      containerStyle={{ width: 350 }}
      leftComponent={{ icon: "menu", color: "#fff" }}
      leftContainerStyle={{}}
      linearGradientProps={{}}
      placement="center"
      rightComponent={{ icon: "home", color: "#fff" }}
      rightContainerStyle={{}}
      statusBarProps={{}}
    />
<View style={styles.container}>
      <TextInput style={styles.input}
        placeholder="Type Username"
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

  input: {
    border: '1px solid black',
    height: 20,
    fontSize: 16,
  },
});