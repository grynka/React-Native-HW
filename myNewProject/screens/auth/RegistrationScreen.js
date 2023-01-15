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
  Pressable,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { authSignUpUser } from "../../redux/auth/authOperation";

const initialState = {
  email: "",
  password: "",
  username: "",
}

export default function RegistrationScreen({ navigation }) {
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSecurity, setIsSecurity] = useState(true);
  const [isShowKeybord, setIsShowKeybord] = useState(false);
  const [state, setState] = useState(initialState)
  const dispatch = useDispatch();

  const keboardHide = () => {
    setIsShowKeybord(false);
    Keyboard.dismiss();
  };
  const loginHandler = (text) => setUsername(text);
  const mailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);
  const hundleSubmit = () => {
    keboardHide();
    dispatch(authSignUpUser(state))
    setState(initialState)
    console.log("Credentials", `${username} +${email} + ${password}`);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={keboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/BG.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{ ...styles.form, paddingBottom: isShowKeybord ? 10 : 78 }}
            >
              <View style={styles.inputAvatar}>
                {avatar && (
                  <Image source={{ uri: avatar }} style={styles.avatar} />
                )}
                
                 {avatar ? <Pressable style={styles.delAvatar} onPress={() => setAvatar(null)}><Text style={styles.addAvatarUnion}>
                 <AntDesign name="close" size={24} color="#BDBDBD" />
                  </Text></Pressable> : <Pressable style={styles.addAvatar} onPress={pickImage}><Text style={styles.addAvatarUnion}>
                    <AntDesign name="plus" size={20} color="#FF6C00" />
                  </Text></Pressable>}
                
              </View>
              <Text style={styles.title}>Регистрация</Text>
              <TextInput
                value={username}
                onChangeText={loginHandler}
                placeholder="Логин"
                style={styles.inputName}
                onFocus={() => setIsShowKeybord(true)}
              />
              <TextInput
                value={email}
                onChangeText={mailHandler}
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
                  <Text style={styles.showPass}>
                    {isSecurity ? "Показать" : "Скрыть"}
                  </Text>
                </Pressable>
              </View>
              <View style={{ display: isShowKeybord ? "none" : "flex" }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.loginButton}
                  onPress={hundleSubmit}
                >
                  <Text style={styles.loginButtonText}>Зарегистрироваться</Text>
                </TouchableOpacity>
                <View style={styles.containerNoRegister}>
                  <Text style={styles.noRegister}>Уже есть аккаунт?</Text>
                  <Pressable onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.noRegisterBtn}> Войти</Text>
                  </Pressable>
                </View>
              </View>
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

  addAvatar: {
    color: "#FF6C00",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#FF6C00",
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: -13,
    backgroundColor: "#FFFFFF",
  },

  delAvatar: {
  borderColor: "#E8E8E8",
  borderWidth: 1,
  backgroundColor: "#FFFFFF",
  borderRadius: 50,
  marginRight: -13,
  width: 25,
  height: 25,
  justifyContent: "center",
  alignItems: "center",
  },

  addAvatarUnion: {
    color: "#FF6C00",
    fontSize: 13,
    padding: 0,
    margin: 0,
  },

  containerNoRegister: {
    flexDirection: "row",
    justifyContent: "center",
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

  avatar: {
    borderRadius: 8,
    width: 120,
    height: 120,
    marginRight: 0,
    marginBottom: -39,
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
    justifyContent: "center",
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
    color: "#1B4371",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },

  inputAvatar: {
    height: 120,
    marginBottom: 32,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    color: "#212121",
    fontSize: 16,
    width: 120,
    alignSelf: "center",
    marginTop: -92,
    justifyContent: "flex-end",
    paddingBottom: 14,
    alignItems: "flex-end",
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

  noRegisterBtn: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
    fontSize: 16,
  },
});
