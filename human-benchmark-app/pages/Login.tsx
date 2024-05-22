import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as API from "../api/"

const Login = ({ navigation }: any) => {
  const [username, setUsername] = useState<string>("");
  const deviceClient = new API.DeviceControllerApi();
  const handleUsernameChange = (text: string) => {
    setUsername(text.trim());
  };

  const handleSubmit = () => {
    const register = async () => {

      try {
        const res = await deviceClient.registerDevice(username);

        if (username === "START") {
          alert("cannot use keyword as username...");
          setUsername("");
          return;
        }


        if (res.status === 422) {
          alert("Name already taken");
          console.log("Name already taken");
          setUsername("");
          navigation.navigate("Login", {});
          return;
        }

        if (res.status !== 200) {
          alert("Error saving device. Please try again later.");
          setUsername("");
          navigation.navigate("Login", {});
          return;
        }

        setUsername(res.data.userName ?? "");
        navigation.navigate("SessionManagement", { username });
      } catch (error) {
        console.error("Error:", error);
        setUsername("");
        alert("Error occurred. Please try again later.");
        navigation.navigate("Login", {});
      }
    };

    register();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome To Human Benchmark ! 🧩</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleUsernameChang