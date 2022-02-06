/** @format */
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SignedInStack, SignedOutStack } from "./Navigation";
import {  onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setCurrentUser(authUser);
      } else {
        setCurrentUser(null);
      }
    });
  });

  return <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>;
};

export default AuthNavigation;

const styles = StyleSheet.create({});
