import React, { useState, useEffect } from "react";
import { TouchableOpacity, Image, View, Text, StyleSheet, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { Feather, EvilIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';


export default function CreateScreen() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.addfoto}>
        {image && <Image source={{ uri: image }} style={styles.foto} />}
        <TouchableOpacity
          title="Pick an image from camera roll"
          onPress={pickImage}
          style={{
            ...styles.addfotoIcon,
            backgroundColor: image ? "#FFFFFF4D" : "#FFFFFF",
          }}
        >
          <FontAwesome
            name="camera"
            size={20}
            color={image ? "#FFFFFF" : "#BDBDBD"}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.fotoAction}>{image ? "Редактировать фото" : "Загрузите фото"}</Text>
<TextInput placeholder="Название..." style={styles.name} />
<TextInput placeholder="Местность..." style={styles.location} />
<TouchableOpacity onPress={() => setImage(null)}>
<Feather name="trash-2" size={24} color="#BDBDBD" />
        </TouchableOpacity>
        
    </View>
  );
}

const styles = StyleSheet.create({
  fotoAction: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    alignItems: "flex-start"

  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },

  addfoto: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  addfotoIcon: {
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  foto: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    magrinTop: 32,
    position: "absolute",
  },
  name: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    alignItems: "flex-start",
    height: 50,
    borderBottomWidth: 1,
    width: "100%",
    borderColor: "#E8E8E8",
    marginBottom: 16,
  },
  location: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    alignItems: "flex-start",
    height: 50,
    borderBottomWidth: 1,
    width: "100%",
    borderColor: "#E8E8E8",
    marginBottom: 16,
  },
});
