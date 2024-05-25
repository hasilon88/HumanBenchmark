import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import * as API from "../api";
import { BASE_PATH } from "../api/base";

export type LeaderBoardLogDTO = {
  deviceName: string;
  sessionCode: string;
};

const Leaderboard = ({ navigation, route }: any) => {
  const { username, sessionCode } = route.params;

  const [numPlayersFinished, setNumPlayersFinished] = useState(0);
  const [players, setPlayers] = useState<API.LeaderBoardLogViewModel[]>([]);
  const [stompClient, setStompClient] = useState<Client | null>(null);

  useEffect(() => {
    const initWebSocket = () => {
      const brokerUrl = `${BASE_PATH}/ws`;
      const client = new Client({
        brokerURL: brokerUrl,
        webSocketFactory: () => new SockJS(brokerUrl),
        onConnect: () => {
          console.log("Connected to WebSocket");
          client.subscribe("/topic/leaderboard", (message) => {
            const receivedMessage = JSON.parse(message.body);
            messageCallback(receivedMessage);
          });
        },
        onStompError: (frame) => {
          console.error("Broker reported error: " + frame.headers["message"]);
          console.error("Additional details: " + frame.body);
        },
      });

      client.activate();
      fetchInitialLeaderboard(client);
    };

    initWebSocket();
  }, []);

  const fetchInitialLeaderboard = async (client: Client) => {
    if (!stompClient) return;

    try {
      const lobbyClient = new API.LobbyControllerApi();
      const res = await lobbyClient.getCurrentSession(sessionCode, numPlayersFinished);
      setPlayers(res.data);
    } catch (error) {
      console.error("Error fetching initial leaderboard data:", error);
    }

    sendMessageWithClient({ deviceName: username, sessionCode }, client);
  };


  const messageCallback = (message: API.LeaderBoardLogViewModel) => {
    setNumPlayersFinished((prev) => prev + 1);
    setPlayers((prevPlayers) => [...prevPlayers, message]);
  };

  const sendMessage = (dto: LeaderBoardLogDTO) => {
    if (stompClient) {
      stompClient.publish({
        destination: "/app/leaderboard",
        body: JSON.stringify(dto),
      });
    } else {
      console.error("STOMP client is not initialized");
    }
  };

  const sendMessageWithClient = (dto: LeaderBoardLogDTO, client: Client) => {  
    client.publish({
      destination: "/app/leaderboard",
      body: JSON.stringify(dto),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <FlatList
        data={players}
        keyExtractor={(item) => item.deviceName ?? ""}
        renderItem={({ item, index }) => (
          <View style={styles.playerContainer}>
            <Text style={styles.position}>{index + 1}</Text>
            <Text style={styles.name}>{item.deviceName}</Text>
            <Text style={styles.score}>{item.score}</Text>
          </View>
        )}
      />
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.cardText}>
            {numPlayersFinished === players.length ? "The game is now over" : "Not all players are done"}
          </Text>
        </View>
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    padding: 20,
    backgroundColor: "#ffdddd",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  cardText: {
    fontSize: 18,
    color: "#333",
  },
  playerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  position: {
    fontSize: 18,
    fontWeight: "bold",
  },
  name: {
    fontSize: 18,
    flex: 1,
    textAlign: "center",
  },
  score: {
    fontSize: 18,
  },
});

export default Leaderboard;
