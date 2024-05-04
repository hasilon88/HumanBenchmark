import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from 'react-native';
import CircleCheckAnimation from "../../components/CircleCheckAnimation";

const NumberMemoryValidator = ({ navigation, route }: any) => {
    const { level, randomNumber, userEntry } = route.params;

    const correctNumber = (userEntry === randomNumber);

    const handleContinue = () => {
        correctNumber ? navigation.navigate("Number Memory Loading", { level }) : navigation.navigate("Login");
    }

    return (
        <View style={styles.container}>
            <View style={styles.upperSection}>
                <View style={styles.content}>
                    <Text style={styles.levelText}>Level {level}</Text>
                    <Text style={styles.instructionText}>
                        {correctNumber ? "Good Job, Keep Going!" : "Sorry, Game Over!"}
                    </Text>
                    <CircleCheckAnimation showCheck={correctNumber}/>
                    <Text style={[styles.scoreText, !correctNumber && styles.redScoreText]}>Score: 45</Text>
                    <Pressable
                        style={[styles.submitButton]}
                        onPress={handleContinue}
                    >
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    upperSection: {
        alignItems: 'center',
        marginBottom: 40,
    },
    content: {
        alignItems: 'center',
    },
    levelText: {
        fontSize: 30,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#333',
    },
    instructionText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: '#666',
    },
    scoreText: {
        fontSize: 20,
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#008000',
    },
    redScoreText: {
        color: 'red',
        marginTop: 10
    },
    submitButton: {
        backgroundColor: '#2196F3',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginTop: 1,
    },
    redButton: {
        backgroundColor: 'red',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default NumberMemoryValidator;
