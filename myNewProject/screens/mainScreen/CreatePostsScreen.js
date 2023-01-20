import React, { useState, useEffect } from "react";
import { writeDataToFirestore } from "../../redux/auth/authOperation";
import { useDispatch } from "react-redux";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
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
import { Camera } from "expo-camera";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore"; 
import  db  from "../../firebase/config";

export default function CreateScreen({ navigation }) {
  const [isShowKeybord, setIsShowKeybord] = useState(false);
  const [photo, setPhoto] = useState(null)
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [geocode, setGeocode] = useState("");
  const dispatch = useDispatch();
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const keboardHide = () => {
    setIsShowKeybord(false);
    Keyboard.dismiss();
  };

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const uploadPhotoToServer = async (image) => {
    const response = await fetch(image)
    const file = await response.blob()
    const uniquePostId = Date.now().toString()
    const storage = await getStorage();
    const data = await ref(storage, `postImages/${uniquePostId}`);
    await uploadBytes(data, file)
    const processedPhoto = await getDownloadURL(data);
    return processedPhoto
  };

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
      const loc = await Location.getCurrentPositionAsync();
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
          }
  };

  const getGeocodeAsync = async () => {
    let geocode = await Location.reverseGeocodeAsync(location);
    console.log(geocode)
    setGeocode({ geocode });
    setGeocode(({ geocode }) => geocode[0]);
  };
  const nameHandler = (text) => setName(text);
  const handleGeocode = (text) => setGeocode(text);

  const uploadPostsToServer = async () => {
    const photo = await uploadPhotoToServer(image)
    console.log(photo)
    try {
      const docRef = await addDoc(collection(db, "posts"), {
photo, name, location, geocode
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
          
  }

  const takePhoto = async () => {
    startUserLocationUpdates();
    const img = await photo.takePictureAsync();
      setImage(img.uri)
    }
  

 const sendFoto = () => {
    uploadPostsToServer()
  //  dispatch(writeDataToFirestore(image, geocode, name, location))
    navigation.navigate("PostsScreen", {image, name, geocode})
 };

 const pickImage = async () => {
    startUserLocationUpdates();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    const loc = await Location.getCurrentPositionAsync();

    if (!result.canceled) {
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      setImage(result.assets[0].uri);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={keboardHide}>
    <View style={styles.container}>
      <View style={styles.head}>
        <View style={styles.addfoto}>
        <Camera style={styles.camera} ref={setPhoto}>
        {image &&  <Image style={styles.takePhotoContainer} source={{uri: image}} />}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            title="Pick an image from camera roll"
            onPress={takePhoto}
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
      </Camera>     
        </View>
       
          {image ? <TouchableOpacity onPress={() => setImage(null)}><Text style={styles.fotoAction}>Редактировать фото</Text></TouchableOpacity> :  <TouchableOpacity onPress={pickImage}><Text style={styles.fotoAction}>Загрузите фото</Text></TouchableOpacity> }
        
        <TextInput
          placeholder="Название..."
          style={styles.name}
          value={name}
          onChangeText={nameHandler}
        />
        <View style={styles.locationSection}>

          <TextInput
            onLongPress = {getGeocodeAsync}
            onChangeText={handleGeocode}
            placeholder="Местность..."
            style={styles.location}
            value={geocode.region ? `${geocode.region}, ${geocode.country}` : geocode}
          />
                    <TouchableOpacity onPress={getGeocodeAsync}>
            <EvilIcons name="location" style={styles.locationIcon} size={24} />
          </TouchableOpacity>
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
    </TouchableWithoutFeedback>

  );
}

const styles = StyleSheet.create({
  takePhotoContainer: {
position: "absolute",
width: "100%",
height: "100%",

  },

  camera: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignSelf: 'center',

  },

  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderRadius: 8,
    justifyContent: 'center',

  },

  shoot: {
height: 32,
width: 32,
padding: 5,
borderColor: "#FFFFFF",
borderWidth: 2,
borderRadius: 50,
backgroundColor: '#FFFFFFFF',

  },

  flip: {
    flex: 1,
    marginLeft: 15,
paddingBottom:15,
  },

  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },

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
    backgroundColor: "#FFFFFF",  },

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
    flexDirection: 'row-reverse',
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 32,
  },
  locationIcon: {
    padding: 0,
    color: "#BDBDBD",
    alignSelf: 'flex-start',
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
