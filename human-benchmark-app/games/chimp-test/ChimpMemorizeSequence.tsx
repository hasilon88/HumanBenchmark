import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FlatGrid } from "react-native-super-grid";

const shuffle = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const ChimpMemorizeSequence = ({ navigation, route }: any) => {
  const { username, sessionCode, stompClient, score } = route.params;

  const [level, setLevel] = useState(0);
  const [items, setItems] = useState<string[]>([]);
  const [showNumber, setShowNumber] = useState(true);
  const [numberSequence, setNumberSequence] = useState(0);

  useEffect(() => {
    const tempItems = Array.from({ length: 30 }, (_, i) => "" + (i + 1));
    setItems(shuffle(tempItems));
    setNumberSequence(0);
    setShowNumber(true);
    setLevel(route.params.level + 1);
  }, [route.params.level]);

  const handlePress = (item: string) => {
    const pressedNumber = parseInt(item);
    const nextNumberSequence = numberSequence + 1;

    if (pressedNumber !== nextNumberSequence) {
      navigation.navigate("Chimp Validator", { level: level, levelSucceeded: false, username, sessionCode, stompClient, score });
    }

    if (pressedNumber === level) {
      navigation.navigate("Chimp Validator", { level: level, levelSucceeded: true, username, sessionCode, stompClient, score });
    }

    if (pressedNumber <= level) {
      setNumberSequence(nextNumberSequence);
      setShowNumber(false);
      setItems((prevItems) =>
        prevItems.map((value) => (value === item ? "" : value))
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatGrid
        itemDimension={60}
        data={items}
        style={styles.gridView}
        spacing={14}
        renderItem={({ item }) =>
          parseInt(item) <= level ? (
            <TouchableOpacity onPress={() => handlePress(item)}>
              <View style={[styles.itemContainer]}>
                <Text
                  style={[styles.itemName, { fontSize: showNumber ? 20 : 0 }]}
                >
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={[styles.itemContainer, { opacity: 0 }]}>
              <Text style={[styles.itemName, { fontSize: 0 }]}/>
            </View>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridView: {
    flex: 1,
    position: 'absolute',
    width: '100%',
  },
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderRadius: 10,
    padding: 10,
    height: 100,
    backgroundColor: "white",
  },
  itemName: {
    color: "black",
    fontWeight: "500",
  },
});

export default ChimpMemorizeSequence;