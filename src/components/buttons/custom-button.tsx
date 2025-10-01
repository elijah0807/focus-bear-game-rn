import React from "react";
import { ActivityIndicator, Pressable, Text, ViewProps } from "react-native";

type Props = {
  title: string;
  className?: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
} & ViewProps;

export default function CustomButton({
  title,
  className = "",
  onPress,
  icon,
  loading = false,
  disabled = false,
  ...props
}: Props) {
  const isDisabled = disabled || loading;

  const getButtonStyles = () => {
    let baseStyles =
      "bg-primary rounded-md p-2 items-center justify-center flex-row";

    if (isDisabled) {
      baseStyles += " opacity-50";
    }

    return `${baseStyles} ${className}`;
  };

  const getTextStyles = () => {
    let baseStyles = "font-bold text-sm py-2 px-1";

    if (isDisabled) {
      baseStyles += " text-gray-500";
    } else {
      baseStyles += " text-black";
    }

    return baseStyles;
  };

  return (
    <Pressable
      onPress={isDisabled ? undefined : onPress}
      className={getButtonStyles()}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={isDisabled ? "#9CA3AF" : "#000000"}
          className="mr-2"
        />
      )}
      {!loading && icon}
      <Text className={getTextStyles()}>{loading ? "Loading..." : title}</Text>
    </Pressable>
  );
}
