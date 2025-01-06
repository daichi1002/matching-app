import { Card } from "@/types";
import { Image, StyleSheet, View } from "react-native";

export default function CardComponent({ card }: { card: Card }) {
  return (
    <View style={styles.card}>
      <Image source={card.image} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 2 / 3,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
