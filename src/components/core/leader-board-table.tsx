import { useAppSelector } from "@/store/hooks";
import React from "react";
import { Text, View } from "react-native";

const LeaderboardTable = () => {
  const entries = useAppSelector((state) => state.leaderboard.entries);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
  };

  // If no entries, show empty state
  if (entries.length === 0) {
    return (
      <View className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden my-3 p-6">
        <Text className="text-center text-gray-500 text-lg">
          No leaderboard entries yet. Complete some tasks to see your progress!
        </Text>
      </View>
    );
  }

  return (
    <View className="bg-white rounded-xl shadow-lg  border border-gray-200 overflow-hidden my-3">
      <View className="flex-row items-center py-4 border-b-2 border-gray-200">
        <Text className="w-[10%] text-center font-bold text-tertiary">#</Text>
        <Text className="w-[25%] text-left font-bold text-tertiary">User</Text>
        <Text className="w-[15%] text-center font-bold text-tertiary">
          Points
        </Text>
        <Text className="w-[15%] text-center text-sm font-bold text-tertiary">
          Acc%
        </Text>
        <Text className="w-[15%] text-center text-sm  font-bold text-tertiary">
          Mode
        </Text>
        <Text className="w-[20%] text-center text-sm  font-bold text-tertiary">
          Date
        </Text>
      </View>

      {/* Table Rows */}
      {entries.map((entry, index) => (
        <View
          key={entry.id}
          className={`flex-row items-center py-3 border-b border-gray-100 ${
            index === 0 ? "bg-[#fff7e6]" : "bg-white"
          }`}
        >
          <Text className="w-[10%] text-center text-sm  text-gray-800 font-semibold">
            {index + 1}
          </Text>
          <Text className="w-[25%] text-left text-sm  text-gray-800 font-bold">
            {entry.username}
          </Text>
          <Text className="w-[15%] text-center text-sm  text-gray-800 font-bold">
            {entry.score}
          </Text>
          <Text className="w-[15%] text-center text-sm  text-gray-800 font-bold">
            {Math.round(entry.accuracy * 100)}%
          </Text>
          <Text className="w-[15%] text-center text-sm  text-gray-800 font-semibold">
            {entry.gameMode === "task" ? "Task" : "Website"}
          </Text>
          <Text className="w-[20%] text-center text-sm  text-gray-800 font-semibold">
            {formatDate(entry.date)}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default LeaderboardTable;
