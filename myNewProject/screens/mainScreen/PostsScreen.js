import React, { useState } from "react";
import { View, Text, Pressable, AntDesign, StyleSheet, Image } from "react-native";

const PostsScreen = () => {
    const [avatar, setAvatar] = useState("");
    const [name, setName] = useState("Natali Romanova");
    const [mail, setMail] = useState("mail@example.com");

    return (
        <View style={styles.profile}>
        {avatar && (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        )}
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.mail}>{mail}</Text>
      </View>
    )
}

const styles = StyleSheet.create({
     avatar: {
      color: "#FF6C00",
      borderRadius: 16,
      width: 60,
      height: 60,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
    },

    profile: {
        flex: 1,
        paddingTop: 32,
        paddingLeft: 16,
        backgroundColor: '#FFFFFF'
    },

    name: {
        fontSize: 13,
        fontFamily: "Roboto-Regular",
        fontWeight: 700
    }

})
export default PostsScreen