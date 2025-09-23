import CustomButton from "@/components/buttons/custom-button";
import LeaderboardTable from "@/components/core/leader-board-table";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearLeaderboard } from "@/store/slices/leaderboardSlice";
import {
  setSelectedGameMode,
  setSelectedSound,
  setVolume,
} from "@/store/slices/settingsSlice";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Settings() {
  const dispatch = useAppDispatch();
  const { selectedSound, selectedGameMode, volume } = useAppSelector(
    (state) => state.settings
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
    dispatch(setSelectedSound(sound));
    setIsDropdownOpen(false);
  };

  const gameModeOptions = ["task", "website"];

  const handleSelectGameMode = (gameMode: string) => {
    dispatch(setSelectedGameMode(gameMode));
    setIsDropdownOpenGameMode(false);
  };

  const handleChangeVolume = (value: number) => {
    dispatch(setVolume(value));
    console.log(value);
  };

  const handleClearLeaderboard = () => {
    Alert.alert(
      "Clear Leaderboard",
      "Are you sure you want to clear all leaderboard entries? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => dispatch(clearLeaderboard()),
        },
      ]
    );
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
        <TouchableOpacity onPress={handleClearLeaderboard}>
          <Ionicons name="trash-outline" size={20} color="black" />
        </TouchableOpacity>
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
