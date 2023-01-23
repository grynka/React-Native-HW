import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { authSignInUser } from "../../redux/auth/authOperation";
import { useDispatch } from "react-redux";



export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSecurity, setIsSecurity] = useState(true);
  const [isShowKeybord, setIsShowKeybord] = useState(false)
  
  const keboardHide = () => {
    setIsShowKeybord(false);
    Keyboard.dismiss();
  }
  const dispatch = useDispatch();

  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const handleSubmit = () => {
    setIsShowKeybord(false);
    Keyboard.dismiss();
    dispatch(authSignInUser(email, password));
  };

  return (
    <TouchableWithoutFeedback onPress={keboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/BG.jpg")}
        >
          <KeyboardAvoidingView  behavior={Platform.OS == "ios" ? "padding" : "height"}>
            <View style={{...styles.form, paddingBottom: isShowKeybord ? 20 : 144}}>
              <Text style={styles.title}>Войти</Text>
              <TextInput
                value={email}
                onChangeText={emailHandler}
                placeholder="Адрес электронной почты"
                style={styles.inputName}
                onFocus={() => setIsShowKeybord(true)}
              />
              <View style={styles.inputContainer}>
                <TextInput
                  value={password}
                  onChangeText={passwordHandler}
                  placeholder="Пароль"
                  secureTextEntry={isSecurity}
                  style={styles.input}
                  onFocus={() => setIsShowKeybord(true)}
                />
                <Pressable
                  onPress={() => {
                    setIsSecurity((prev) => !prev);
                  }}
                >
                  <Text style={styles.showPass}>{isSecurity ? "Показать" : "Скрыть"}</Text>
                </Pressable>
              </View>
              <View style={{display: isShowKeybord ? 'none' : 'flex'}}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.loginButton}
                onPress={handleSubmit}
              >
                <Text style={styles.loginButtonText}>Войти</Text>
              </TouchableOpacity>
              <View style={styles.containerNoRegister}>
              <Text style={styles.noRegister}>
                Нет акаунта? </Text>
                <Pressable 
        onPress={() => navigation.navigate("Registration")}
      ><Text style={styles.noRegister}> Зарегистрироваться</Text></Pressable>
              </View></View>
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

  inputContainer: {
    backgroundColor: "#F6F6F6",
    marginHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8E8E8",
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
    fontFamily: "Roboto-Regular",
    paddingBottom: 144,
  },

  input: {
    height: 50,
    padding: 16,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    color: "#212121",
    fontSize: 16,
    width: "80%",
  },

  showPass: {
    color: '#1B4371',
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },

  inputName: {
    height: 50,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    color: "#212121",
    fontSize: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
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
    fontFamily: "Roboto-Medium",
  },

  noRegister: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
    fontSize: 16,
  },
  containerNoRegister: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
