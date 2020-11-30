import React, { useState, useRef, useEffect } from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import DefaultStyles from "../constants/default-styles";
import MainButton from "../components/MainButton";
import { Ionicons } from "@expo/vector-icons";
import BodyText from "../components/BodyText";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (value, numOfRound) => (
  <View key={value} style={styles.gameScreen__listItem}>
    <BodyText>#{numOfRound}</BodyText>
    <BodyText>{value}</BodyText>
  </View>
);

const GameScreen = (props) => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie !", "You know that this is wrong...", [
        {
          text: "Sorry !",
          style: "cancel",
        },
      ]);
      return;
    }

    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    // setRounds((curRounds) => curRounds + 1);
    setPastGuesses((curPastGuesses) => [nextNumber, ...curPastGuesses]);
  };

  return (
    <View style={styles.gameScreen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.gameScreen__buttonContainer}>
        <MainButton
          style={styles.gameScreen__button}
          onPress={nextGuessHandler.bind(this, "lower")}
        >
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton
          style={styles.gameScreen__button}
          onPress={nextGuessHandler.bind(this, "higher")}
        >
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.gameScreen__listContainer}>
        <ScrollView contentContainerStyle={styles.gameScreen__list}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  gameScreen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  gameScreen__buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 400,
    maxWidth: "90%",
  },
  gameScreen__listContainer: {
    flex: 1,
    width: "80%",
  },
  gameScreen__list: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  gameScreen__listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    width: "60%",
  },
});
