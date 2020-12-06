import React, { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import Colors from "../constants/colors";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get("window").width / 4
  );

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get("window").width / 4);
    };

    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetHandler = () => {
    setEnteredValue("");
  };

  const confirmInputHandler = () => {
    const chosenNumer = parseInt(enteredValue);
    if (isNaN(chosenNumer) || chosenNumer <= 0 || chosenNumer > 99) {
      Alert.alert(
        "Invalid number !",
        "Number has to be a number between 1 and 99",
        [{ text: "Ok", style: "destructive", onPress: resetHandler }]
      );
      return;
    }

    setConfirmed(true);
    setSelectedNumber(chosenNumer);
    setEnteredValue("");
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.startGameScreen__summaryContainer}>
        <BodyText>You selected</BodyText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton
          onPress={() => {
            props.onStartGame(selectedNumber);
          }}
        >
          START GAME
        </MainButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={10}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.startGameScreen}>
            <TitleText style={styles.startGameScreen__title}>
              Start a new Game!
            </TitleText>
            <Card style={styles.startGameScreen__inputContainer}>
              <BodyText>Select a number</BodyText>
              <Input
                style={styles.startGameScreen__input}
                keyboardType="number-pad"
                maxLength={2}
                blurOnSubmit
                onChangeText={numberInputHandler}
                value={enteredValue}
              />
              <View style={styles.startGameScreen__buttonContainer}>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Reset"
                    color={Colors.accent}
                    onPress={resetHandler}
                  />
                </View>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Confirm"
                    onPress={confirmInputHandler}
                    color={Colors.primary}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  startGameScreen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  startGameScreen__title: {
    fontSize: 20,
    marginVertical: 10,
  },
  startGameScreen__inputContainer: {
    width: "80%",
    maxWidth: "95%",
    minWidth: 300,
    alignItems: "center",
  },
  startGameScreen__buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 15,
  },
  // startGameScreen__button: {
  //   width: Dimensions.get("window").width / 4,
  // },
  startGameScreen__input: {
    width: 50,
    textAlign: "center",
  },
  startGameScreen__summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
