import DefaultAppBar from "@/components/core/AppBar";
// import LoadingOverlay from "@/components/core/LoadingOverlay";
import { persistor, store } from "@/store";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "../../global.css";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View className="flex-1 bg-background">
          <StatusBar style="dark" backgroundColor="#e7f3ff" />
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                headerStyle: { backgroundColor: "#e7f3ff" },
                headerTitleStyle: { fontWeight: "bold", color: "#fff" },
                headerShown: true,
                header(props) {
                  return (
                    <DefaultAppBar title="Sort tasks to train your focus" />
                  );
                },
              }}
            />
            <Stack.Screen
              name="tasks"
              options={{
                headerStyle: { backgroundColor: "#e7f3ff" },
                headerTitleStyle: { fontWeight: "bold", color: "#fff" },
                headerShown: true,
                header(props) {
                  return (
                    <DefaultAppBar
                      title="Drag sticky notes into buckes"
                      disableSettings={true}
                    />
                  );
                },
              }}
            />
            <Stack.Screen
              name="task-result"
              options={{
                headerStyle: { backgroundColor: "#e7f3ff" },
                headerTitleStyle: { fontWeight: "bold", color: "#fff" },
                headerShown: true,
                header(props) {
                  return (
                    <DefaultAppBar
                      title="Great focus!"
                      disableSettings={true}
                    />
                  );
                },
              }}
            />
            <Stack.Screen
              name="settings"
              options={{
                headerShown: true,
                headerStyle: { backgroundColor: "#e7f3ff" },
                headerTitleStyle: { fontWeight: "bold", color: "#fff" },
                header(props) {
                  return <DefaultAppBar title="Sounds and History" />;
                },
              }}
            />
          </Stack>
          {/* <LoadingOverlay /> */}
        </View>
      </PersistGate>
    </Provider>
  );
}
