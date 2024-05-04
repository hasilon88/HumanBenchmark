import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const CircleCheckAnimation = ({ showCheck }: any) => {
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animate();
  }, []);

  const animate = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false
    }).start();
  };

  const renderIcon = () => {
    if (showCheck) {
      return (
        <Svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="green" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <Path d="M20 6L9 17l-5-5" />
        </Svg>
      );
    } else {
      return (
        <Svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <Path d="M6 18L18 6M6 6l12 12" />
        </Svg>
      );
    }
  };

  const circleBorderColor = showCheck ? 'green' : 'red';

  return (
    <View style={[styles.container, { borderColor: circleBorderColor }]}>
      <View style={styles.circle}>
        <Animated.View
          style={[
            styles.check,
            {
              transform: [
                {
                  scale: scaleValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1]
                  })
                }
              ]
            }
          ]}
        >
          {renderIcon()}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 104,
    height: 104,
    borderWidth: 2,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  check: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default CircleCheckAnimation;
