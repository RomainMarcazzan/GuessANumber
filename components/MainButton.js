import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import colors from "../constants/colors";

const MainButton = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <View style={styles.mainButton__button}>
        <Text style={styles.mainButton__text}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  mainButton__button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  mainButton__text: {
    color: "white",
    fontFamily: "open-sans",
    fontSize: 18,
  },
});
