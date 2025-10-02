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
import { ScrollView, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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

  // Drag and drop state
  const [isDragging, setIsDragging] = useState(false);
  const [dragOverBucket, setDragOverBucket] = useState<string | null>(null);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

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

  // Drag and drop handlers
  const handleDragStart = (task: Task) => {
    setIsDragging(true);
    setDraggedTask(task);
    setActiveTask(task);
  };

  const handleDragOver = (bucket: string | null) => {
    setDragOverBucket(bucket);
  };

  const handleDragEnd = (bucket: string) => {
    setIsDragging(false);
    setDragOverBucket(null);

    if (draggedTask) {
      if (bucket === "Current Goal") {
        handleCurrentGoalPress(draggedTask);
      } else if (bucket === "Next Task") {
        handleNextTaskPress(draggedTask);
      } else if (bucket === "After Work") {
        handleAfterWorkPress(draggedTask);
      }
    }
    setDraggedTask(null);
    setActiveTask(null);
  };

  const handleLastTaskAnswer = (currentTask: Task, selectedBucket: string) => {
    const updatedAnsweredTasksCount = answeredTasks.length + 1;

    const updatedAnsweredTasks = [
      ...answeredTasks,
      {
        task: currentTask,
        selectedBucket: selectedBucket,
      },
    ];
    const accuracy = calculateAccuracy(updatedAnsweredTasks);
    console.log("Accuracy", accuracy);
    const isCorrect = currentTask.correctBucket === selectedBucket;
    const currentAnswerScore = isCorrect ? 50 : -50;
    const updatedTotalScore = totalScore + currentAnswerScore;

    addEntry({
      score: updatedTotalScore,
      completedTasks: updatedAnsweredTasksCount,
      totalTime: 0,
      gameMode: selectedGameMode as "task" | "website",
      username: "Anonymous",
      accuracy: accuracy,
    });
    router.replace("/task-result");
  };

  return (
    <GestureHandlerRootView className="flex-1">
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
              onDragStart={() => handleDragStart(task)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
            />
          ))}
        </ScrollView>
        <View className="flex-row gap-2 bg-gray-200">
          <CircleSmile
            color="#2ba59a"
            label="Current Goal"
            isDragOver={isDragging && dragOverBucket === "Current Goal"}
          />
          <CircleSmile
            color="#f6a900"
            label="Next Task"
            isDragOver={isDragging && dragOverBucket === "Next Task"}
          />
          <CircleSmile
            color="#e45850"
            label="After Work"
            isDragOver={isDragging && dragOverBucket === "After Work"}
          />
        </View>
        {showHurray && <HurrayWinAnimation />}
      </View>
    </GestureHandlerRootView>
  );
}
