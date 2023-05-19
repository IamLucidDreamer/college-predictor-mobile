import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import theme from "../../helpers/theme";
import { Formik } from "formik";
import * as Yup from "yup";
import { login } from "../../services/authService";
import * as SecureStore from "expo-secure-store";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const Login = ({ navigation }) => {
  const LogInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Too Short!")
      .max(70, "Too Long!")
      .required("Required"),
  });

  const handleLogin = async (values) => {
    navigation.navigate("userHome");
    // try {
    //   const response = await login(values.email, values.password);
    //   const { status } = response;
    //   console.log(response);
    //   if (status >= 200 && status < 300) {
    //     SecureStore.setItemAsync("authToken", response?.data?.token);
    //     Toast.show({
    //       type: "success",
    //       text1: "Logged in Successfully.",
    //     });
    //     navigation.navigate("userHome");
    //   }
    // } catch (err) {
    //   console.error("Error : ", err);
    //   Toast.show({
    //     type: "error",
    //     text1: err?.message || "Something went Wrong",
    //   });
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/ck_logo_white.png")}
          resizeMode="contain"
          style={{ width: "75%", height: 250 }}
        />
      </View>
      <Animatable.View
        style={styles.footer}
        animation="fadeInUpBig"
        duration={1000}
      >
        <Formik
          initialValues={{ email: "", password: "" }}
          // validationSchema={LogInSchema}
          onSubmit={(values) => {
            const { email, password } = values;
            handleLogin(values);
          }}
        >
          {(formProps) => (
            <ScrollView>
              <KeyboardAvoidingView style={styles.inputContainer}>
                <Text style={styles.text1}>Sign In</Text>
                <View style={styles.inputField}>
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor={theme.colors.secondary}
                    style={[styles.textInput]}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={formProps.handleChange("email")}
                    onBlur={formProps.handleBlur("email")}
                    value={formProps.values.email}
                  />
                  {formProps.errors.email && formProps.touched.email ? (
                    <Text style={{ color: "red" }}>
                      {formProps.errors.email}
                    </Text>
                  ) : null}
                </View>
                <View style={styles.inputField}>
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor={theme.colors.dark2}
                    secureTextEntry={true}
                    style={[styles.textInput]}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={formProps.handleChange("password")}
                    onBlur={formProps.handleBlur("password")}
                    value={formProps.values.password}
                  />
                  {formProps.errors.password && formProps.touched.password ? (
                    <Text style={{ color: "red" }}>
                      {formProps.errors.password}
                    </Text>
                  ) : null}
                </View>
                {/* <TouchableOpacity
                  style={styles.forgotbtn}
                  onPress={() => navigation.navigate("Forgot")}
                >
                  <Text style={styles.forgottext}>Forgot Password</Text>
                </TouchableOpacity> */}
                {/* {loading ? (
                  <ActivityIndicator
                    size={"large"}
                    animating={true}
                    color={theme.colors.primaryGreen}
                  />
                ) : ( */}
                <TouchableOpacity
                  onPress={formProps.handleSubmit}
                  type="submit"
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
                {/* )} */}
                {/* <View style={styles.signup}>
                  <Text style={styles.signtxt}>Don't have an Account ? </Text>

                  <TouchableOpacity
                    onPress={() => navigation.navigate("userHome")}
                  >
                    <Text style={[styles.signtxt, { fontWeight: "bold" }]}>
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View> */}
              </KeyboardAvoidingView>
            </ScrollView>
          )}
        </Formik>
      </Animatable.View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: theme.colors.primary,
    flex: 1,
    justifyContent: "flex-end",
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    shadowRadius: "10px",
    flex: 2,
    shadowOffset: "-20px -20px",
    shadowColor: theme.colors.white,
    backgroundColor: theme.colors.white,
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
    fontWeight: "600",
  },
  text2: {
    textAlign: "left",
    color: theme.colors.secondary,
    fontSize: 20,
    marginBottom: 30,
    fontWeight: "700",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    marginTop: 20,
  },
  inputField: {
    flexDirection: "row",
    backgroundColor: theme.colors.secondaryTransparent,
    backgroundVisbility: "20%",
    alignItems: "center",
    height: 60,
    marginTop: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderRadius: 30,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    paddingLeft: 10,
    paddingVertical: 10,
    color: theme.colors.secondary,
  },
  button: {
    alignSelf: "center",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 17,
    marginVertical: 20,
    backgroundColor: theme.colors.secondary,
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
