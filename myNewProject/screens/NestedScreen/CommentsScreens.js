import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import db from "../../firebase/config";
import { useSelector } from "react-redux";

const CommentsScreen = ({ route }) => {
  const { postId, image } = route.params;
  const [coment, setComent] = useState("");
  const [comentars, setComentars] = useState([]);
  const { avatar, username } = useSelector((state) => state.auth);
  const [isShowKeybord, setIsShowKeybord] = useState(false);

  const keyboardHide = () => {
    setIsShowKeybord(false);
    Keyboard.dismiss();
  };

  const sentComment = async () => {
    const current = new Date();
    const month = current.toLocaleString("default", { month: "long" });
    const date = `${current.getDate()} ${month} ${current.getFullYear()} | ${current.getHours()}:${current.getMinutes()}`;
    const uniquePostId = Date.now().toString();

    try {
      const docRef = await addDoc(collection(db, "posts", postId, "comments"), {
        coment,
        username,
        avatar,
        date,
        timestamp: uniquePostId
      });
      console.log("Comment written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setComent("");
    keyboardHide()
    setComentars("");
    getAllComments()
  };

  const getAllComments = async () => {
    const q = query(collection(db, "posts", postId, "comments"), orderBy("timestamp"))    
    const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.data());

      setComentars((prevState) => [
        ...prevState,
        { ...doc.data(), id: doc.id },
      ]);
    });
    console.log(comentars);
  };

  useEffect(() => {
    setComentars("");
    getAllComments();
  }, []);

  const comentHandler = (text) => setComent(text);
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={{...styles.container, paddingBottom: isShowKeybord ? 210 : 10}}>
        <Image style={styles.img} source={{ uri: image }} />
        <View style={styles.commentars}>
        <FlatList
              data={comentars}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View
                  key={item.id}
                  style={
                    item.username === username ? styles.comentarAuthor : styles.comentarGuest
                  }
                >
                  <Image source={{ uri: item.avatar }} style={styles.avatar} />
                  <View style={ item.username === username ? styles.comentWrapAuthor : styles.comentWrapGuest}>
                  <Text>{item.coment}</Text>
                  <Text style={styles.date}>{item.date}</Text>
                </View></View>
              )}
            />
            <View style={styles.input}>
              <TextInput
                onChangeText={comentHandler}
                placeholder="Комментировать"
                style={styles.field}
                value={coment}
                onFocus={Platform.OS == "ios" ? ()=>setIsShowKeybord(true) : null}
                onBlur={()=>setIsShowKeybord(false)}
              />
              <TouchableOpacity style={styles.btn} onPress={sentComment}>
                <AntDesign name="arrowup" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },

  img: {
    height: 240,
    borderRadius: 8,
    marginVertical: 32,
  },

  commentars: {
    flex: 1,
    width: "auto",
    justifyContent: "space-between",
    alignSelf: "stretch",
  },

  avatar: {
    height: 28,
    width: 28,
    borderRadius: 50,
  },

  comentarGuest: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 24,
    width: "auto",
  },

  comentWrapGuest: {
    flex: 1,
    marginLeft: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    padding: 16,
    fontFamily: "Roboto-Regular",
  },

  comentarAuthor: {
    flex: 1,
    flexDirection: "row-reverse",
    marginBottom: 24,
    width: "auto",
  },

  comentWrapAuthor: {
    marginRight: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    padding: 16,
    fontFamily: "Roboto-Regular",
    flex: 1,
  },

  date: {
    paddingTop: 8,
    fontSize: 10,
    color: "#BDBDBD",
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
    flex: 1,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    paddingRight: 8,
    paddingLeft: 16,
    height: 50,
    width: "100%",
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
