import LeaderboardTable from "@/components/core/leader-board-table";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Settings() {
  const [selectedSound, setSelectedSound] = useState("sine");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedGameMode, setSelectedGameMode] = useState("task");
  const [isDropdownOpenGameMode, setIsDropdownOpenGameMode] = useState(false);

  const soundOptions = [
    "sine",
    "square",
    "triangle",
    "sawtooth",
    "chime",
    "pop",
  ];

  const handleSelectSound = (sound: string) => {
    setSelectedSound(sound);
    setIsDropdownOpen(false);
  };

  const gameModeOptions = ["task", "website"];

  const handleSelectGameMode = (gameMode: string) => {
    setSelectedGameMode(gameMode);
    setIsDropdownOpenGameMode(false);
  };

  return (
    <ScrollView className="flex-1 bg-background p-4 gap-3">
      <Text className="text-lg text-start text-tertiary font-bold">
        Game mode
      </Text>
      <TouchableOpacity
        className="bg-white border border-gray-300 rounded-lg mt-2 p-3 flex-row justify-between items-center"
        onPress={() => setIsDropdownOpenGameMode(!isDropdownOpenGameMode)}
      >
        <Text className="text-base text-black">{selectedGameMode}</Text>
        <Text className="text-gray-500">
          {isDropdownOpenGameMode ? "▲" : "▼"}
        </Text>
      </TouchableOpacity>
      <View className="my-2">
        {isDropdownOpenGameMode && (
          <View className="bg-white border border-gray-300 rounded-lg mt-1 shadow-lg">
            {gameModeOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                className={`p-3 ${index !== gameModeOptions.length - 1 ? "border-b border-gray-200" : ""}`}
                onPress={() => handleSelectGameMode(option)}
              >
                <Text
                  className={`text-base ${selectedGameMode === option ? "text-primary font-semibold" : "text-black"}`}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <Text className="text-lg text-start text-tertiary font-bold my-2">
        Sounds type
      </Text>
      <TouchableOpacity
        className="bg-white border border-gray-300 rounded-lg mt-2 p-3 flex-row justify-between items-center"
        onPress={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <Text className="text-base text-black">{selectedSound}</Text>
        <Text className="text-gray-500">{isDropdownOpen ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {isDropdownOpen && (
        <View className="bg-white border border-gray-300 rounded-lg mt-1 shadow-lg">
          {soundOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              className={`p-3 ${index !== soundOptions.length - 1 ? "border-b border-gray-200" : ""}`}
              onPress={() => handleSelectSound(option)}
            >
              <Text
                className={`text-base ${selectedSound === option ? "text-primary font-semibold" : "text-black"}`}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <View className="flex-row  gap-2 mt-4 mb-2">
        <Text className="text-lg text-start text-tertiary font-bold">
          Leaderboard (Top 10)
        </Text>
        <Ionicons name="trash-outline" size={20} color="black" />
      </View>

      <LeaderboardTable />
    </ScrollView>
  );
}
