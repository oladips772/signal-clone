/** @format */
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import tw from "twrnc";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = auth;

  const Loginz = () => {
    signInWithEmailAndPassword(auth, email, password).catch((err) =>
      alert(err.message)
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* header view */}
      <View
        style={{
          paddingTop: 30,
          textAlign: "center",
          justifyContent: "center",
          backgroundColor: "#2c6bed",
          alignItems: "center",
        }}
      >
        <Text style={tw`font-bold text-white text-lg p-2`}>Login</Text>
      </View>
      {/* body View */}
      <View
        style={{
          marginHorizontal: 10,
          justifyContent: "center",
          marginTop: 50,
        }}
      >
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/5/56/Logo_Signal..png",
          }}
          style={{
            width: 120,
            height: 120,
            resizeMode: "contain",
            textAlign: "center",
            justifyContent: "center",
            alignSelf: "center",
            marginBottom: 20,
          }}
        />
        <View>
          <TextInput
            value={email}
            placeholder="Email"
            onChangeText={(val) => setEmail(val)}
            style={{
              fontSize: 19,
              borderBottomWidth: 1,
              borderBottomColor: "gray",
              marginBottom: 16,
            }}
          />
          <TextInput
            value={password}
            placeholder="Password"
            onChangeText={(val) => setPassword(val)}
            style={{
              fontSize: 19,
              borderBottomWidth: 1,
              borderBottomColor: "gray",
              marginBottom: 14,
            }}
          />
          <TouchableOpacity
            onPress={Loginz}
            style={{
              backgroundColor: "#2c6bed",
              textAlign: "center",
              alignItems: "center",
              height: 40,
              padding: 5,
              borderRadius: 4,
              marginTop: 10,
            }}
          >
            <Text style={tw`font-bold text-white text-lg`}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={{
              textAlign: "center",
              alignItems: "center",
              height: 40,
              padding: 5,
              borderRadius: 4,
              marginTop: 10,
            }}
          >
            <Text style={tw`font-bold text-blue-400 text-lg`}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
