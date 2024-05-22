import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

const NumberMemoryInput = ({ navigation, route }: any) => {
    const { username, sessionCode, stompClient } = route.params;
    const [level, setLevel] = useState(route.params.level);
    const [randNumber, setRandNumber] = useState(route.params.randomNumber);

    const [userEntry, setUserEntry] = useState('');

    const handleValidation = () => {
        navigation.navigate("Number Memory Validate", {level: level, randomNumber: randNumber, userEntry: parseInt(userEntry),  username, sessionCode, stompClient});
    }

    return (
        <View style={styles.container}>
            <View style={styles.upperSection}>
                <Text style={styles.levelText}>Level {level}</Text>
                <Text style={styles.instructionText}>Please enter the number on the previous screen</Text>
                <TextInput
                    onChangeText={(text) => setUserEntry(text)}
                    value={userEntry}
                    placeholder="Enter the number"
                    keyboardType="numeric"
                    style={styles.input}
                />
                <Pressable
                    style={styles.submitButton}
                    onPress={handleValidation}
                >
                    <Text style={styles.buttonText}>Submit</Text>
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
    upperSection: {
        alignItems: 'center',
        marginBottom: 40,
    },
    levelText: {
        fontSize: 30,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    instructionText: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginTop: 20,
        marginBottom: 20,
        width: '80%',
        fontSize: 18,
    },
    submitButton: {
        backgroundColor: '#2196F3',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default NumberMemoryInput;
