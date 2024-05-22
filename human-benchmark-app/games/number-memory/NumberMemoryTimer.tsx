import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

function generateRandomNumber(level: number) {
    return Math.floor(Math.random() * (Math.pow(10, level) - 1 + 1)) + 1;
}

const NumberMemoryTimer = ({ navigation, route }: any) => {
    const { username, sessionCode, stompClient } = route.params;

    const [level, setLevel] = useState(0);
    const [score, setScore] = useState(0);
    const [randNumber, setRandNumber] = useState(0);
    const [roundStarted, setRoundStarted] = useState(false);
    const [key, setKey] = useState(0);
    const [numberFontSize, setNumberFontSize] = useState(40);

    useEffect(() => {
        const initRound = () => {
            setRoundStarted(true);
            const newLevel = route.params.level + 1;
            setLevel(newLevel);
            setScore(route.params.score);
            setRandNumber(generateRandomNumber(newLevel));
        }

        initRound();
        setKey(prevKey => prevKey + 1);
    }, [route.params.level]);

    const handleTimerEnd = () => {
        navigation.navigate("Number Memory Game", { level: level, randomNumber: randNumber, score: score, username, sessionCode, stompClient });
        setRoundStarted(false);
    }

    return (
        <View key={key} style={styles.container}>
            <View style={styles.upperSection}>
                <Text style={styles.levelText}>Level {level}</Text>
                <Text style={styles.instructionText}>Remember the following number</Text>
            </View>
            <View style={styles.lowerSection}>
                <CountdownCircleTimer
                    isPlaying={roundStarted}
                    duration={7}
                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[7, 5, 2, 0]}
                    onComplete={handleTimerEnd}
                >
                    {({ remainingTime }) => (
                        <Text style={[styles.numberText, { fontSize: numberFontSize }]}>
                            {remainingTime > 0 ? randNumber : ''}
                        </Text>
                    )}
                </CountdownCircleTimer>
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
    lowerSection: {
        alignItems: 'center',
    },
    levelText: {
        fontSize: 30,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    instructionText: {
        fontSize: 16,
        marginBottom: 10,
    },
    numberText: {
        fontWeight: 'bold',
    },
});

export default NumberMemoryTimer;
