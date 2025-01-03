import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const messages = [
  {
    id: 1,
    name: "田中さん",
    message: "こんにちは！",
    image: require("@/assets/images/woman1.jpg"),
  },
  {
    id: 2,
    name: "佐藤さん",
    message: "今日の予定はどう？",
    image: require("@/assets/images/woman2.jpg"),
  },
  {
    id: 3,
    name: "鈴木さん",
    message:
      "来週お会いできるのを楽しみにしています！これからもよろしくおねがします！",
    image: require("@/assets/images/woman3.jpg"),
  },
  {
    id: 4,
    name: "山田さん",
    message: "さっきの件、確認しました！",
    image: require("@/assets/images/woman4.jpg"),
  },
  {
    id: 5,
    name: "高橋さん",
    message: "よろしくお願いします！",
    image: require("@/assets/images/woman5.jpg"),
  },
];

export default function ChatsScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text style={styles.titleText}>新しいマッチ</Text>
        <ScrollView
          style={styles.scrollContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {messages.map((item) => {
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.messageItem}
                onPress={() =>
                  router.push({
                    pathname: `/chats/[id]`,
                    params: {
                      id: item.id,
                      name: item.name,
                      image: item.image,
                    },
                  })
                }
              >
                <Image key={item.id} source={item.image} style={styles.image} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.messageContainer}>
        <Text style={styles.titleText}>メッセージ</Text>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id} // ここにキーを追加
              style={styles.messageItem}
              onPress={() =>
                router.push({
                  pathname: `/chats/[id]`,
                  params: {
                    id: item.id,
                    name: item.name,
                    image: item.image,
                  },
                })
              }
            >
              <View style={styles.messageItem}>
                <Image source={item.image} style={styles.messageImage} />
                <View style={styles.messageContent}>
                  <Text style={styles.messageName}>{item.name}</Text>
                  <Text
                    style={styles.messageText}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.message}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  rowContainer: {
    padding: 20,
  },
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  scrollContainer: {
    marginVertical: 16,
  },
  image: {
    width: 80,
    height: 100,
    resizeMode: "cover",
    borderRadius: 5,
    marginRight: 10,
  },
  messageContainer: {
    flex: 1, // 縦方向の残りのスペースを占有
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  messageItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  messageImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  messageContent: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
  },
  messageName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  messageText: {
    fontSize: 14,
    color: "#555",
  },
});
