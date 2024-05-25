import React from "react";
import Login from "./pages/Login";
import SessionManagement from "./pages/SessionManagement";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JoinLobby from "./pages/JoinLobby";
import ExistingLobby from "./pages/ExistingLobby";
import AwaitingStart from "./pages/AwaitingStart";
import 'text-encoding'; 

import NumberMemoryInstructions from "./games/number-memory/NumberMemoryInstructions";
import NummberMemoryTimer from "./games/number-memory/NumberMemoryTimer";
import NumberMemoryValidator from "./games/number-memory/NumberMemoryValidator";
import NumberMemoryInput from "./games/number-memory/NumberMemoryInput";
import ChimpTestInstructions from "./games/chimp-test/ChimpInstructions";
import ChimpMemorizeSequence from "./games/chimp-test/ChimpMemorizeSequence";
import ChimpValidator from "./games/chimp-test/ChimpValidator";
import Leaderboard from "./pages/Leaderboard";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SessionManagement" component={SessionManagement} />
        <Stack.Screen name="JoinLobby" component={JoinLobby} />

        {/* I do this so I can override going back button */}
        <Stack.Screen name="ExistingLobby" options={{headerLeft: (props) => {
          return <></>;
        }}} component={ExistingLobby} />
        
        <Stack.Screen name="Number Memory Instructions" component={NumberMemoryInstructions} />
        <Stack.Screen name="Number Memory Loading" component={NummberMemoryTimer} />
        <Stack.Screen name="Number Memory Game" component={NumberMemoryInput} />
        <Stack.Screen name="Number Memory Validate" component={NumberMemoryValidator} />

        <Stack.Screen name="Chimp Test Instructions" component={ChimpTestInstructions} />
        <Stack.Screen name="Chimp Memorize Sequence" component={ChimpMemorizeSequence} />
        <Stack.Screen name="Chimp Validator" component={ChimpValidator} />

        <Stack.Screen name="Leaderboard" component={Leaderboard} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}