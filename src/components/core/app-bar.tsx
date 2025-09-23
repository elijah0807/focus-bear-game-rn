import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  title: string;
  disableSettings?: boolean;
}

export default function DefaultAppBar({
  title,
  disableSettings = false,
}: Props) {
  return (
    <SafeAreaView className="bg-[#dbe6f2]" edges={["top"]}>
      <View className="flex-row justify-between bg-[#dbe6f2] items-center p-4">
        <View className="flex-row w-1/3">
          <TouchableOpacity onPress={() => router.push("/")}>
            <Image
              source={require("../../../assets/images/logo-with-text.png")}
              className="w-36 h-10"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View className="flex-row w-1/3">
          <Text className="text-base font-medium color-secondary">{title}</Text>
        </View>
        <View className="flex-row gap-3">
          <View className="bg-white rounded-md items-center justify-center p-1.5">
            <Ionicons name="volume-high-outline" size={20} color="black" />
          </View>
          <TouchableOpacity
            className={`${disableSettings ? "opacity-50" : ""} bg-white rounded-md items-center justify-center p-1.5`}
            onPress={
              disableSettings ? undefined : () => router.push("/settings")
            }
          >
            <Ionicons name="settings-outline" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
