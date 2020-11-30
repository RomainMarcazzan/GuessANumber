import React from "react";
import { StyleSheet, Text } from "react-native";

const BodyText = (props) => {
  return (
    <Text style={{ ...styles.bodyText__body, ...props.style }}>
      {props.children}
    </Text>
  );
};

export default BodyText;

const styles = StyleSheet.create({
  bodyText__body: {
    fontFamily: "open-sans",
  },
});
