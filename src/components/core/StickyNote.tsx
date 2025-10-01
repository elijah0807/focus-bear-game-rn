import { AnsweredTask } from "@/store/slices/scoreSlice";
import { Task } from "@/types/api";
import React, { useRef } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import TaskNotation from "./TaskNotation";

type Props = {
  task: Task;
  isActive: boolean;
  onPress: () => void;
  onCurrentGoalPress: () => void;
  onNextTaskPress: () => void;
  onAfterWorkPress: () => void;
  hasBeenAnswered: boolean;
  answeredTask: AnsweredTask | null;
};

export default function StickyNote({
  task,
  isActive,
  onPress,
  onCurrentGoalPress,
  onNextTaskPress,
  onAfterWorkPress,
  hasBeenAnswered,
  answeredTask,
}: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.98)).current;

  const handlePress = () => {
    const toValue = !isActive ? 1 : 0;
    const scaleValue = !isActive ? 1 : 0.98;

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
  };

  return (
    <TouchableOpacity
      onPress={
        hasBeenAnswered
          ? undefined
          : () => {
              onPress();
              handlePress();
            }
      }
      activeOpacity={0.8}
      className={`w-full my-2 ${hasBeenAnswered ? "opacity-50" : ""}`}
    >
      <Animated.View
        className="bg-[#fef9c3] p-5 rounded-md relative border-[#ffef99] border-2 shadow-xs"
        style={{
          transform: [{ scale: scaleAnim }],
        }}
      >
        <View className="flex-col">
          <Text className="text-base text-gray-600 font-semibold">
            {task.text}
          </Text>
          {hasBeenAnswered && (
            <View className="flex-row gap-2 mt-2 justify-between">
              <Text
                className={`text-sm ${answeredTask?.selectedBucket === task.correctBucket ? "text-green-600" : "text-gray-600"}`}
              >
                Sorted: {answeredTask?.selectedBucket}
              </Text>
              {answeredTask?.selectedBucket !== task.correctBucket && (
                <Text className={`text-sm text-red-600`}>
                  Correct: {task.correctBucket}
                </Text>
              )}
            </View>
          )}
          {isActive && !hasBeenAnswered && (
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
                onPress={hasBeenAnswered ? () => {} : onCurrentGoalPress}
              />
              <TaskNotation
                label="Next Task"
                color="#f6a900"
                onPress={hasBeenAnswered ? () => {} : onNextTaskPress}
              />
              <TaskNotation
                label="After Work"
                color="#e45850"
                onPress={hasBeenAnswered ? () => {} : onAfterWorkPress}
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
