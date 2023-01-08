import React, { useState } from "react";
import * as Font from "expo-font";
import  AppLoading from "expo";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";

const loadFonts = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Medium.ttf"),
  });
};

export default function LoginScreen() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isReady, setIsReady] = useState(false);

  const nameHandler = (text) => setName(text);
  const passwordHandler = (text) => setPassword(text);

  const onLogin = () => {
    Alert.alert("Credentials", `${name} + ${password}`);
  };

  if (!isReady) {
    return <AppLoading startAsync={loadFonts} onFinish={() => setIsReady(true)}/>
};

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
       <ImageBackground
       style={styles.image}
       source={require("../assets/images//BG.jpg")} >
              <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
       <View style={styles.form}>
       
        <Text style={styles.title}>Войти</Text>
       <TextInput
            value={name}
            onChangeText={nameHandler}
            placeholder="Адрес электронной почты"
            style={styles.input}
          />
          <TextInput
            value={password}
            onChangeText={passwordHandler}
            placeholder="Пароль"
            secureTextEntry={true}
            style={styles.input}
          />
          <TouchableOpacity activeOpacity={0.8} style={styles.loginButton} onPress={onLogin}>
          <Text style={styles.loginButtonText} >Войти</Text>
          </TouchableOpacity>

       </View>
            </KeyboardAvoidingView>
      </ImageBackground>
</View>
    </TouchableWithoutFeedback>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },

  form: {
    backgroundColor: "#FFFFFF",
    paddingTop: 32,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
  },

  input: {
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    color: "#212121",
    fontSize: 16,
    marginBottom: 16,
    marginHorizontal: 16,

  },

  loginButton: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginHorizontal: 16,
    marginTop: 27,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },

  loginButtonText: {
  color: "#FFFFFF",
  fontSize: 16,
  fontWeight: "400"
  },

  title: {
    fontSize: 30,
    textAlign: "center",
    paddingTop: 32,
    paddingBottom: 32,
    fontFamily:"Roboto-Regular",
  },
});
