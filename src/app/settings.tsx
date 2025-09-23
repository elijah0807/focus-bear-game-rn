import CustomButton from "@/components/buttons/custom-button";
import LeaderboardTable from "@/components/core/leader-board-table";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Settings() {
  const [selectedSound, setSelectedSound] = useState("sine");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedGameMode, setSelectedGameMode] = useState("task");
  const [isDropdownOpenGameMode, setIsDropdownOpenGameMode] = useState(false);
  const [volume, setVolume] = useState(0.2);

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

  const handleChangeVolume = (value: number) => {
    setVolume(value);
    console.log(value);
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
      <Text className="text-lg text-start text-tertiary font-bold my-2">
        Volume
      </Text>
      <Slider
        className="w-full"
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#0275ff"
        maximumTrackTintColor="#efefef"
        onValueChange={handleChangeVolume}
        value={volume}
      />

      <View className="flex-row  gap-2 mt-4 mb-2">
        <Text className="text-lg text-start text-tertiary font-bold">
          Leaderboard (Top 10)
        </Text>
        <Ionicons name="trash-outline" size={20} color="black" />
      </View>

      <LeaderboardTable />
      <CustomButton
        className="w-24 mt-4"
        title="Back"
        onPress={() => router.back()}
      />
    </ScrollView>
  );
}
