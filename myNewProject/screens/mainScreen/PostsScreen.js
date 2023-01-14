import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultPostsScreen from "../NestedScreen/DefaultScreenPosts";
import CommentsScreen from "../NestedScreen/CommentsScreens";



const NestedScreens = createStackNavigator({ });

const PostsScreen = () => {
 
  return (
      <NestedScreens.Navigator>
        <NestedScreens.Screen
          name="DefaultPostsScreen"
          component={DefaultPostsScreen}
                  />
        <NestedScreens.Screen name="Коментарии" component={CommentsScreen} />
      </NestedScreens.Navigator>
  );
};

export default PostsScreen;
