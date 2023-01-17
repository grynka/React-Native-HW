import React, { useState, useEffect, useCallback } from "react";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useDispatch } from "react-redux";
import {
  getAuth,
} from "firebase/auth";


SplashScreen.preventAutoHideAsync();
const fonts = {
  "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
  "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
};

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [user, setUser] = useState(null)
  const routing = useRoute(user);

 const isLoggedIn = async () => {
    const auth = getAuth();
   await auth.onAuthStateChanged(async (user) => {
      console.log("onAuthStateChanged called: ", user);
       setUser(user);
    });
  };

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(fonts);
        SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }
    }
    isLoggedIn()
    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}
