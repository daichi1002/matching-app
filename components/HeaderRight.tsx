import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function HeaderRightComponent() {
  return (
    <TouchableOpacity onPress={() => alert("Notifications")}>
      <Ionicons name="notifications-outline" size={24} color="#a9a9a9" />
    </TouchableOpacity>
  );
}
