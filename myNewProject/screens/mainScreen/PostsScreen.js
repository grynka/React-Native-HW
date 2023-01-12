import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultPostsScreen from "../NestedScreen/DefaultScreenPosts";
import CommentsScreen from "../NestedScreen/CommentsScreens";

const NestedScreens = createStackNavigator();

const PostsScreen = () => {
  return(
<NestedScreens.Navigator>
  <NestedScreens.Screen name="Публикации" component={ DefaultPostsScreen } />
  <NestedScreens.Screen name="Коментарии" component={ DefaultPostsScreen } />
</NestedScreens.Navigator>)
}

export default PostsScreen