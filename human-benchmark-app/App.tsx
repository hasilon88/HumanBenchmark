import React from "react";
import Login from "./pages/Login";
import SessionManagement from "./pages/SessionManagement";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JoinLobby from "./pages/JoinLobby";
import ExistingLobby from "./pages/ExistingLobby";
import AwaitingStart from "./pages/AwaitingStart";
import NumberMemoryInstructions from "./games/number-memory/NumberMemoryInstructions";
import NummberMemoryTimer from "./games/number-memory/NumberMemoryTimer";
import NumberMemoryValidator from "./games/number-memory/NumberMemoryValidator";
import NumberMemoryInput from "./games/number-memory/NumberMemoryInput";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ExistingLobby" component={ExistingLobby} />
        <Stack.Screen name="SessionManagement" component={SessionManagement} />
        <Stack.Screen name="JoinLobby" component={JoinLobby} />
        <Stack.Screen name="Awaiting Start" component={AwaitingStart} />

        <Stack.Screen name="Number Memory Instructions" component={NumberMemoryInstructions} />
        <Stack.Screen name="Number Memory Loading" component={NummberMemoryTimer} />
        <Stack.Screen name="Number Memory Game" component={NumberMemoryInput} />
        <Stack.Screen name="Number Memory Validate" component={NumberMemoryValidator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
