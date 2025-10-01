import React from "react";
import { Dimensions } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";

const { width } = Dimensions.get("window");

export default function HurrayWinAnimation() {
  return (
    <ConfettiCannon
      count={200}
      origin={{ x: width / 2, y: -20 }}
      autoStart={true}
      fadeOut
      explosionSpeed={500}
      fallSpeed={3000}
      colors={["#FFD700", "#FF4500", "#ADFF2F", "#1E90FF"]}
    />
  );
}
