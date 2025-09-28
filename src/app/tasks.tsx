import ChatBubble from "@/components/core/ChatBubble";
import CircleSmile from "@/components/core/CircleSmile";
import HurrayWinAnimation from "@/components/core/Hurray";
import PrimaryTextView from "@/components/core/PrimaryTextView";
import StickyNote from "@/components/core/StickyNote";
import { useLeaderBoard } from "@/hooks/useLeaderBoard";
import { useTaskGeneration } from "@/hooks/useTaskGeneration";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addScore } from "@/store/slices/scoreSlice";
import { Task } from "@/types/api";
import {
  calculateAccuracy,
  getAnsweredTask,
  getHighestLeaderboardScore,
  hasBeenAnswered,
} from "@/utils/generalUtils";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

export default function TaskScreen() {
  const { tasks } = useTaskGeneration();
  const { addEntry } = useLeaderBoard();
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [showHurray, setShowHurray] = useState(false);
  const { totalScore } = useAppSelector((state) => state.score);
  const [highestScore, setHighestScore] = useState(0);
  const { entries } = useAppSelector((state) => state.leaderboard);
  const dispatch = useAppDispatch();
  const { answeredTasks } = useAppSelector((state) => state.score);
  const { selectedGameMode } = useAppSelector((state) => state.settings);

  const handleWin = () => {
    setShowHurray(true);
    setTimeout(() => {
      setShowHurray(false);
    }, 4000);
  };

  useEffect(() => {
    setHighestScore(getHighestLeaderboardScore(entries));
  }, [entries]);

  const handleCurrentGoalPress = (task: Task) => {
    const selectedBucket = "Current Goal";
    handleAddScore(task.correctBucket === selectedBucket, selectedBucket, task);
  };

  const handleNextTaskPress = (task: Task) => {
    const selectedBucket = "Next Task";
    handleAddScore(task.correctBucket === selectedBucket, selectedBucket, task);
  };

  const handleAfterWorkPress = (task: Task) => {
    const selectedBucket = "After Work";
    handleAddScore(task.correctBucket === selectedBucket, selectedBucket, task);
  };

  const handleAddScore = (
    isCorrect: boolean,
    selectedBucket: string,
    task: Task
  ) => {
    dispatch(
      addScore({
        score: isCorrect ? 50 : -50,
        task: task,
        selectedBucket: selectedBucket,
      })
    );
    if (isCorrect) {
      handleWin();
    }

    // Check if this is the last task after adding the current one
    if (answeredTasks.length + 1 === tasks.length) {
      handleLastTaskAnswer(task, selectedBucket);
    }
  };

  const handleLastTaskAnswer = (currentTask: Task, selectedBucket: string) => {
    // Since we know this is the last task, use the updated count
    const updatedAnsweredTasksCount = answeredTasks.length + 1;

    // Calculate accuracy including the current answer that was just added
    const updatedAnsweredTasks = [
      ...answeredTasks,
      {
        task: currentTask,
        selectedBucket: selectedBucket,
      },
    ];
    const accuracy = calculateAccuracy(updatedAnsweredTasks);

    addEntry({
      score: totalScore,
      completedTasks: updatedAnsweredTasksCount,
      totalTime: 0,
      gameMode: selectedGameMode as "task" | "website",
      username: "Anonymous",
      accuracy: accuracy,
    });
    router.replace("/task-result");
  };

  return (
    <View className="flex-1 bg-background p-4 ">
      <ScrollView showsVerticalScrollIndicator={false}>
        <ChatBubble
          message="Welcome! Drag sticky notes into buckets. Focus a note to reveal quick-send buttons."
          onGotIt={() => {}}
          showGotIt={true}
          showMode={true}
        />
        <View className="flex-row gap-6 my-4 justify-center">
          <PrimaryTextView text={`Points: ${totalScore}`} />
          <PrimaryTextView
            text={`Max Points: ${highestScore}`}
            color="bg-background"
            textClassName="text-base"
          />
        </View>
        {tasks.map((task, index) => (
          <StickyNote
            key={index}
            task={task}
            isActive={activeTask?.id === task.id}
            answeredTask={getAnsweredTask(answeredTasks, task.id)}
            hasBeenAnswered={hasBeenAnswered(answeredTasks, task.id)}
            onPress={() => {
              if (activeTask?.id === task.id) {
                setActiveTask(null);
              } else {
                setActiveTask(task);
              }
            }}
            onCurrentGoalPress={() => handleCurrentGoalPress(task)}
            onNextTaskPress={() => handleNextTaskPress(task)}
            onAfterWorkPress={() => handleAfterWorkPress(task)}
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
      {showHurray && <HurrayWinAnimation />}
    </View>
  );
}
