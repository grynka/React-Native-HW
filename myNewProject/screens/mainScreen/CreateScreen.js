import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { Feather, EvilIcons } from "@expo/vector-icons";
import * as Location from "expo-location";

export default function CreateScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [geocode, setGeocode] = useState();

  const startUserLocationUpdates = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Insufficient permissions!",
          "Sorry, we need location permissions to make this work!",
          [{ text: "Okay" }]
        );
        return;
      }
    }
  };
  const getGeocodeAsync = async () => {
    let geocode = await Location.reverseGeocodeAsync(location);
    setGeocode({ geocode });
    setGeocode(({ geocode }) => geocode[0]);
    //console.log(geocode[0].region, geocode[0].country)
    console.log(geocode);
    console.log(location);
    return geocode;
  };

  const nameHandler = (text) => setName(text);

  const pickImage = async () => {
    startUserLocationUpdates();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    const loc = await Location.getCurrentPositionAsync();

    console.log(result);

    if (!result.canceled) {
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      setImage(result.assets[0].uri);
    }
    getGeocodeAsync();
  };

 const sendFoto = () => {
  console.log(navigation)
  navigator.navigate("PostsScreen", {Image});
 };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
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
        <Text style={styles.fotoAction}>
          {image ? "Редактировать фото" : "Загрузите фото"}
        </Text>
        <TextInput
          placeholder="Название..."
          style={styles.name}
          value={name}
          onChangeText={nameHandler}
        />
        <View style={styles.locationSection}>
          <TouchableOpacity onPress={getGeocodeAsync}>
            <EvilIcons name="location" style={styles.locationIcon} size={24} />
          </TouchableOpacity>
          <TextInput
            onFocus={getGeocodeAsync}
            placeholder="Местность..."
            style={styles.location}
            value={geocode ? `${geocode.region}, ${geocode.country}` : ""}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            ...styles.createButton,
            backgroundColor: image ? "#FF6C00" : "#F6F6F6",
          }}
          onPress={sendFoto}
        >
          <Text
            style={{
              color: image ? "#FFFFFF" : "#BDBDBD",
              fontSize: 16,
              fontFamily: "Roboto-Regular",
            }}
          >
            Опубликовать
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity
          onPress={() => {
            setImage(null), setGeocode(null);
          }}
          style={styles.delete}
        >
          <Feather name="trash-2" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fotoAction: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    alignItems: "flex-start",
  },

  head: {
    width: "100%",
  },

  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 32,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderColor: "#212121",
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

  fotoAction: {
    width: "100%",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
    alignItems: "flex-start",
    marginBottom: 32,
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
    flex: 1,
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    alignItems: "flex-start",
    height: 50,
    borderBottomWidth: 1,
    width: "100%",
    borderColor: "#E8E8E8",
    paddingLeft: 24,
    marginLeft: -24,
  },

  locationSection: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 32,
  },
  locationIcon: {
    padding: 0,
    color: "#BDBDBD",
  },

  createButton: {
    width: "100%",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: "center",
  },
  delete: {
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    magrinTop: 120,
  },
});
