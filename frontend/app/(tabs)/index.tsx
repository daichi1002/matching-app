import CardComponent from "@/components/Card";
import { Card } from "@/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-deck-swiper";

const cards: Card[] = [
  { id: 1, image: require("@/assets/images/woman1.jpg") },
  { id: 2, image: require("@/assets/images/woman2.jpg") },
  { id: 3, image: require("@/assets/images/woman3.jpg") },
  { id: 4, image: require("@/assets/images/woman4.jpg") },
  { id: 5, image: require("@/assets/images/woman5.jpg") },
];

export default function App() {
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [isFinished, setIsFinished] = useState(false);
  const swiperRef = useRef<Swiper<Card>>(null);

  const onSwiped = (index: number): void => {
    console.log("Card swiped:", index);
  };

  const onSwipedAll = (): void => {
    console.log("All cards swiped!");
    setIsFinished(true);
  };

  // カードをリセットする処理
  const resetCards = (): void => {
    setIsFinished(false);
    setCardIndex(0); // 最初のカードに戻す
  };

  const handleNope = (): void => {
    if (swiperRef.current) {
      swiperRef.current.swipeLeft();
    }
  };

  const handleLike = (): void => {
    if (swiperRef.current) {
      swiperRef.current.swipeRight();
    }
  };

  return (
    <View style={styles.container}>
      {isFinished ? (
        <View style={styles.finishedContainer}>
          <Ionicons name="checkmark-circle-outline" size={100} color="green" />
          <TouchableOpacity onPress={resetCards} style={styles.resetButton}>
            <Ionicons name="refresh-circle-outline" size={60} color="blue" />
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.swiperContainer}>
            <Swiper
              ref={swiperRef}
              cards={cards}
              renderCard={(card) => <CardComponent card={card} />}
              onSwiped={onSwiped}
              onSwipedAll={onSwipedAll}
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
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    zIndex: -1,
  },
  swiperContainer: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 20,
    zIndex: 10,
  },
  finishedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  resetButton: {
    marginTop: 20,
  },
});
