import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";

const JoinLobby = ({ navigation, route }: any) => {
  const { username } = route.params; // Accessing username from route params
  const [code, setCode] = useState(""); // Using correct state variable name

  const handleCodeChange = (text: string) => {
    setCode(text); // Updating code state
  };

  const handleSubmit = () => {
    console.log(code);
    navigation.navigate("Awaiting Start", { username });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join Existing Lobby</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleCodeChange}
        value={code}
        placeholder="Enter your lobby code"
        keyboardAppearance="default"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Join</Text>
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

export default JoinLobby;
