import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";

const { width, height } = Dimensions.get("window");

const HurrayWinAnimation = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [showConfetti, setShowConfetti] = useState(false);
  useEffect(() => {
    // Start the animation when the component mounts
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      // After the "Hurray!" text animation finishes, trigger the confetti
      setShowConfetti(true);
    });
  }, [animatedValue]);

  // Interpolate values for the "Hurray!" text animation
  const scaleInterpolation = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.5, 1.2, 1], // Pops in and then settles
  });

  const opacityInterpolation = animatedValue.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: [0, 1, 1],
  });

  return (
    <View style={styles.container}>
      {/* The Confetti Cannon */}
      {showConfetti && (
        <ConfettiCannon
          count={200}
          origin={{ x: width / 2, y: -20 }}
          autoStart={true}
          fadeOut
          explosionSpeed={500}
          fallSpeed={3000}
          colors={["#FFD700", "#FF4500", "#ADFF2F", "#1E90FF"]}
        />
      )}

      {/* The Animated "Hurray!" Text */}
      {/* <Animated.View
        style={[
          styles.textWrapper,
          {
            transform: [{ scale: scaleInterpolation }],
            opacity: opacityInterpolation,
          },
        ]}
      >
        <Text style={styles.text}>Hurray!</Text>
      </Animated.View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent overlay
  },
  textWrapper: {
    // Styling for the animated view
    position: "absolute",
    top: height / 2,
    left: width / 2,
    transform: [{ translateX: -120 }, { translateY: -40 }], // Center the text
  },
  text: {
    fontSize: 80,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
});

export default HurrayWinAnimation;
