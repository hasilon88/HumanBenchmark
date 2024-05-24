import React, { useState } from "react";
import { useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

export type UpdateScoreDTO = {
  deviceName: string;
  sessionCode: string;
  score: number;
};

const ChimpValidator = ({ navigation, route }: any) => {
  const { username, sessionCode, stompClient } = route.params;
  const { level, levelSucceeded } = route.params;

  const [score, setScore] = useState(route.params.score);

  useEffect(() => {
    if (levelSucceeded) {
      let newScore;

      if (score === 0) {
        newScore = 20;
      } else {
        newScore = score + level * 20;
      }

      setScore(newScore);

      const dto: UpdateScoreDTO = {
        deviceName: username,
        sessionCode: sessionCode,
        score: newScore,
      };

      if (stompClient) {
        stompClient.publish({
          destination: `/app/game`,
          body: JSON.stringify(dto),
        });
      }
    }
  }, [levelSucceeded]);

  const handleContinue = () => {
    if (levelSucceeded && level < 3) {
      navigation.navigate("Chimp Memorize Sequence", {
        level,
        score,
        stompClient,
        username,
        sessionCode,
      })
    } else {
      navigation.navigate("Leaderboard", {username, sessionCode, stompClient});
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperSection}>
        <View style={styles.content}>
          <Text style={styles.levelText}>Level {level}</Text>
          <Text style={styles.instructionText}>
            {levelSucceeded ? "Good Job, Keep Going!" : "Sorry, Game Over!"}
          </Text>
          <Text
            style={[styles.scoreText, !levelSucceeded && styles.redScoreText]}
          >
            Score: {score}
          </Text>
          <Pressable style={[styles.submitButton]} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </Pressable>
        </View>
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
  upperSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  content: {
    alignItems: "center",
  },
  levelText: {
    fontSize: 30,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#333",
  },
  instructionText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#666",
  },
  scoreText: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#008000",
  },
  redScoreText: {
    color: "red",
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 1,
  },
  redButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ChimpValidator;
