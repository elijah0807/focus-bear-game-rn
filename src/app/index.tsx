import CustomButton from "@/components/buttons/custom-button";
import ChatBubble from "@/components/core/ChatBubble";
import { useTaskGeneration } from "@/hooks/useTaskGeneration";
import { useAppSelector } from "@/store/hooks";
import { capitalizeFirstLetterOnly } from "@/utils/stringUtils";
import { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";

export default function Index() {
  const [goal, setGoal] = useState("");
  const { error, generateTasks } = useTaskGeneration();
  const { selectedGameMode } = useAppSelector((state) => state.settings);
  const { isLoading } = useAppSelector((state) => state.loading);

  const handleGenerateTasks = async () => {
    if (!goal.trim()) {
      Alert.alert("Error", "Please enter a goal");
      return;
    }

    try {
      let response = await generateTasks({
        goal: goal.trim(),
        mode: selectedGameMode as "task" | "website",
      });

      console.log(response);
    } catch {
      Alert.alert("Error", "Failed to generate tasks");
    }
  };

  return (
    <View className="flex-1 bg-background p-4">
      <ChatBubble message="What is your main goal today?" onGotIt={() => {}} />
      <View className="my-4">
        <Text className="text-base text-secondary font-bold">
          Mode: {capitalizeFirstLetterOnly(selectedGameMode)}
        </Text>
        <TextInput
          className="bg-white border border-gray-300 p-4 rounded-2xl my-4 focus:border-primary"
          placeholder="e.g Finish microeconomics assignment"
          value={goal}
          onChangeText={setGoal}
        />
        <View className="flex-row gap-2">
          <CustomButton
            title="Generate Tasks"
            onPress={() => {
              handleGenerateTasks();
            }}
            className="flex-1"
            loading={isLoading}
            disabled={isLoading}
          />
        </View>

        {/* Error Display */}
        {error && (
          <View className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <Text className="text-red-700 font-medium">Error:</Text>
            <Text className="text-red-600">{error}</Text>
          </View>
        )}
      </View>
    </View>
  );
}
