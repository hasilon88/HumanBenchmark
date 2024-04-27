import React from "react";
import Login from "./pages/Login";
import SessionManagement from "./pages/SessionManagement";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JoinLobby from "./pages/JoinLobby";
import ExistingLobby from "./pages/ExistingLobby";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SessionManagement" component={SessionManagement} />
        <Stack.Screen name="JoinLobby" component={JoinLobby} />
        <Stack.Screen name="ExistingLobby" component={ExistingLobby} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
