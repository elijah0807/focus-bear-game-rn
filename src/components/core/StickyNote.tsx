import { AnsweredTask } from "@/store/slices/scoreSlice";
import { Task } from "@/types/api";
import React, { useRef } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import ReanimatedAnimated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import TaskNotation from "./TaskNotation";

// Helper function to determine bucket from position
const getBucketFromPosition = (x: number, y: number): string | null => {
  // These values are based on the layout with 3 buckets in a row
  // Each bucket is approximately 120px wide with gaps
  const screenWidth = 400; // Approximate screen width minus padding
  const bucketWidth = screenWidth / 3;

  if (x < bucketWidth) return "Current Goal";
  if (x < bucketWidth * 2) return "Next Task";
  if (x < bucketWidth * 3) return "After Work";
  return null;
};

type Props = {
  task: Task;
  isActive: boolean;
  onPress: () => void;
  onCurrentGoalPress: () => void;
  onNextTaskPress: () => void;
  onAfterWorkPress: () => void;
  hasBeenAnswered: boolean;
  answeredTask: AnsweredTask | null;
  onDragStart?: (task: Task) => void;
  onDragEnd?: (bucket: string) => void;
  onDragOver?: (bucket: string | null) => void;
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
  onDragStart,
  onDragEnd,
  onDragOver,
}: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.98)).current;

  // Drag and drop values
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

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

  // Gesture handler for drag and drop
  const onGestureEvent = (event: any) => {
    "worklet";
    translateX.value = event.nativeEvent.translationX;
    translateY.value = event.nativeEvent.translationY;

    // Check which bucket we're over during drag
    const bucket = getBucketFromPosition(
      event.nativeEvent.absoluteX,
      event.nativeEvent.absoluteY
    );
    if (onDragOver) {
      runOnJS(onDragOver)(bucket);
    }
  };

  const onHandlerStateChange = (event: any) => {
    "worklet";
    if (event.nativeEvent.state === State.BEGAN) {
      scale.value = withSpring(1.1);
      opacity.value = withSpring(0.8);
      if (onDragStart) {
        runOnJS(onDragStart)(task);
      }
    } else if (event.nativeEvent.state === State.END) {
      // Reset position
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      scale.value = withSpring(1);
      opacity.value = withSpring(1);

      // Clear drag over state
      if (onDragOver) {
        runOnJS(onDragOver)(null);
      }

      // Determine which bucket the note was dropped on based on position
      const bucket = getBucketFromPosition(
        event.nativeEvent.absoluteX,
        event.nativeEvent.absoluteY
      );
      if (bucket && onDragEnd) {
        runOnJS(onDragEnd)(bucket);
      }
    }
  };

  // Animated style for drag and drop
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
      opacity: opacity.value,
    };
  });

  return (
    <ReanimatedAnimated.View style={animatedStyle}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
        enabled={!hasBeenAnswered}
      >
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
      </PanGestureHandler>
    </ReanimatedAnimated.View>
  );
}
