import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../router";
import { useDispatch, useSelector } from "react-redux";
import { authStateChangeUser } from "../redux/auth/authOperation";

const Main = () => {
  const {stateChange} = useSelector((state) => state.auth) ;
  const dispatch = useDispatch();
  useEffect(()=> {
dispatch(authStateChangeUser())
  }, []);

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
