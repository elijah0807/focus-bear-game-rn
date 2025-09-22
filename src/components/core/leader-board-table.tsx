import React from "react";
import { Text, View } from "react-native";

const tableData = [
  {
    rank: 1,
    user: "Anonymous Bear",
    points: 650,
    acc: 88,
    mode: "Task",
    date: "9/21/2025",
  },
  {
    rank: 2,
    user: "Anonymous Bear",
    points: 270,
    acc: 50,
    mode: "Task",
    date: "9/21/2025",
  },
  {
    rank: 3,
    user: "Anonymous Bear",
    points: -126,
    acc: 13,
    mode: "Task",
    date: "9/20/2025",
  },
];

const LeaderboardTable = () => {
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
      {tableData.map((item, index) => (
        <View
          key={index}
          className={`flex-row items-center py-3 border-b border-gray-100 ${
            index === 0 ? "bg-[#fff7e6]" : "bg-white"
          }`}
        >
          <Text className="w-[10%] text-center text-sm  text-gray-800 font-semibold">
            {item.rank}
          </Text>
          <Text className="w-[25%] text-left text-sm  text-gray-800 font-bold">
            {item.user}
          </Text>
          <Text className="w-[15%] text-center text-sm  text-gray-800 font-bold">
            {item.points}
          </Text>
          <Text className="w-[15%] text-center text-sm  text-gray-800 font-bold">
            {item.acc}
          </Text>
          <Text className="w-[15%] text-center text-sm  text-gray-800 font-semibold">
            {item.mode}
          </Text>
          <Text className="w-[20%] text-center text-sm  text-gray-800 font-semibold">
            {item.date}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default LeaderboardTable;
