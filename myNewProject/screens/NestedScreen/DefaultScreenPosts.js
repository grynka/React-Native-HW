import React,  { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Text, FlatList, Image, View, StyleSheet } from "react-native";
import {  EvilIcons } from "@expo/vector-icons";
import { Fontisto } from '@expo/vector-icons'; 


const DefaultPostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState("Natali Romanova");
  const [mail, setMail] = useState("mail@example.com");
  const [avatar, setAvatar] = useState(
    require("../../assets/images/BG.jpg")
   );

  useEffect(() => {
   if (route.params) {
    setPosts((prevState) => [...prevState, {uri: route.params.image, id: route.key, location: route.params.geocode, name: route.params.name
    }]);
   }
  console.log(route)
  }, [route.params]);

  useEffect(() => {
    console.log(posts)
  }, [posts])

   
    return (
      <>
        <View style={styles.profile}>
        {avatar && (
          <Image source={ require("../../assets/images/avatar.jpg")} style={styles.avatar} />
        )}
        <View style={styles.text}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.mail}>{mail}</Text>
        </View>
      </View>
      <FlatList style={{backgroundColor: '#FFFFFF'}}
        data={ posts }
        keyExtractor={(item) => item.id}
        renderItem={({item}) => 
        <View style={{flex: 1, marginHorizontal: 16}}><Image source={{ uri: item.uri }} style={{height: 240, borderRadius: 8, marginBottom: 8, marginTop: 32}}/>
        <Text style={{fontFamily: 'Roboto-Regular', fontSize:16, fontWeight: '500', marginBottom: 8}}>{item.name}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8}}>
        <Text style={{color: '#BDBDBD', fontFamily: 'Roboto-Regular', fontSize:16}}><Fontisto name="comment" style={{marginRight: 10}} size={16} /> 0</Text>
        <View style={{flexDirection: 'row'}}><EvilIcons name="location" style={{marginRight: 5, color: '#BDBDBD'}} size={24} />
        <Text style={{alignItems: 'center', textDecorationLine: 'underline', fontFamily: 'Roboto-Regular', fontSize:16}} >
        {`${item.location.city}, ${item.location.country}`}</Text>
        </View></View></View>}
      /></>
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
export default DefaultPostsScreen