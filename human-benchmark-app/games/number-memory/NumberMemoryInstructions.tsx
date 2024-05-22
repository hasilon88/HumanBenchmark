import React, { useEffect } from "react";
import { StyleSheet, Text, Pressable, View } from 'react-native';

const NumberMemoryInstructions = ({ navigation, route }: any) => {
  const { username, sessionCode, stompClient } = route.params;

  console.log(sessionCode);

  const handleGameStart = () => {
    navigation.navigate("Number Memory Loading", { level: 0, score: 0, username, sessionCode, stompClient });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Number Memory!</Text>
        <Text style={styles.text}>Can you remember the longest number?</Text>
        <Text style={styles.text}>Pay close attention and test your memory!</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default NumberMemoryInstructions;
