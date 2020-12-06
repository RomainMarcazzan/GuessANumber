import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import Colors from "../constants/colors";
import TitleText from "../components/TitleText";

const Header = (props) => {
  return (
    <View
      style={{
        ...styles.headerBase,
        ...Platform.select({
          ios: styles.header__ios,
          android: styles.header__android,
        }),
      }}
    >
      <TitleText style={styles.header__title}>{props.title}</TitleText>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerBase: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  header__ios: {
    backgroundColor: "white",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  header__android: {
    backgroundColor: Colors.primary,
  },
  header__title: {
    color: Platform.OS === "ios" ? Colors.primary : "white",
  },
});
