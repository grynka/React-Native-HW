import React, { useEffect, useState } from "react";
import { AntDesign} from "@expo/vector-icons";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView
} from "react-native";
import { collection, addDoc, getDocs } from "firebase/firestore";
import db from "../../firebase/config";
import { useSelector } from "react-redux";


const CommentsScreen = ({route}) => {
  const { postId } = route.params;
  const [coment, setComent] = useState('');
  const [comentars, setComentars] = useState([]);
  const { avatar, username } = useSelector((state) => state.auth);

const sentComment = async () => {
  const current = new Date();
 // console.log(current)
 const month = current.toLocaleString('default', { month: 'long' })+1
  const date = `${current.getDate()} ${current.getMounth,+1} ${month} | ${current.getHours()}:${current.getMinutes()}`;

  console.log(date)
  try {
    const docRef = await addDoc(collection(db, "posts", postId, "comments"), {
      coment, username, avatar, date 
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  setComent('')
}

const getAllComments = async () => {
  const querySnapshot = await getDocs(collection(db, "posts", postId, "comments"));
  querySnapshot.forEach((doc) => {
    setComentars((prevState) => [...prevState, {...doc.data(), id: doc.id}]);
  });
}

useEffect(() => {
  getAllComments();
}, [])

const comentHandler = (text) => setComent(text);


  return (
    <View style={{flex: 1, backgroundColor: "#FFFFFF", paddingHorizontal: 16 }}>
      <SafeAreaView>
      <FlatList
      data={comentars}        
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <View key={item.id} style={item.index % 2 === 0 ? styles.comentar : styles.comentar2}>
          <Image source={{uri: item.avatar}}   style={styles.avatar}/>
          <Text  style={styles.text}>{item.coment}</Text>
          <Text  style={styles.date}>{item.date}</Text>

          </View>}
          />
      <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
      <View style={styles.input}>
        <TextInput onChangeText={comentHandler} placeholder="Комментировать" style={styles.field} value={coment}/>
        <TouchableOpacity style={styles.btn} onPress={sentComment}>
          <AntDesign name="arrowup" size={20} color="white" />
        </TouchableOpacity>
      </View></KeyboardAvoidingView></SafeAreaView>
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
