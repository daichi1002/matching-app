import { HeaderRightComponent } from "@/components/HeaderRight";
import { HeaderTitleComponent } from "@/components/HeaderTitle";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerTitle: () => <HeaderTitleComponent />,
            headerRight: () => <HeaderRightComponent />,
          }}
        />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        <Stack.Screen
          name="chats/[id]"
          options={{
            headerBackTitle: "戻る",
          }}
        />
        <Stack.Screen
          name="profile/edit"
          options={{
            headerBackVisible: false,
          }}
        />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
