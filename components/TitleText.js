import React from "react";
import { StyleSheet, Text } from "react-native";

const TitleText = (props) => {
  return (
    <Text style={{ ...styles.bodyText__body, ...props.style }}>
      {props.children}
    </Text>
  );
};

export default TitleText;

const styles = StyleSheet.create({
  bodyText__body: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
});
