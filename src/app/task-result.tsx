import CustomButton from "@/components/buttons/custom-button";
import LeaderboardTable from "@/components/core/leader-board-table";
import PrimaryTextView from "@/components/core/primary-text-view";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Image, Text, View } from "react-native";

export default function TaskResult() {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createBounceAnimation = () => {
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Repeat the animation after a delay
        setTimeout(createBounceAnimation, 2000);
      });
    };

    createBounceAnimation();
  }, [bounceAnim]);

  return (
    <View className="flex-1 bg-background p-4">
      <View className="flex-row flex-wrap w-full items-start justify-center gap-2">
        <Image
          source={require("../../assets/images/logo.png")}
          className="w-14 h-14 flex-shrink-0"
          resizeMode="contain"
        />
        <Text className="text-5xl  text-secondary font-bold">7/8 correct</Text>
        <View className="flex-row w-full justify-center gap-2 mb-4">
          <PrimaryTextView
            text="Accuracy: 100%"
            textClassName="text-lg"
            className="bg-[#f9c96b] shadow-none"
          />
          <PrimaryTextView
            text="Points: 0"
            color="bg-"
            textClassName="text-lg"
          />
        </View>
        <View className="flex-row w-full justify-center gap-4 mt-4">
          <PrimaryTextView
            text="Mode: Task Mode"
            className="bg-white shadow-sm"
            textClassName="text-lg"
          />
          <Animated.View
            style={{
              transform: [{ translateY: bounceAnim }],
            }}
          >
            <PrimaryTextView
              text="🎉 New High Score!"
              color="bg-green-500 border-none shadow-none"
              textClassName="text-lg text-white"
            />
          </Animated.View>
        </View>
      </View>
      <Text className="text-lg text-start text-tertiary font-bold mt-2">
        Leaderboard
      </Text>
      <LeaderboardTable />
      <CustomButton
        title="Start New Goal"
        className="w-full"
        onPress={() => router.push("/")}
      />
    </View>
  );
}
