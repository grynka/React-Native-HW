import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const ProfileScreen = () => {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            console.log("Permission to access location was denied");
          }
    
          let location = await Location.getCurrentPositionAsync({});
          const coords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };
          setLocation(coords);
        })();
      }, []);
    


    return (
        <View style={styles.container}>
          <MapView
            style={styles.mapStyle}
            region={{
              ...location,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
          >
            {location && (
              <Marker title="I am here" coordinate={location} description="Hello" />
            )}
          </MapView>
          {location && <Text style={styles.container}> {location.latitude}</Text>}
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },
      mapStyle: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
      },
    });
    

export default ProfileScreen