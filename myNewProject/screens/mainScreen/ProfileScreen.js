import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import { authSignOutUser } from "../../redux/auth/authOperation";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import db from "../../firebase/config";
import { EvilIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

const ProfileScreen = () => {
  const [ avatarImg, setAvatarImg] = useState("");
  const { username, avatar, uid } = useSelector((state) => state.auth);
  const [ posts, setPosts] = useState([]);
  
  const dispatch = useDispatch();

  const SignOut = () => {
    dispatch(authSignOutUser());
  };

  useEffect(() => {
    setAvatarImg(avatar)
    getUserPosts()
  }, []);


  const getUserPosts = async () => {
    setPosts([])
    const q = query(collection(db, "posts"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data())
      setPosts((prevState) => [...prevState, {...doc.data(), id: doc.id}]);
    });
  };


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
     
      }
      
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
          <Text style={styles.name}>{username}</Text>
          <Pressable style={styles.signout} onPress={SignOut}>
            <Feather
              name="log-out"
              style={{ marginRight: 16, color: "#BDBDBD" }}
              size={24}
            />
          </Pressable>        
          <FlatList
        style={{ flex: 1, width: "100%" }}
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <Image
              source={{ uri: item.photo }}
              style={{
                height: 240,
                borderRadius: 8,
                marginBottom: 8,
                marginTop: 32,
              }}
            />
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 16,
                fontWeight: "500",
                marginBottom: 8,
              }}
            >
              {item.name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <Pressable
                onPress={() => navigation.navigate("Коментарии", { postId: item.id, image: item.photo })}
              >
                <Text
                  style={{
                    color: "#BDBDBD",
                    fontFamily: "Roboto-Regular",
                    fontSize: 16,
                  }}
                >
                  <Fontisto
                    name="comment"
                    style={{ marginRight: 10 }}
                    size={16}
                  />{" "}
                  0
                </Text>
              </Pressable>
              <View style={{ flexDirection: "row" }}>
                <Pressable
                  onPress={() => navigation.navigate("Карта", { item })}
                >
                  <EvilIcons
                    name="location"
                    style={{ marginRight: 5, color: "#BDBDBD" }}
                    size={24}
                  />
                </Pressable>

                <Text
                  style={{
                    alignItems: "center",
                    textDecorationLine: "underline",
                    fontFamily: "Roboto-Regular",
                    fontSize: 16,
                  }}
                >
                  {item.geocode.city
                    ? `${item.geocode.city}, ${item.geocode.country}`
                    : item.geocode}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
      </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

    content: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    fontFamily: "Roboto-Regular",
    paddingHorizontal: 16,
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    paddingTop: 144
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
