import React from "react";
import { Text, TouchableOpacity } from "react-native";

type Props = {
  label: string;
  color: string;
  onPress: () => void;
};
export default function TaskNotation({ label, color, onPress }: Props) {
  return (
    <TouchableOpacity
      className={`p-0.5`}
      onPress={onPress}
      style={{ backgroundColor: color }}
    >
      <Text className="text-black text-xs">{label}</Text>
    </TouchableOpacity>
  );
}
