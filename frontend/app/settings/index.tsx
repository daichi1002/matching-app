import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SettingsScreen() {
  const router = useRouter();
  const [distance, setDistance] = useState<number>(50); // 距離（km）
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 30]); // 年齢範囲
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isProfilePublic, setIsProfilePublic] = useState(true);

  const handleSave = () => {
    // 必要に応じて保存処理を実装
    Alert.alert("設定を保存しました！");
    router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>設定</Text>
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
        <View style={styles.settinglider}>
          <Text style={styles.label}>距離: {distance}km</Text>
          <View style={styles.sliderContainer}>
            <MultiSlider
              values={[distance]}
              onValuesChange={(values) => setDistance(values[0])}
              min={1}
              max={100}
              step={1}
              selectedStyle={styles.selectedTrack}
              unselectedStyle={styles.unselectedTrack}
              markerStyle={styles.marker}
            />
          </View>
        </View>

        <View style={styles.settinglider}>
          <Text style={styles.label}>
            年齢の範囲: {ageRange[0]}歳 - {ageRange[1]}歳
          </Text>
          <View style={styles.sliderContainer}>
            <MultiSlider
              values={[ageRange[0], ageRange[1]]}
              onValuesChange={(values) => setAgeRange([values[0], values[1]])}
              min={18}
              max={80}
              step={1}
              selectedStyle={styles.selectedTrack}
              unselectedStyle={styles.unselectedTrack}
              markerStyle={styles.marker}
            />
          </View>
        </View>

        {/* 通知設定 */}
        <View style={styles.setting}>
          <Text style={styles.label}>通知を有効にする</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={(value) => setNotificationsEnabled(value)}
            trackColor={{ false: "#d3d3d3", true: "#FF69B4" }}
            thumbColor={isProfilePublic ? "#fff" : "#fff"}
          />
        </View>

        {/* プロフィール公開設定 */}
        <View style={styles.setting}>
          <Text style={styles.label}>プロフィールを公開する</Text>
          <Switch
            value={isProfilePublic}
            onValueChange={(value) => setIsProfilePublic(value)}
            trackColor={{ false: "#d3d3d3", true: "#FF69B4" }}
            thumbColor={isProfilePublic ? "#fff" : "#fff"}
          />
        </View>
        {/* プライバシーポリシー */}
        <View style={styles.setting}>
          <TouchableOpacity onPress={() => Alert.alert("プライバシーポリシー")}>
            <Text style={styles.link}>プライバシーポリシーを確認</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  settinglider: {
    marginBottom: 20,
  },
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sliderContainer: {
    width: "100%", // 横幅を最大化
    alignItems: "center", // スライダーを中央に配置
  },
  link: {
    color: "#007BFF",
    textDecorationLine: "underline",
  },
  saveButtonText: {
    color: "#FF69B4",
    fontWeight: "bold",
    fontSize: 16,
  },
  selectedTrack: {
    backgroundColor: "#FF69B4", // ピンク色
  },
  unselectedTrack: {
    backgroundColor: "#d3d3d3", // グレー色
  },
  marker: {
    backgroundColor: "#FFFFFF", // 白色
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
  },
});
