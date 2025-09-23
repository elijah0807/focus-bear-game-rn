import TaskGenerator from "@/components/TaskGenerator";
import DefaultAppBar from "@/components/core/app-bar";
import { Stack } from "expo-router";

export default function TaskGeneratorScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#e7f3ff" },
          headerTitleStyle: { fontWeight: "bold", color: "#fff" },
          header() {
            return <DefaultAppBar title="Task Generator" />;
          },
        }}
      />
      <TaskGenerator />
    </>
  );
}
