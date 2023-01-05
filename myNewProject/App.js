import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from "react-native";

export default function App() {
  const [value, setValue] = useState("");
  const inputHandler = (text) => setValue(text);
  return (
      <View style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
        <TextInput
          placeholder="Type text"
          value={value}
          onChangeText={inputHandler}
        />
              </KeyboardAvoidingView>

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 30
  },
});