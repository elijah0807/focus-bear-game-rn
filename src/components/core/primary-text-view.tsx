import React from "react";
import { Text, View } from "react-native";

type Props = {
  text: string;
  color?: string;
  className?: string;
  textClassName?: string;
};

export default function PrimaryTextView({
  text,
  color,
  className,
  textClassName,
}: Props) {
  return (
    <View
      className={`${color ? `${color}` : "bg-primary"} p-2 rounded-md shadow-md ${className}`}
    >
      <Text className={`text-black text-xs font-bold ${textClassName}`}>
        {text}
      </Text>
    </View>
  );
}
