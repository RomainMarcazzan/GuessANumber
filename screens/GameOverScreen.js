import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from "react-native";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import Colors from "../constants/colors";
import MainButton from "../components/MainButton";

const GameOverScreen = (props) => {
  return (
    <ScrollView>
      <View style={styles.gameOverScreen__screen}>
        <TitleText>The Game is Over !</TitleText>
        <View style={styles.gameOverScreen__imageContainer}>
          <Image
            // fadeDuration={300}
            // source={{uri: "http..."}}
            source={require("../assets/success.png")}
            style={styles.gameOverScreen__image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.gameOverScreen__resultContainer}>
          <BodyText style={styles.gameOverScreen__resultText}>
            Your phone needed {""}
            <Text style={styles.gameOverScreen__highlight}>
              {props.roundsNumber}
            </Text>{" "}
            rounds to guess the number {""}
            <Text style={styles.gameOverScreen__highlight}>
              {props.userNumber}
            </Text>
          </BodyText>
        </View>
        <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
      </View>
    </ScrollView>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  gameOverScreen__screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gameOverScreen__imageContainer: {
    marginVertical: Dimensions.get("window").height / 30,
    overflow: "hidden",
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderWidth: 3,
    borderColor: "black",
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
  },
  gameOverScreen__image: {
    width: "100%",
    height: "100%",
  },
  gameOverScreen__highlight: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
  },
  gameOverScreen__resultContainer: {
    marginHorizontal: 30,
    marginVertical: Dimensions.get("window").height / 60,
  },
  gameOverScreen__resultText: {
    textAlign: "center",
    fontSize: Dimensions.get("window").height < 400 ? 16 : 20,
  },
});
