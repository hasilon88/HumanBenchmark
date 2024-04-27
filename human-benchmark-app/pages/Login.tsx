import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as API from "../api";

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

        localStorage.setItem("userId", res.data.id?.toString() ?? "-1");
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
        onChangeText={handleUsernameChange}
        value={username}
        placeholder="Enter your username"
        keyboardAppearance="default"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#34C759",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Login;
