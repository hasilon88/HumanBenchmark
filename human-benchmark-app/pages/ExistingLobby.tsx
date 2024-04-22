import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";

const tempData = [
  {
    id: 1,
    username: "player1",
    donePlaying: false,
    score: 0
  },
  {
    id: 2,
    username: "player2",
    donePlaying: false,
    score: 0
  },
  {
    id: 3,
    username: "player3",
    donePlaying: false,
    score: 0
  },
  {
    id: 4,
    username: "player4",
    donePlaying: false,
    score: 0
  },
  {
    id: 5,
    username: "player5",
    donePlaying: false,
    score: 0
  },
  {
    id: 6,
    username: "player6",
    donePlaying: false,
    score: 0
  }
];

const ExistingLobby = ({ navigation, route }: any) => {
  const [players, setPlayers] = useState<any>([]);

  useEffect(() => {
    setPlayers(tempData);
  }, []);

  const handleSubmit = () => {
    console.log("Joining lobby with code:");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join Existing Lobby</Text>

      <View style={styles.codeContainer}>
        <Text style={styles.codeText}>Code: ddddd</Text>
      </View>

      <View style={styles.playerList}>
        <ScrollView contentContainerStyle={styles.tableContainer}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.headerCell}>Lobby</Text>
            </View>
            {players.map((player: any) => (
              <View key={player.id} style={styles.tableRow}>
                <Text style={styles.cell}>{player.username}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Start Game</Text>
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
    paddingHorizontal: 20
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#34C759"
  },
  codeContainer: {
    backgroundColor: "#EAF6E9",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#34C759"
  },
  codeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#34C759"
  },
  playerList: {
    width: "100%",
    marginBottom: 20
  },
  playerListTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#34C759"
  },
  tableContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  table: {
    borderWidth: 1,
    borderColor: "#34C759",
    marginBottom: 20,
    borderRadius: 8,
    overflow: "hidden",
    width: "80%"
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#34C759",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  headerCell: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    color: "#34C759",
    fontSize: 18
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 16
  },
  button: {
    backgroundColor: "#34C759",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  }
});

export default ExistingLobby;
