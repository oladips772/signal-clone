/** @format */
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import tw from "twrnc";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const AddChatScreen = ({ navigation }) => {
  const [chatName, setChatName] = useState("");

  const CreateChat = async () => {
    const collRef = collection(db, "chats");
    if (chatName && chatName.trim()) {
      await addDoc(collRef, {
        chatName: chatName.trim(),
      })
        .then(() => navigation.goBack())
        .catch((err) => alert(err.message));
    } else {
      alert("name of chat should be at least one character long!");
    }
  };

  return (
    <View>
      <StatusBar style="light" />
      {/* header view */}
      <View
        style={{
          paddingTop: 30,
          flexDirection: "row",
          display: "flex",
          backgroundColor: "#2c6bed",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 9, padding: 4, marginRight: 72 }}
        >
          <AntDesign name="left" size={24} color="white" />
        </TouchableOpacity>
        <Text
          style={tw`font-bold text-white text-lg p-2 self-center text-center align-center justify-center`}
        >
          Create a chat
        </Text>
      </View>
      {/* body view */}
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <TextInput
          style={{
            marginTop: 20,
            marginBottom: 14,
            height: 35,
            fontSize: 19,
            borderBottomWidth: 1,
            borderBottomColor: "gray",
          }}
          placeholder="Enter a chat name"
          value={chatName}
          onChangeText={(val) => setChatName(val)}
        />
        <Button title="Create" onPress={CreateChat} />
      </View>
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
