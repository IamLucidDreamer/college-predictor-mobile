import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import * as Animatable from "react-native-animatable";
import theme from "../../helpers/theme";

const StartScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/careerkick_logo.jpg")}
          resizeMode="contain"
          style={{ width: "95%", height: 350, marginBottom: 90 }}
        />
      </View>
      <Animatable.View
        style={styles.footer}
        animation="fadeInUpBig"
        duration={1000}
      >
        <Text style={styles.text1}>Welcome</Text>
        <Text style={styles.text2}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: theme.colors.white,
              },
            ]}
            onPress={() => navigation.navigate("Login")}
          >
            <Text
              animation={"fadeInRight"}
              style={[styles.buttonText, { color: theme.colors.secondary }]}
            >
              Sign Up
            </Text>
            {/* <FontAwesome5
              animation={"fadeInRight"}
              name={"arrow-right"}
              size={18}
              color={"#fff"}
            /> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: theme.colors.secondary,
              },
            ]}
            onPress={() => navigation.navigate("login")}
          >
            <Text animation={"fadeInRight"} style={styles.buttonText}>
              Sign In
            </Text>
            {/* <FontAwesome5
              animation={"fadeInRight"}
              name={"arrow-right"}
              size={18}
              color={"#fff"}
            /> */}
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </SafeAreaView>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: theme.colors.white,
    flex: 1,
    justifyContent: "flex-end",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    shadowRadius: "10px",
    shadowOffset: "-20px -20px",
    shadowColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
    justifyContent: "space-evenly",
    borderTopEndRadius: 60,
    borderTopStartRadius: 60,
    paddingVertical: 30,
    padding: 30,
  },
  text1: {
    textAlign: "left",
    color: theme.colors.secondary,
    fontSize: 40,
    marginBottom: 10,
    marginTop: 10,
    fontWeight: "600",
  },
  text2: {
    textAlign: "left",
    color: theme.colors.secondary,
    fontSize: 20,
    marginBottom: 30,
    fontWeight: "500",
  },
  button: {
    alignSelf: "center",
    width: "43%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 17,
    borderRadius: 30,
    shadowColor: "#000",
    elevation: 4,
  },
  buttonText: {
    fontSize: 18,
    color: theme.colors.white,
    fontWeight: "bold",
  },
});
