import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

const SessionManagement = ({ navigation, route }: any) => {
  const { username } = route.params;

  const handleCreateSession = () => {
    // Handle create session logic
    console.log("Creating new session...");
    let isHost = true;
    let sessionCode = "";
    navigation.navigate("ExistingLobby", { username, isHost, sessionCode });
  };

  const handleJoinSession = () => {
    // Handle join session logic
    console.log("Joining existing session...");
    navigation.navigate("JoinLobby", { username });
  };

  return (
    <View style={styles.container}>
      {/* <Image
        source={require("./path/to/your/image.png")}
        style={styles.logo}
      /> */}
      <Text style={styles.title}>Ready to play {username.trim()} ?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.createButton]}
          onPress={handleCreateSession}
        >
          <Text style={styles.buttonText}>Create New Lobby</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.joinButton]}
          onPress={handleJoinSession}
        >
          <Text style={styles.buttonText}>Join Existing Lobby</Text>
        </TouchableOpacity>
      </View>
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
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  buttonContainer: {
    width: "80%",
    alignItems: "center",
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 20,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  createButton: {
    backgroundColor: "#007AFF",
  },
  joinButton: {
    backgroundColor: "#34C759",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SessionManagement;
