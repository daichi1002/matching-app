// app/chat/[id].tsx

import { Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Message {
  id: number;
  text: string;
  sender: "user" | "other";
  timestamp: string;
}

const ChatDetailScreen = () => {
  const { id, name, image } = useLocalSearchParams();
  const imageSource = image as ImageSourcePropType;
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "こんにちは！", sender: "other", timestamp: "10:00" },
    { id: 2, text: "はじめまして！", sender: "user", timestamp: "10:01" },
    {
      id: 3,
      text: "今日はいい天気ですね。",
      sender: "other",
      timestamp: "10:02",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const reversedMessages = [...messages].reverse();
  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputText,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setInputText("");
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={imageSource} style={styles.headerImage} />
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{name}</Text>
            </View>
          ),
        }}
      />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS用にパディングを設定
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0} // ヘッダーの高さを考慮
      >
        <FlatList
          data={reversedMessages}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          inverted={true}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageContainer,
                item.sender === "user"
                  ? styles.userContainer
                  : styles.otherContainer,
              ]}
            >
              {item.sender === "other" && (
                <Image
                  source={imageSource}
                  style={styles.profileImage} // 他ユーザーの場合の画像
                />
              )}
              <View
                style={[
                  styles.messageBubble,
                  item.sender === "user"
                    ? styles.userMessage
                    : styles.otherMessage,
                ]}
              >
                <Text style={styles.messageText}>{item.text}</Text>
                <Text style={styles.timestamp}>{item.timestamp}</Text>
              </View>
            </View>
          )}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="メッセージを入力..."
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>送信</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingBottom: Platform.OS === "ios" ? 20 : 10, // iOSの場合は余白を追加
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center", // 中央揃えで高さを統一
    marginVertical: 5,
    marginHorizontal: 10,
  },
  userContainer: {
    justifyContent: "flex-end",
  },
  otherContainer: {
    justifyContent: "flex-start",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10, // メッセージとの間隔を確保
  },
  messageBubble: {
    maxWidth: "70%",
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#dcf8c6",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
    alignSelf: "flex-end",
    marginTop: 5,
  },
});

export default ChatDetailScreen;
