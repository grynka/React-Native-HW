import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultPostsScreen from "../NestedScreen/DefaultScreenPosts";
import CommentsScreen from "../NestedScreen/CommentsScreens";
import MapScreen from "../NestedScreen/MapScreen";
import { Feather } from '@expo/vector-icons'; 
import { Pressable } from "react-native";
import { authSignOutUser } from "../../redux/auth/authOperation";
import { useDispatch } from "react-redux";



const NestedScreens = createStackNavigator();
const dispatch = useDispatch();

const SigbOut = () => {
 dispatch(authSignOutUser)
}

const PostsScreen = ({navigation}) => {
 
  return (
      <NestedScreens.Navigator>
        <NestedScreens.Screen
          name="Публикации"
          component={DefaultPostsScreen}
          options={{
            headerRight: () => (
              <Pressable onPress={SigbOut}>
<Feather name="log-out" size={24} color="black" />
                              </Pressable>)
            }}

                  />
        <NestedScreens.Screen name="Коментарии" component={CommentsScreen} />
        <NestedScreens.Screen name="Карта" component={MapScreen} />
      </NestedScreens.Navigator>
  );
};

export default PostsScreen;
