import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const MapScreen = ({route}) => {
    console.log(route.params.item.location)
    return (
        <View style={styles.container}>
          <MapView
            style={styles.mapStyle}
            region={{
              ...route.params.item.location,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
          >
            {location && (
              <Marker title="Foto create her" coordinate={location} description="Hello" />
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
    

export default MapScreen