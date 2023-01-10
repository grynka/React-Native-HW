import React, { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from './router';

const loadApplication = async () => {
  await Font.loadAsync({
    'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto/Roboto-Medium.ttf')
  })
}






export default function App() {
  const [IsReady, SetIsReady] = useState(false);
  const routing = useRoute(null)
 

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
   {routing}
      </NavigationContainer>
  )
}

