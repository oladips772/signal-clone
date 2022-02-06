/** @format */
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  LogBox,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import tw from "twrnc";
import CustomListItem from "../components/CustomListItem";
import { Avatar } from "react-native-elements";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import {
  addDoc,
  collection,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { signOut } from "firebase/auth";

const HomeScreen = ({ navigation }) => {
  const [Chats, setChats] = useState([]);
  const collRef = collection(db, "chats");
  const user = auth.currentUser;
  LogBox.ignoreAllLogs();

  // 
  const enterChat = (id, chatName) => {
    navigation.navigate("ChatScreen", {
      id: id,
      chatName: chatName,
    });
  };

  useEffect(
    () =>
      onSnapshot(collRef, (snapshot) => {
        setChats(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      }),
    []
  );

  const LogOut = () => {
    signOut(auth).catch((err) => alert(err.message));
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      {/* header view */}
      <View
        style={{
          marginTop: 35,
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "white",
          alignItems: "center",
          marginHorizontal: 13,
        }}
      >
        <TouchableOpacity onPress={LogOut}>
          {user?.photoURL ? (
            <Avatar rounded source={{ uri: user?.photoURL }} />
          ) : (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                padding: 1,
                height: 35,
                width: 35,
                borderRadius: 50,
                backgroundColor: "#2c6bed",
              }}
            >
              <Text
                style={{
                  fontSize: 29,
                  color: "white",
                  marginTop: -6,
                }}
              >
                {user?.email[0]}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <Text style={tw`font-bold text-black text-lg p-2`}>Signal</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity style={{ marginRight: 14 }}>
            <AntDesign name="camerao" size={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("AddChat")}>
            <SimpleLineIcons
              name="pencil"
              size={21}
              style={{ marginLeft: 4, padding: 2, marginRight: 8 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{ height: "100%" }}>
        {Chats.map(({ id, data: { chatName } }) => (
          <CustomListItem
            chatName={chatName}
            id={id}
            key={id}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
