import React, { useState } from "react";
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Button,
  ImageBackground,
} from "react-native";

export default function LoginScreen() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
  
    const nameHandler = (text) => setName(text);
    const passwordHandler = (text) => setPassword(text);
  
    const onLogin = () => {
      Alert.alert("Credentials", `${name} + ${password}`);
    };

    
return(
    <ImageBackground source={require('../assets/BG.jpg')} resizeMode="stretch" style={styles.image}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>

        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <TextInput
            value={name}
            onChangeText={nameHandler}
            placeholder="Username"
            style={styles.input}
          />
          <TextInput
            value={password}
            onChangeText={passwordHandler}
            placeholder="Password"
            secureTextEntry={true}
            style={styles.input}
          />
          <Button title={"Войти"} style={styles.button} onPress={onLogin} />
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
    </ImageBackground>
)

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
        },
    
    input: {
      width: 200,
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: "black",
      marginBottom: 10,
    },

    image: {
        flex: 1,
        justifyContent: "center"
      },
      button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 100,
        elevation: 3,
        backgroundColor:"#FF6C00",
      }
  });