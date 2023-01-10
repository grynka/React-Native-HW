import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';


const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import LoginScreen from "./screens/auth/LoginScreen";
import RegistrationScreen from "./screens/auth/RegistrationScreen";
import ProfileScreen from "./screens/mainScreen/ProfileScreen";
import PostsScreen from "./screens/mainScreen/PostsScreen";
import CreateScreen from "./screens/mainScreen/CreateScreen";

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Registration"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator barOptions={{ showLabel: false }}>
      <MainTab.Screen options={{
        tabBarIcon: ({ focused, size, color }) => (<SimpleLineIcons name="grid" size={24} color={color} />)}} name="Публикации" component={PostsScreen} />
      <MainTab.Screen options={{
        tabBarIcon: ({focused, size, color}) => (<AntDesign name="plus" size={24} color={color} />)}} name="Создать публикацию" component={CreateScreen} />
      <MainTab.Screen options={{
        tabBarIcon: ({focused, size, color}) => (<Feather name="user" size={24} color={color} />)}} name="Profile" component={ProfileScreen} />
    </MainTab.Navigator>
  );
};
