import CustomButton from "@/components/buttons/custom-button";
import ChatBubble from "@/components/core/chat-bubble";
import { router } from "expo-router";
import { Text, TextInput, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 bg-background p-4">
      <ChatBubble message="What is your main goal today?" onGotIt={() => {}} />
      <View className="my-4">
        <Text className="text-base text-secondary font-bold">Mode: Task</Text>
        <TextInput
          className="bg-white border border-gray-300 p-4 rounded-2xl my-4 focus:border-primary"
          placeholder="e.g Finish microeconomics assignment"
        />
        <CustomButton
          title="Generate Tasks"
          onPress={() => router.push("/tasks")}
        />
      </View>
    </View>
  );
}
