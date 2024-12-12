import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-deck-swiper";

const cards = [
  { id: 1, image: require("@/assets/images/background-image.png") },
  { id: 1, image: require("@/assets/images/emoji1.png") },
  { id: 2, image: require("@/assets/images/emoji2.png") },
  { id: 3, image: require("@/assets/images/emoji3.png") },
  { id: 4, image: require("@/assets/images/emoji4.png") },
];

type Card = {
  id: number;
  image: any;
};

export default function App() {
  const [cardIndex, setCardIndex] = useState<number>(0);
  let swiperRef: Swiper<Card> | null = null;

  const onSwiped = (index: number): void => {
    console.log("Card swiped:", index);
  };

  const renderCard = (card: Card): JSX.Element => {
    return (
      <View>
        <Image source={card.image} resizeMode="cover" />
      </View>
    );
  };

  const handleNope = (): void => {
    if (swiperRef) {
      swiperRef.swipeLeft();
    }
  };

  const handleLike = (): void => {
    if (swiperRef) {
      swiperRef.swipeRight();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.swiperContainer}>
        <Swiper
          ref={(ref) => (swiperRef = ref)}
          cards={cards}
          renderCard={renderCard}
          onSwiped={onSwiped}
          onSwipedAll={() => console.log("All cards swiped!")}
          cardIndex={cardIndex}
          backgroundColor={"transparent"}
          stackSize={3}
          animateCardOpacity
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  backgroundColor: "red",
                  color: "white",
                  fontSize: 24,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  marginTop: 30,
                  marginLeft: -30,
                },
              },
            },
            right: {
              title: "LIKE",
              style: {
                label: {
                  backgroundColor: "green",
                  color: "white",
                  fontSize: 24,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  marginTop: 30,
                  marginLeft: 30,
                },
              },
            },
          }}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handleNope}>
          <Ionicons name="close-circle-outline" size={60} color="red" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLike}>
          <Ionicons name="heart-circle-outline" size={60} color="green" />
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
  },
  swiperContainer: {
    flex: 1,
  },
  buttonsContainer: {
    flex: 1 / 3,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },
});
