import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export const HeaderTitleComponent = () => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Ionicons name="walk-sharp" size={24} color="#FF69B4" />
      <Text style={{ color: "#FF69B4", fontSize: 24, fontWeight: "bold" }}>
        Chinder
      </Text>
    </View>
  );
};
