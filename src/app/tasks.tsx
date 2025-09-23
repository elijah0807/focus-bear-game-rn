import HurrayWinAnimation from "@/components/animations/hurray";
import ChatBubble from "@/components/core/chat-bubble";
import CircleSmile from "@/components/core/circle-smile";
import PrimaryTextView from "@/components/core/primary-text-view";
import StickyNote from "@/components/core/sticky-note";
import { useTaskGeneration } from "@/hooks/useTaskGeneration";
import { Task } from "@/types/api";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

export default function TaskScreen() {
  const { tasks } = useTaskGeneration();
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [showHurray, setShowHurray] = useState(false);

  const handleWin = () => {
    setShowHurray(true);
    setTimeout(() => {
      setShowHurray(false);
    }, 4000);
  };

  const handleCurrentGoalPress = (task: Task) => {
    handleWin();
  };

  return (
    <View className="flex-1 bg-background p-4 ">
      <ScrollView showsVerticalScrollIndicator={false}>
        {showHurray && <HurrayWinAnimation />}
        <ChatBubble
          message="Welcome! Drag sticky notes into buckets. Focus a note to reveal quick-send buttons."
          onGotIt={() => {}}
          showGotIt={true}
          showMode={true}
        />
        <View className="flex-row gap-6 my-4 justify-center">
          <PrimaryTextView text="Points: 0" />
          <PrimaryTextView
            text="Max Points: 0"
            color="bg-background"
            textClassName="text-base"
          />
        </View>
        {tasks.map((task, index) => (
          <StickyNote
            key={index}
            task={task}
            isActive={activeTask?.id === task.id}
            onPress={() => {
              if (activeTask?.id === task.id) {
                setActiveTask(null);
              } else {
                setActiveTask(task);
              }
            }}
            onCurrentGoalPress={() => handleCurrentGoalPress(task)}
            onNextTaskPress={() => {}}
            onAfterWorkPress={() => {}}
          />
        ))}
      </ScrollView>
      <View className="flex-row gap-2 bg-gray-200">
        <TouchableOpacity onPress={() => router.push("/task-result")}>
          <CircleSmile color="#2ba59a" label="Current Goal" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/task-result")}>
          <CircleSmile color="#f6a900" label="Next Task" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/task-result")}>
          <CircleSmile color="#e45850" label="After Work" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
