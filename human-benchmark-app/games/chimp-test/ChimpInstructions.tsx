import React, { useEffect } from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";

const ChimpTestInstructions = ({ navigation, route }: any) => {
  const { username, sessionCode, stompClient, score } = route.params;

  const handleGameStart = () => {
    navigation.navigate("Chimp Memorize Sequence", { level: 0, username, sessionCode, stompClient, score });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Chimp Test!</Text>
        <Text style={styles.text}>Can you remember the number sequence ?</Text>
        <Text style={styles.text}>
          Pay close attention and test your memory!
        </Text>
        <Pressable style={styles.startButton} onPress={handleGameStart}>
          <Text style={styles.buttonText}>Start Game</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  content: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  startButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ChimpTestInstructions;
