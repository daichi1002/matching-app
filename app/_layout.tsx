import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="walk-sharp" size={24} color="#FF69B4" />
                <Text
                  style={{ color: "#FF69B4", fontSize: 24, fontWeight: "bold" }}
                >
                  Chinder
                </Text>
              </View>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => alert("Notifications")}>
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="#a9a9a9"
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        <Stack.Screen
          name="chats/[id]"
          options={{
            headerBackTitle: "戻る",
          }}
        />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
