import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultPostsScreen from "../NestedScreen/DefaultScreenPosts";
import CommentsScreen from "../NestedScreen/CommentsScreens";
import { View, FlatList, Image } from "react-native";

const NestedScreens = createStackNavigator();

const PostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
   if (route.params) {
    setPosts((prevState) => [...prevState, route.params]);
   }
    
  }, [route.params]);

  return (
    <>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Image source={{ uri: item.photo }} />}
      />

      <NestedScreens.Navigator>
        <NestedScreens.Screen
          name="Публикации"
          component={DefaultPostsScreen}
        />
        <NestedScreens.Screen name="Коментарии" component={CommentsScreen} />
      </NestedScreens.Navigator>
    </>
  );
};

export default PostsScreen;
