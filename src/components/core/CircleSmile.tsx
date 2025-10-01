import React, { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

export default function CircleSmile({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  const blinkAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const blink = () => {
      Animated.sequence([
        Animated.timing(blinkAnimation, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnimation, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Random blink interval between 2-5 seconds
        setTimeout(blink, Math.random() * 3000 + 2000);
      });
    };

    // Start blinking after initial delay
    setTimeout(blink, 1000);
  }, [blinkAnimation]);

  return (
    <View className="items-center relative">
      {/* Bear Face + Ears */}
      <Svg height="120" width="120">
        {/* Face Circle */}
        <Circle
          cx="60"
          cy="60"
          r="50"
          stroke={color}
          strokeWidth="3"
          strokeDasharray="8 6"
          fill="none"
        />
        {/* Left Ear */}
        <Circle
          cx="30"
          cy="15"
          r="8"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="3 2"
          fill="none"
        />
        {/* Right Ear */}
        <Circle
          cx="90"
          cy="15"
          r="8"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="3 2"
          fill="none"
        />
      </Svg>

      {/* Eyes */}
      <View className="absolute top-[45px] w-[50px] flex-row justify-between">
        <Animated.View
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: color,
            transform: [{ scaleY: blinkAnimation }],
          }}
        />
        <Animated.View
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: color,
            transform: [{ scaleY: blinkAnimation }],
          }}
        />
      </View>

      {/* Nose */}
      <View
        className={`absolute top-[60px] w-2 h-2 rounded-full`}
        style={{ backgroundColor: color }}
      />

      {/* Mouth */}
      <View
        className="absolute top-[75px]  w-6 h-[2px] bg-neutral-700"
        style={{ backgroundColor: color }}
      />

      {/* Label */}
      <Text className="absolute bottom-6 text-xs font-semibold text-black">
        {label}
      </Text>
    </View>
  );
}
