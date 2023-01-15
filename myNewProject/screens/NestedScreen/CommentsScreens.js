import React from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const CommentsScreen = ({ route }) => {
  return (
    <View style={{backgroundColor: '#FFFFFF'}}>
      <Image
        source={{ uri: route.params.item.uri }}
        style={{
          height: 240,
          borderRadius: 8,
          marginBottom: 8,
          marginVertical: 32,
          marginHorizontal: 16,
        }}
      />
      <View>
        <Text>Комент 1</Text>
      </View>
      <View>
        <Text>Комент 2</Text>
      </View>
      <View>
        <Text>Комент 3</Text>
      </View>
      <View style={styles.input}>
        <TextInput placeholder="Комменттировать" style={styles.field} />
        <TouchableOpacity style={styles.btn}>
          <AntDesign name="arrowup" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    btn: {
      width: 34,
      height: 34,
      fontFamily: "Roboto-Regular",
      borderRadius: 50,
      backgroundColor: "#FF6C00",
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    field: {
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    input: {
      marginHorizontal: 16,
      paddingRight: 8,
      paddingLeft: 16,
      height: 50,
      borderColor: '#E8E8E8',
      borderWidth: 1,
      backgroundColor: '#F6F6F6',
      color: '#BDBDBD',
      borderRadius: 50,
      flexDirection: 'row',
      paddingVertical: 8,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });

export default CommentsScreen;
