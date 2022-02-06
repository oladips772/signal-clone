/** @format */
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Input } from "react-native-elements";
import tw from "twrnc";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const Register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((authuser) => {
        updateProfile(authuser.user, {
          displayName: fullName,
          email: email,
          photoURL: profilePic,
        });
      })
      .catch((err) => alert(err.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar style="light" />
      {/* header View */}
      <View
        style={{
          paddingTop: 30,
          textAlign: "center",
          justifyContent: "center",
          backgroundColor: "#2c6bed",
          alignItems: "center",
        }}
      >
        <Text style={tw`font-bold text-white text-lg p-2`}>Register</Text>
      </View>
      {/* body view */}
      <View
        style={{
          marginHorizontal: 10,
        }}
      >
        <View style={{ marginTop: 60 }}>
          <Text
            style={tw`font-bold  text-2xl text-center self-center text-blue-400`}
          >
            Create a Signal account
          </Text>
        </View>
        <View style={{ marginTop: 40 }}>
          <Input
            value={fullName}
            placeholder="Full Name"
            style={styles.inputContainer}
            onChangeText={(val) => setFullName(val)}
          />
          <Input
            value={email}
            placeholder="Email Address"
            style={styles.inputContainer}
            onChangeText={(val) => setEmail(val)}
          />
          <Input
            value={password}
            placeholder="Password"
            style={styles.inputContainer}
            onChangeText={(val) => setPassword(val)}
          />
          <Input
            value={profilePic}
            placeholder="Profile Pic Url (Optional)"
            style={styles.inputContainer}
            onChangeText={(val) => setProfilePic(val)}
          />
        </View>
        <TouchableOpacity
          onPress={Register}
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
          <Text style={tw`font-bold text-white text-lg`}>Regsiter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{
            textAlign: "center",
            alignItems: "center",
            height: 40,
            padding: 5,
            borderRadius: 4,
            marginTop: 10,
          }}
        >
          <Text style={tw`font-bold text-blue-400 text-lg`}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  inputContainer: {
    fontSize: 16,
  },
});
