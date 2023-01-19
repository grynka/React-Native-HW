import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import { authSignOutUser } from "../../redux/auth/authOperation";

const ProfileScreen = () => {
  const { username, avatar } = useSelector((state) => state.auth);
  const [avatarImg, setAvatarImg] = useState("");
  const dispatch = useDispatch();
  const SignOut = () => {
    dispatch(authSignOutUser());
  };

  useEffect(() => {
    setAvatarImg(avatar);
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

      if (!result.canceled) {
      setAvatarImg(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/images/BG.jpg")}
      >
        <View style={styles.content}>
          <View style={styles.inputAvatar}>
            {avatarImg && (
              <Image source={{ uri: avatarImg }} style={styles.avatar} />
            )}

            {avatarImg ? (
              <Pressable
                style={styles.delAvatar}
                onPress={() => setAvatarImg(null)}
              >
                <Text style={styles.addAvatarUnion}>
                  <AntDesign name="close" size={24} color="#BDBDBD" />
                </Text>
              </Pressable>
            ) : (
              <Pressable style={styles.addAvatar} onPress={pickImage}>
                <Text style={styles.addAvatarUnion}>
                  <AntDesign name="plus" size={20} color="#FF6C00" />
                </Text>
              </Pressable>
            )}
          </View>
          
          <Text style={styles.name}>{username}</Text><Pressable style={styles.signout} onPress={SignOut}>
            <Feather
              name="log-out"
              style={{ marginRight: 16, color: "#BDBDBD" }}
              size={24}
            />
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },

  content: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    fontFamily: "Roboto-Regular",
    height: "100%",
  },

  avatar: {
    borderRadius: 8,
    width: 120,
    height: 120,
    marginRight: 0,
    marginBottom: -39,
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
    marginTop: -67,
    justifyContent: "flex-end",
    paddingBottom: 14,
    alignItems: "flex-end",
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-start",
    paddingTop: 147,
  },

  signout: {
    justifyContent: "center",
    marginTop: -70,
    paddingBottom: 46,
    alignItems: "flex-end",
  },

  name: {
    fontFamily: "Roboto-Regular",
    fontSize: 30,
    color: "#212121",
    justifyContent: "center",
    textAlign: "center",
  },
});

export default ProfileScreen;
