import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultPostsScreen from "../NestedScreen/DefaultScreenPosts";
import CommentsScreen from "../NestedScreen/CommentsScreens";
import MapScreen from "../NestedScreen/MapScreen";



const NestedScreens = createStackNavigator();

const PostsScreen = ({navigation}) => {
 
  return (
      <NestedScreens.Navigator>
        <NestedScreens.Screen
          name="Публикации"
          component={DefaultPostsScreen}
                  />
        <NestedScreens.Screen name="Коментарии" component={CommentsScreen} />
        <NestedScreens.Screen name="Карта" component={MapScreen} />
      </NestedScreens.Navigator>
  );
};

export default PostsScreen;
