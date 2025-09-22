import React, { useRef, useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import TaskNotation from "./task-notation";

type Props = {
  text: string;
};

export default function StickyNote({ text }: Props) {
  const [showNotes, setShowNotes] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.98)).current;

  const handleShowNotes = () => {
    const toValue = !showNotes ? 1 : 0;
    const scaleValue = !showNotes ? 1 : 0.98;

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: scaleValue,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    setShowNotes(!showNotes);
  };

  return (
    <TouchableOpacity
      onPress={handleShowNotes}
      activeOpacity={0.8}
      className="w-full my-2"
    >
      <Animated.View
        className="bg-[#fef9c3] p-5 rounded-md relative border-[#ffef99] border-2 shadow-xs"
        style={{
          transform: [{ scale: scaleAnim }],
        }}
      >
        <View className="flex-col">
          <Text className="text-base text-gray-600 font-semibold">{text}</Text>
          {showNotes && (
            <Animated.View
              className="flex-row gap-2"
              style={{
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              }}
            >
              <TaskNotation
                label="Current Goal"
                color="#2ba59a"
                onPress={() => {}}
              />
              <TaskNotation
                label="Next Task"
                color="#f6a900"
                onPress={() => {}}
              />
              <TaskNotation
                label="After Work"
                color="#e45850"
                onPress={() => {}}
              />
            </Animated.View>
          )}
        </View>
        <View className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-r-[30px] border-t-transparent border-r-[#fef9c3] rotate-90 shadow-sm" />
        <View className="absolute top-0 right-0 w-0 h-0 bg-transparent border-t-[30px] border-r-[30px] border-t-transparent border-r-[#f0f0f0] -rotate-90" />
      </Animated.View>
    </TouchableOpacity>
  );
}

{
  /* <CircleSmile color="#2ba59a" label="Current Goal" />
<CircleSmile color="#f6a900" label="Next Task" />
<CircleSmile color="#e45850" label="After Work" /> */
}
