import React, { useState } from "react";
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
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';


SplashScreen.preventAutoHideAsync();

export default function LoginScreen () {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const nameHandler = (text) => setName(text);
  const passwordHandler = (text) => setPassword(text);
  const onLogin = () => {
    Alert.alert("Credentials", `${name} + ${password}`);
  };

  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('../assets/fonts/Roboto/Roboto-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../assets/images//BG.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
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
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.loginButton}
                onPress={onLogin}
              >
                <Text style={styles.loginButtonText}>Войти</Text>
              </TouchableOpacity>
              <Text style={styles.noRegister}>
                Нет акаунта? Зарегистрироваться
              </Text>
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
    borderTopRightRadius: 25,
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
    marginBottom: 16,
    marginTop: 43,
    marginTop: 27,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "400",
  },

  title: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 32,
    fontFamily: "Roboto-Regular",
  },

  noRegister: {
    marginBottom: 144,
    textAlign: "center",
  },
});
