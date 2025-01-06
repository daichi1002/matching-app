import ImageViewer from "@/components/ImageViewer";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const user = {
  id: 1,
  name: "佐藤",
  age: 24,
  image: require("@/assets/images/woman2.jpg"),
};

export default function ProfileScreen() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );

  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef<View>(null);

  if (status === null) {
    requestPermission();
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const handleSettings = () => {
    router.push({ pathname: "/settings" });
  };

  const handleEdit = () => {
    router.push({
      pathname: "/profile/edit",
      params: { user: JSON.stringify(user) },
    });
  };
  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <ImageViewer
          imgSource={user.image} // プロフィール画像を指定
          selectedImage={selectedImage}
        />
        <Text style={styles.nameText}>
          {user.name}, {user.age}
        </Text>
        <Text style={styles.jobText}>Teaching Assistant</Text>
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSettings()}
        >
          <Ionicons name="settings-outline" size={24} color="#000" />
          <Text style={styles.buttonText}>設定</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={pickImageAsync}>
          <Ionicons name="camera-outline" size={24} color="#000" />
          <Text style={styles.buttonText}>写真の追加</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handleEdit()}>
          <Ionicons name="pencil-outline" size={24} color="#000" />
          <Text style={styles.buttonText}>プロフィール編集</Text>
        </TouchableOpacity>
      </View>

      {/* Boost Section */}
      <View style={styles.boostSection}>
        <Text style={styles.boostText}>Get Matches Faster</Text>
        <Text style={styles.subText}>Boost your profile once a week!</Text>
        <TouchableOpacity style={styles.boostButton}>
          <Text style={styles.boostButtonText}>GET CHINDER PLUS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
  },
  headerIcon: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  profileSection: {
    alignItems: "center",
    marginTop: 80,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  nameText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  jobText: {
    fontSize: 16,
    color: "#888",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    width: "100%",
  },
  button: {
    alignItems: "center",
    borderWidth: 1, // 枠線を追加
    borderColor: "#ccc", // 枠線の色
    borderRadius: 8, // 角を丸くする
    padding: 10, // 内側の余白
    marginHorizontal: 5, // ボタン間の余白
    width: 100, // ボタンの幅（調整可能）
  },
  buttonText: {
    fontSize: 12,
    marginTop: 5,
  },
  boostSection: {
    marginTop: 50,
    alignItems: "center",
  },
  boostText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 14,
    color: "#888",
    marginVertical: 10,
  },
  boostButton: {
    backgroundColor: "#ff6f61",
    padding: 10,
    borderRadius: 5,
  },
  boostButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
