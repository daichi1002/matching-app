import { Card } from "@/types";
import { Image, StyleSheet, View } from "react-native";

export const CardComponent = ({ card }: { card: Card }) => (
  <View style={styles.card}>
    <Image source={card.image} style={styles.image} />
  </View>
);

const styles = StyleSheet.create({
  card: {
    flex: 2 / 3,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
