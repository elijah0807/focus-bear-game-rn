import { useAppSelector } from "@/store/hooks";
import { capitalizeFirstLetterOnly } from "@/utils/stringUtils";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import PrimaryTextView from "./PrimaryTextView";

type Props = {
  message: string;
  onGotIt?: () => void;
  showGotIt?: boolean;
  showMode?: boolean;
};

export default function ChatBubble({
  message,
  onGotIt,
  showGotIt = false,
  showMode = false,
}: Props) {
  const { selectedGameMode } = useAppSelector((state) => state.settings);
  return (
    <View className="flex-row flex-wrap w-full items-start justify-center gap-2">
      <Image
        source={require("../../../assets/images/logo.png")}
        className="w-14 h-14 flex-shrink-0"
        resizeMode="contain"
      />
      <View className="flex-1 min-w-[80%] max-w-[85%]">
        <View className="flex-row items-start">
          <View
            className="w-0 h-0 border-t-[10px] border-t-transparent 
          border-b-[10px] border-b-transparent 
          border-r-[12px] border-r-white mr-[-1px] mt-2 flex-shrink-0"
          />
          <View className="bg-white border border-gray-300 p-4 rounded-2xl flex-1 min-w-0">
            <Text className="text-base text-black break-words">{message}</Text>
            {showGotIt && (
              <TouchableOpacity
                className="bg-background rounded-full border border-gray-300 p-2 items-center justify-center w-20 my-1"
                onPress={onGotIt}
              >
                <Text className="text-xs text-black">Got it</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      {showMode && (
        <PrimaryTextView
          text={`${capitalizeFirstLetterOnly(selectedGameMode)} Mode`}
        />
      )}
    </View>
  );
}
