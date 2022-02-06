/** @format */
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  KeyBoard,
  ScrollView,
  LogBox,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  Fontisto,
  Entypo,
} from "@expo/vector-icons";
import { Avatar, ListItem } from "react-native-elements";
import tw from "twrnc";
import { Keyboard } from "react-native";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const Chat = route.params;
  const collRef = collection(db, `chats/${Chat.id}/messages`);
  const Queried = query(collRef, orderBy("timestamp", "asc"));
  const user = auth.currentUser;
  LogBox.ignoreAllLogs();
  //
  const sendMessage = () => {
    if (messages) {
      Keyboard.dismiss();
      addDoc(collRef, {
        message: input,
        timestamp: serverTimestamp(),
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL,
      });
      setInput("");
    } else {
      alert("your message cant be an empty value!");
    }
  };

  useEffect(
    () =>
      onSnapshot(Queried, (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      }),
    [messages]
  );

  return (
    <View>
      <StatusBar style="light" />
      {/* header view */}
      <View
        style={{
          paddingTop: 40,
          flexDirection: "row",
          display: "flex",
          backgroundColor: "#2c6bed",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: 6,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 9, padding: 4, marginRight: 8 }}
          >
            <AntDesign name="arrowleft" size={25} color="white" />
          </TouchableOpacity>
          <Avatar
            rounded
            source={{
              uri:
                messages?.[0]?.photoURL ||
                "https://images.vexels.com/media/users/3/129733/isolated/preview/a558682b158debb6d6f49d07d854f99f-casual-male-avatar-silhouette.png",
            }}
          />
          <Text style={tw`font-bold text-white ml-3 text-lg`}>
            {Chat.chatName}
          </Text>
        </View>
        <View
          style={{
            marginRight: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={{ marginRight: 25 }}>
            <FontAwesome name="video-camera" size={23} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={23} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      {/* body view */}
      {/*  */}
      <KeyboardAvoidingView
        keyboardVerticalOffset={-160}
        behavior="height"
        style={styles.keyboard}
      >
        <>
          <ScrollView
            style={{ marginBottom: 220, marginTop: 10 }}
            showsVerticalScrollIndicator={false}
          >
            {messages &&
              messages.map(({ id, data }) =>
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.sender} key={id}>
                    {data?.photoURL ? (
                      <Avatar
                        rounded
                        source={{ uri: data?.photoURL }}
                        rounded
                        source={{ uri: data?.photoURL }}
                        position="absolute"
                        bottom={-17}
                        right={-7}
                        size={30}
                      />
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
                          position: "absolute",
                          bottom: -19,
                          right: -9,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 29,
                            color: "white",
                            marginTop: -6,
                          }}
                        >
                          {data?.email[0]}
                        </Text>
                      </View>
                    )}
                    <Text style={tw`text-blue-700 m-1 font-bold`}>
                      {data.message}
                    </Text>
                  </View>
                ) : (
                  <View key={id} style={styles.reciever}>
                    {data?.photoURL ? (
                      <>
                        <Avatar
                          rounded
                          source={{ uri: data?.photoURL }}
                          position="absolute"
                          bottom={-19}
                          left={-7}
                          size={30}
                        />
                      </>
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
                          position: "absolute",
                          bottom: -17,
                          left: -9,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 29,
                            color: "white",
                            marginTop: -6,
                          }}
                        >
                          {data?.email[0]}
                        </Text>
                      </View>
                    )}
                    <Text style={tw`text-white mb-1 font-bold`}>
                      {data.message}
                    </Text>
                    <Text style={tw`text-white  text-sm`}>
                      {data?.displayName}
                    </Text>
                  </View>
                )
              )}
          </ScrollView>
          {/* chat input footer */}
          <View style={styles.footer}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                borderWidth: 2,
                borderColor: "#2b68e6",
                borderRadius: 23,
                height: 45,
                alignItems: "center",
                padding: 2,
              }}
            >
              <Fontisto
                name="smiley"
                color="#2b68e6"
                size={21}
                style={{ marginLeft: 8 }}
              />
              <TextInput
                value={input}
                onChangeText={(val) => setInput(val)}
                placeholder={`message @${Chat.chatName}`}
                style={styles.textInput}
              />
              <Entypo
                name="attachment"
                size={20}
                color="#2b68e6"
                style={{ marginRight: 8 }}
              />
            </View>
            <TouchableOpacity onPress={sendMessage}>
              <Ionicons
                name="send"
                size={25}
                color="#2b68e6"
                style={{ padding: 6, marginRight: 13 }}
              />
            </TouchableOpacity>
          </View>
        </>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  keyboard: {
    position: "relative",
    height: "100%",
  },
  footer: {
    position: "absolute",
    bottom: 160,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ececec",
    height: 60,
    zIndex: 999,
    paddingBottom: 6,
    marginHorizontal: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 20,
    padding: 2,
  },
  sender: {
    padding: 15,
    alignSelf: "flex-end",
    marginRight: 14,
    marginBottom: 34,
    borderRadius: 20,
    maxWidth: "90%",
    position: "relative",
    backgroundColor: "#ececec",
  },
  senderText: {},
  reciever: {
    padding: 15,
    alignSelf: "flex-start",
    margin: 15,
    marginBottom: 34,
    borderRadius: 20,
    maxWidth: "90%",
    position: "relative",
    backgroundColor: "#2b68e6",
  },
  recieverText: {},
});
