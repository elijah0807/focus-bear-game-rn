import { useAppSelector } from "@/store/hooks";
import React from "react";
import { ActivityIndicator, Modal, Text, View } from "react-native";

const LoadingOverlay: React.FC = () => {
  const { isLoading, loadingMessage } = useAppSelector(
    (state) => state.loading
  );

  return (
    <Modal
      transparent
      visible={isLoading}
      animationType="fade"
      statusBarTranslucent
    >
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-white rounded-2xl p-6 items-center min-w-[200px]">
          <ActivityIndicator size="large" color="#2ba59a" />
          {loadingMessage && (
            <Text className="text-gray-700 text-base font-medium mt-4 text-center">
              {loadingMessage}
            </Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default LoadingOverlay;
