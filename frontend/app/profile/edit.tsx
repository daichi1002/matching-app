import { User } from "@/types";
import { Stack, useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function EditProfileScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ user: string }>();
  const user: User = JSON.parse(params.user);
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);

  const handleSave = () => {
    // 必要に応じて保存処理を実装
    alert("プロフィールを保存しました！");
    router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                プロフィールの編集
              </Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.saveButtonText}>完了</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.container}>
        <Text style={styles.label}>名前</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="名前を入力"
        />

        <Text style={styles.label}>年齢</Text>
        <TextInput
          style={styles.input}
          value={age.toString()}
          onChangeText={(text) => setAge(Number(text))}
          placeholder="年齢を入力"
          keyboardType="numeric"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FF69B4",
    fontWeight: "bold",
    fontSize: 16,
  },
});
