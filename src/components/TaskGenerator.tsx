import CustomButton from "@/components/buttons/custom-button";
import { useTaskGeneration } from "@/hooks/useTaskGeneration";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const TaskGenerator: React.FC = () => {
  const [goal, setGoal] = useState("Test math");
  const [mode, setMode] = useState<"task" | "website">("task");
  const { tasks, isLoading, error, generateTasks, clearTasks, clearError } =
    useTaskGeneration();

  const handleGenerateTasks = async () => {
    if (!goal.trim()) {
      Alert.alert("Error", "Please enter a goal");
      return;
    }

    try {
      await generateTasks({ goal: goal.trim(), mode });
    } catch {
      Alert.alert("Error", "Failed to generate tasks");
    }
  };

  const handleClearTasks = () => {
    clearTasks();
    clearError();
  };

  return (
    <ScrollView className="flex-1 p-4 bg-background">
      <Text className="text-2xl font-bold text-tertiary mb-6">
        Task Generator
      </Text>

      {/* Input Section */}
      <View className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-200">
        <Text className="text-lg font-semibold text-gray-800 mb-3">
          Generate Tasks
        </Text>

        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-2">Goal</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
            placeholder="Enter your goal (e.g., Test math)"
            value={goal}
            onChangeText={setGoal}
            multiline
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-2">Mode</Text>
          <View className="flex-row gap-2">
            <TouchableOpacity
              className={`flex-1 py-2 px-4 rounded-lg border ${
                mode === "task"
                  ? "bg-primary border-primary"
                  : "bg-white border-gray-300"
              }`}
              onPress={() => setMode("task")}
            >
              <Text
                className={`text-center font-medium ${
                  mode === "task" ? "text-white" : "text-gray-700"
                }`}
              >
                Task
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 py-2 px-4 rounded-lg border ${
                mode === "website"
                  ? "bg-primary border-primary"
                  : "bg-white border-gray-300"
              }`}
              onPress={() => setMode("website")}
            >
              <Text
                className={`text-center font-medium ${
                  mode === "website" ? "text-white" : "text-gray-700"
                }`}
              >
                Website
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row gap-2">
          <CustomButton
            title="Generate Tasks"
            onPress={handleGenerateTasks}
            loading={isLoading}
            disabled={isLoading}
            className="flex-1"
          />
          <CustomButton
            title="Clear"
            onPress={handleClearTasks}
            disabled={isLoading}
            className="flex-1 bg-gray-500"
          />
        </View>
      </View>

      {/* Error Display */}
      {error && (
        <View className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <Text className="text-red-700 font-medium">Error:</Text>
          <Text className="text-red-600">{error}</Text>
        </View>
      )}

      {/* Tasks Display */}
      {tasks.length > 0 && (
        <View className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            Generated Tasks ({tasks.length})
          </Text>

          {tasks.map((task, index) => (
            <View key={task.id} className="mb-4 p-3 bg-gray-50 rounded-lg">
              <View className="flex-row justify-between items-start mb-2">
                <Text className="text-base font-semibold text-gray-800 flex-1">
                  {task.text}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Loading State */}
      {isLoading && (
        <View className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <Text className="text-blue-700 text-center">Generating tasks...</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default TaskGenerator;
