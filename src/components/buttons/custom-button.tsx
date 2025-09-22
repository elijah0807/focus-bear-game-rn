import React from "react";
import { Pressable, Text, ViewProps } from "react-native";

type Props = {
  title: string;
  className?: string;
  onPress?: () => void;
  icon?: React.ReactNode;
} & ViewProps;

export default function CustomButton({
  title,
  className = "",
  onPress,
  icon,
  ...props
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      className={`bg-primary rounded-md p-2 items-center justify-center flex-row ${className}`}
      {...props}
    >
      {icon}
      <Text className="text-black font-bold text-sm py-2 px-1">{title}</Text>
    </Pressable>
  );
}
