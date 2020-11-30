import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/colors";

const NumberContainer = (props) => {
  return (
    <View style={styles.numberContainer}>
      <Text style={styles.numberContainer__number}>{props.children}</Text>
    </View>
  );
};

export default NumberContainer;

const styles = StyleSheet.create({
  numberContainer: {
    borderWidth: 2,
    borderColor: Colors.accent,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  numberContainer__number: {
    color: Colors.accent,
    fontSize: 22,
  },
});
