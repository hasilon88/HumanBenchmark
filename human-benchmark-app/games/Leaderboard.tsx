import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Pressable, View, FlatList } from "react-native";
import * as API from "../api";
import { BASE_PATH } from "../api/base";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export type LeaderBoardLogDTO = {
  deviceName: string;
  sessionCode: string;
};

const Leaderboard = ({ navigation, route }: any) => {
  const { username, sessionCode, stompClient } = route.params;

  const [numPlayersFinished, setNumPlayersFinished] = useState(0);
  const [players, setPlayers] = useState<API.LeaderBoardLogViewModel[]>();
  const [stompClientState, setStompClient] = useState<Client>();
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    const initWebSocket = async () => {


      var brokerUrl = BASE_PATH + "/ws";
      const lobbyClient = new API.LobbyControllerApi();
      const client = new Client({
        brokerURL: brokerUrl,
        webSocketFactory: function () {
          return new SockJS(brokerUrl);
        },
      });

      await lobbyClient.getCurrentSession(sessionCode, numPlayersFinished)
        .then((res) => {
          setPlayers(res.data)
        })
        .catch((e) => {
          alert(e);
        });


      

      client.onConnect = () => {
        console.log("Connected to WebSocket");

        client.subscribe(`/topic/leaderboard`, (message) => {
          const receivedMessage = JSON.parse(message.body);
          console.log("Received message:", receivedMessage);
          console.log(players);
          messageCallback(receivedMessage);
        });
      };

      client.activate();
      setStompClient(client);
    };

    initWebSocket();
  }, [sessionCode]);

  const messageCallback = (message: LeaderBoardLogViewModel) => {

  };

  const sendMessage = (dto: LeaderBoardLogDTO) => {
    stompClientState?.publish({
      destination: `/app/leaderboard`,
      body: JSON.stringify(dto)
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <FlatList
        data={players}
        keyExtractor={(item) => item.id}
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
            {gameComplete ? "The game is now over" : "Not all players are done"}
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
    backgroundColor: '#ffdddd',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  cardText: {
    fontSize: 18,
    color: '#333',
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
