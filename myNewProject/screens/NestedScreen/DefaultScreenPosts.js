import React, { useState } from "react";
import {
  Text,
  FlatList,
  Image,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import { collection, getDocs, query, getCountFromServer, addDoc, updateDoc, doc } from "firebase/firestore";
import db from "../../firebase/config";
import { useFocusEffect } from "@react-navigation/native";

const DefaultPostsScreen = ({ navigation }) => {
  const { username, email, avatar } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
  
  useFocusEffect(
    React.useCallback(() => {
      setPosts([]);
      getAllPosts();
    }, [])
  );

  const sentLike= async (prev, id) => {
    try {
      const docRef = await updateDoc(doc(db, `posts/${id}`), {
       like: !prev ? 1 : prev+1
      });
      console.log("Like written with ID: ", id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setPosts([]);
    getAllPosts();
  };

    const getAllPosts = async () => {
    const querySnapshot = await getDocs(collection(db, `posts`));
    querySnapshot.forEach( async (doc) => {
      const q = query(collection(db, "posts", doc.id, "comments"))    
      const querySnapshot = await getCountFromServer(q);
      const comments = await querySnapshot.data().count
      setPosts((prevState) => [...prevState, {...doc.data(), id: doc.id, count: comments}]);
    });
  };

  return (
    <View style={styles.posts}>
      <View style={styles.profile}>
        {avatar && <Image source={{ uri: avatar }} style={styles.avatar} />}
        <View style={styles.text}>
          <Text style={styles.name}>{username}</Text>
          <Text style={styles.mail}>{email}</Text>
        </View>
      </View>

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
            ><View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <Pressable
                onPress={() => navigation.navigate("Коментарии", { postId: item.id, image: item.photo })}
              >
                <Text
                  style={{
                    color: item.count>0 ? "#000000" : "#BDBDBD",
                    fontFamily: "Roboto-Regular",
                    fontSize: 16,
                    alignSelf: "center",
                    marginRight: 24,
                  }}
                >
                <Feather name="message-circle" 
                    style={{ marginRight: 10, color: item.count>0 ? "#FF6C00" : "#BDBDBD"}}
                    size={20}
                  />{" "}
                  { item.count }
                </Text>
              </Pressable>
              <Pressable
                onPress={() => sentLike(item.like, item.id)}
              >
                <Text
                  style={{
                    color: item.like>0 ? "#000000" : "#BDBDBD",
                    fontFamily: "Roboto-Regular",
                    fontSize: 16,
                    alignSelf: "center",
                  }}
                >
                <Feather name="thumbs-up" 
                    style={{ marginRight: 10, marginLeft: 20, color: item.like>0 ? "#FF6C00" : "#BDBDBD"}}
                    size={20}
                  />{" "}
                  { !item.like ? 0 : item.like}
                </Text>
              </Pressable>
              </View>
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
  );
};

const styles = StyleSheet.create({
  posts: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
    flexWrap: "wrap",
    width: "100%",
  },

  profile: {
    flexDirection: "row",
  },

  avatar: {
    color: "#FF6C00",
    borderRadius: 16,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  text: {
    paddingLeft: 8,
    paddingTop: 16,
  },

  name: {
    fontSize: 13,
    fontFamily: "Roboto-Medium",
    width: 300,
  },

  mail: {
    fontSize: 11,
    fontFamily: "Roboto-Regular",
  },
});
export default DefaultPostsScreen;
