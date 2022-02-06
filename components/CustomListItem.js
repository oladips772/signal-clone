/** @format */
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  doc,
} from "firebase/firestore";

const CustomListItem = ({ id, chatName, enterChat, route }) => {
  const collRef = collection(db, `chats/${id}/messages`);
  const Queried = query(collRef, orderBy("timestamp", "asc"));
  const [chats, setChats] = useState([]);

  useEffect(
    () =>
      onSnapshot(Queried, (snapshot) => {
        setChats(
          snapshot.docs.map((doc) => ({
            data: doc.data(),
          }))
        );
      }),
    []
  );

  return (
    <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
      <Avatar
        rounded
        source={{
          uri:
            chats?.[0]?.photoURL ||
            "https://images.vexels.com/media/users/3/129733/isolated/preview/a558682b158debb6d6f49d07d854f99f-casual-male-avatar-silhouette.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "bold" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chats?.displayName}:{chats?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
