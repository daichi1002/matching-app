import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import ImageViewer from "@/components/ImageViewer";

const user = {
  id: 1,
  name: "佐藤",
  age: 24,
  image: require("@/assets/images/woman2.jpg"),
};

export default function UserScreen() {
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
    alert("Settings button pressed");
  };

  const handleEdit = () => {
    alert("Edit button pressed");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer imgSource={user.image} selectedImage={selectedImage} />
          <Text style={styles.userText}>
            {user.name}, {user.age}
          </Text>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.roundButton} onPress={handleSettings}>
            <Ionicons name="settings" size={30} color="#d3d3d3" />
            <Text style={styles.buttonText}>設定</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.roundButton} onPress={pickImageAsync}>
            <Ionicons name="camera" size={30} color="#d3d3d3" />
            <Text style={styles.buttonText}>写真の追加</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.roundButton} onPress={handleEdit}>
            <Ionicons name="pencil" size={30} color="#d3d3d3" />
            <Text style={styles.buttonText}>編集</Text>
          </TouchableOpacity>
        </View>
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
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    position: "absolute", // 画像の周りにボタンを配置
    bottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly", // ボタン間隔を均等に配置
    alignItems: "center",
    width: "80%", // ボタンの幅を調整
    paddingHorizontal: 20,
  },
  roundButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 80,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#d3d3d3", // テキストの色を白に変更
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5, // アイコンとテキストの間隔を調整
  },
  userText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
