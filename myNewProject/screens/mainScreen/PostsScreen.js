import React, { useState } from "react";
import { View, Text, Pressable, AntDesign, StyleSheet, Image } from "react-native";

const PostsScreen = () => {
    const [avatar, setAvatar] = useState(
     require("../../assets/images/BG.jpg")
    );
    const [name, setName] = useState("Natali Romanova");
    const [mail, setMail] = useState("mail@example.com");

    return (
        <View style={styles.profile}>
        {avatar && (
          <Image source={ require("../../assets/images/avatar.jpg")} style={styles.avatar} />
        )}
        <View style={styles.text}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.mail}>{mail}</Text>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    profile: {
        flex: 1,
        paddingTop: 32,
        paddingLeft: 16,
        backgroundColor: '#FFFFFF',
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
        width: 300
    },

    mail: {
      fontSize: 11,
      fontFamily: "Roboto-Regular",
    }

})
export default PostsScreen