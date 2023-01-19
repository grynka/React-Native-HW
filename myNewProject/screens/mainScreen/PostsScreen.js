import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultPostsScreen from "../NestedScreen/DefaultScreenPosts";
import CommentsScreen from "./ProfileScreen";
import MapScreen from "../NestedScreen/MapScreen";
import { Feather } from '@expo/vector-icons';
import { Pressable } from "react-native";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperation";
import CreateScreen from "./CreatePostsScreen";

const NestedScreens = createStackNavigator();

const PostsScreen = ({navigation}) => {
const dispatch = useDispatch();
const SignOut = () => {
  dispatch(authSignOutUser());
};

  return (
      <NestedScreens.Navigator>
        <NestedScreens.Screen
          options={{
            headerStyle: {
              borderBottomColor: '#BDBDBD',
              borderBottomWidth: 0.3,
},
headerTitleAlign: "center",
            headerRight: () => (
            <Pressable onPress={SignOut}>
                <Feather
                  name="log-out"
                  style={{ marginRight: 10, color: "#BDBDBD" }}
                  size={24}
                />
                              </Pressable>)
          }}
          name="Публикации"
          component={DefaultPostsScreen} />
        <NestedScreens.Screen name="Коментарии" component={CommentsScreen} />
        <NestedScreens.Screen name="Карта" component={MapScreen} />
      </NestedScreens.Navigator>
  );
};

export default PostsScreen;
