import React, { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import LoginScreen from './screens/auth/LoginScreen';
import RegistrationScreen from './screens/auth/RegistrationScreen';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";



const loadApplication = async () => {
  await Font.loadAsync({
    'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto/Roboto-Medium.ttf')
  })
}

export default function App() {
  const [IsReady, SetIsReady] = useState(false);
  const AuthStack = createStackNavigator()

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onFinish={() => SetIsReady(true)}
        onError={console.warn}
      />
    );
  }
 

  return (
    <NavigationContainer>
    <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen name="Registration" component={RegistrationScreen} />
        <AuthStack.Screen name="Login" component={LoginScreen} />
      </AuthStack.Navigator>
    </NavigationContainer>
  )
}

