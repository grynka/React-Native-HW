import React, { useState } from "react";
import { AntDesign} from "@expo/vector-icons";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const COMENTARS = [
  {
    author: "aurora",
    avatar: require("../../assets/images/avatar.jpg"),
    text: "Комент 1 Комент 1 Комент 1 Комент 1 Комент 1 Комент 1 Комент 1 Комент 1 Комент 1 Комент 1 Комент 1 Комент 1 Комент 1",
  },
  {
    author: "vika",
    avatar: require("../../assets/images/avatar.jpg"),
    text: "Комент 1 Комент 1 Комент 1 Комент 1 Комент 1 Комент 1 Комент 1 Комент 1",
  },
  {
    author: "lilia",
    avatar: require("../../assets/images/avatar.jpg"),
    text: "Комент 1 Комент 1 Комент 1 Комент 1 Комент 1 Комент 1 Комент 1 Комент 1",
  },
];

const CommentsScreen = () => {
  const [coment, setComent] = useState('');
  const [comentars, setComentars] = useState(COMENTARS);

const comentHandler = (text) => setComent(text);
const addComent = () => {
  setComentars((prevState) => [
    ...prevState,
    {
     text: coment,
     author: "vika",
     avatar: require("../../assets/images/avatar.jpg"),
    },]);
    setComent('')
};

  return (
    <View style={{flex: 1, backgroundColor: "#FFFFFF", paddingHorizontal: 16 }}>
      <ScrollView>
        {comentars.map((comentar) => (
          <View key={comentar.index} style={comentar.index % 2 === 0 ? styles.comentar : styles.comentar2}>
          <Image source={comentar.avatar}   style={styles.avatar}/>
          <Text  style={styles.text}>{comentar.text}</Text></View>
        ))}
      </ScrollView>
      <View style={styles.input}>
        <TextInput onChangeText={comentHandler} placeholder="Комментировать" style={styles.field} value={coment}/>
        <TouchableOpacity style={styles.btn} onPress={addComent}>
          <AntDesign name="arrowup" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    height: 28,
    width: 28,
    borderRadius: 50,
    marginRight: 16,
  },

  comentar: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    justifyContent: 'flex-start',
  },

  comentar2: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    marginBottom: 24,
    justifyContent: 'flex-end',
  },

  text: {
backgroundColor: 'rgba(0, 0, 0, 0.03)',
paddingHorizontal: 16,
paddingTop: 16,
paddingBottom: 8,
borderTopRightRadius: 6,
borderBottomLeftRadius: 6,
borderBottomRightRadius: 6,
flex: 1,

  },

  btn: {
    width: 34,
    height: 34,
    fontFamily: "Roboto-Regular",
    borderRadius: 50,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
  },

  field: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    paddingRight: 8,
    paddingLeft: 16,
    height: 50,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    color: "#BDBDBD",
    borderRadius: 50,
    flexDirection: "row",
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
});

export default CommentsScreen;
