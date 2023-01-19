import React, { useEffect, useState } from "react";
import { Text, FlatList, Image, View, StyleSheet, Pressable } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { useSelector } from "react-redux";


const DefaultPostsScreen = ({ route, navigation }) => {
  const {username, email, avatar } = useSelector((state) => state.auth)

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    console.log(navigation)
    if (route.params) {
      setPosts((prevState) => [
        ...prevState,
        {
          uri: route.params.image,
          id: route.key,
          geocode: route.params.geocode,
          name: route.params.name,
          location: route.params.location,
        },
      ]);
    }
  }, [route.params]);

  return (
    <View style={styles.posts}>
      <View style={styles.profile}>
        {avatar && (
          <Image
            source={{uri: avatar}}
            style={styles.avatar}
          />
        )}
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
              source={{ uri: item.uri }}
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
              <Pressable onPress={() => navigation.navigate("Коментарии", {item})}>
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
              <Pressable onPress={() => navigation.navigate('Карта', {item})}>
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
                  {`${item.geocode.city}, ${item.geocode.country}`}
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
