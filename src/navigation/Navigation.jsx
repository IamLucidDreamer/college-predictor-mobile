import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import theme from "../helpers/theme";
import { useSelector } from "react-redux";
import { StatusBar as Status } from "expo-status-bar";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import Notification from "../components/shared/Notification";

import {
  AntDesign,
  SimpleLineIcons,
  Entypo,
  Ionicons,
} from "@expo/vector-icons";

import UserHome from "../screens/users/UserHome";
import Blogs from "../screens/users/Blogs";
import Colleges from "../screens/users/Colleges";
import NeetPredictor from "../screens/users/NeetPredictor";
import WebView from "react-native-webview";
import * as SecureStore from "expo-secure-store";
import { TouchableOpacity } from "react-native";
import { ToastAndroid } from "react-native";

export default function Navigation() {
  const Stack = createNativeStackNavigator();
  const [check, setCheck] = useState(false);
  const [authToken, setAuthtoken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [logout, setLogout] = useState(true);
  const [inject, setInject] = useState(false);

  const webViewRef = useRef(null);

  let lastPress = 0;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        webViewRef.current.goBack();

        const currentTime = new Date().getTime();
        const DOUBLE_PRESS_DELAY = 1000; // Time threshold for a double-click (in milliseconds)

        if (currentTime - lastPress <= DOUBLE_PRESS_DELAY) {
          // If the second press occurs within the threshold, exit the app
          BackHandler.exitApp();
        } else {
          // Otherwise, show a toast message indicating the need to double-click to exit
          ToastAndroid.show("Press back again to exit", ToastAndroid.SHORT);
          lastPress = currentTime;
        }

        return () => backHandler.remove();
      }
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    SecureStore.getItemAsync("authToken")
      .then((auth) => {
        SecureStore.getItemAsync("userId")
          .then((userId) => {
            if (auth && userId) {
              setAuthtoken(auth);
              setUserId(userId);
              setCheck(true);
            } else {
              setCheck(false);
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  const StartNavigation = () => {
    const [activityIndicator, setActivityIndicator] = useState(false);
    const INJECTED_JAVASCRIPT = `(function() {
    window.postMessage("logout");
})();`;

    useEffect(() => {
      if (logout) {
        setInject(true);
        setLogout(false);
      }
    }, []);

    const getQueryParams = async (url) => {
      const params = {};

      if (url) {
        const regex = /[?&]([^=#]+)=([^&#]*)/g;
        let match;

        while ((match = regex.exec(url))) {
          params[match[1]] = match[2];
        }
      }
      if (params.auth_token && params.user_id) {
        try {
          SecureStore.setItemAsync("authToken", params.auth_token)
            .then((res) => {
              SecureStore.setItemAsync("userId", params.user_id)
                .then((res) => {
                  Toast.show({
                    type: "success",
                    text1: "Logged in Successfully.",
                  });
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        } catch (e) {
          console.log(e, "error");
        }
        setCheck(true);
      }
      return;
    };

    return (
      <>
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{
              paddingTop:
                Platform.OS === "android" ? StatusBar.currentHeight : 0,
              flex: 1,
            }}
          >
            <WebView
              ref={webViewRef}
              injectedJavaScript={inject ? INJECTED_JAVASCRIPT : ""}
              source={{
                uri: "https://www.admission.careerkick.in/home?app_in_app=true",
              }}
              style={{ flex: 1 }}
              domStorageEnabled
              javaScriptEnabled
              onLoadStart={() => setActivityIndicator(true)}
              onLoadEnd={() => setActivityIndicator(false)}
              onNavigationStateChange={(state) => {
                const url = new URL(state?.url);
                getQueryParams(url);
              }}
            />
            {activityIndicator && (
              <ActivityIndicator
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
                size="large"
              />
            )}
          </View>
        </SafeAreaView>
      </>
    );
  };

  const UserNavigator = () => {
    const UserTab = createMaterialBottomTabNavigator();
    return (
      <View style={{ flex: 1 }}>
        <UserTab.Navigator
          initialRouteName="Home"
          activeColor={theme.colors.primary}
          inactiveColor={theme.colors.secondary}
          shifting={false}
          barStyle={{
            backgroundColor: theme.colors.white,
          }}
        >
          <UserTab.Screen
            name="Home"
            component={UserHomeStack}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color }) => (
                <AntDesign name="home" color={color} size={24} />
              ),
            }}
          />
          <UserTab.Screen
            name="colleges"
            component={CollegeListStack}
            options={{
              tabBarLabel: "Colleges",

              tabBarIcon: ({ color }) => (
                <Ionicons name="school-outline" color={color} size={24} />
              ),
            }}
          />
          <UserTab.Screen
            name="Predictor"
            component={PredictorStack}
            options={{
              tabBarLabel: "Predictor",
              tabBarIcon: ({ color }) => (
                <SimpleLineIcons name="graph" color={color} size={24} />
              ),
            }}
          />
          <UserTab.Screen
            name="Updates"
            component={UpdateStack}
            options={{
              tabBarLabel: "Updates",
              tabBarIcon: ({ color }) => (
                <SimpleLineIcons name="briefcase" color={color} size={24} />
              ),
            }}
          />
          <UserTab.Screen
            name="Blogs"
            component={BlogsListStack}
            options={{
              tabBarLabel: "Blogs",
              tabBarIcon: ({ color }) => (
                <Entypo name="list" color={color} size={24} />
              ),
            }}
          />
          <UserTab.Screen
            name="Profile"
            component={WebViewComponent5}
            options={{
              tabBarLabel: "Profile",
              tabBarIcon: ({ color }) => (
                <AntDesign name="user" color={color} size={24} />
              ),
            }}
          />
        </UserTab.Navigator>
      </View>
    );
  };

  const UserHomeStack = () => {
    const Stack = createNativeStackNavigator();
    return (
      <Stack.Navigator
        screenOptions={{
          headerBackVisible: false,
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTitleStyle: {
            color: theme.colors.white,
          },
          headerShown: false,
          animation: "fade",
        }}
      >
        <Stack.Screen name="CareerKick" component={WebViewComponent} />
      </Stack.Navigator>
    );
  };

  const CollegeListStack = () => {
    const Stack = createNativeStackNavigator();
    return (
      <Stack.Navigator
        screenOptions={{
          headerBackVisible: false,
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTitleStyle: {
            color: theme.colors.white,
          },
          headerShown: false,
          animation: "fade",
        }}
      >
        <Stack.Screen name="Colleges" component={WebViewComponent2} />
      </Stack.Navigator>
    );
  };

  const PredictorStack = () => {
    const Stack = createNativeStackNavigator();
    return (
      <Stack.Navigator
        screenOptions={{
          headerBackVisible: false,
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTitleStyle: {
            color: theme.colors.white,
          },
          headerShown: false,
          animation: "fade",
        }}
      >
        <Stack.Screen name="Colleges" component={WebViewComponent6} />
      </Stack.Navigator>
    );
  };

  const BlogsListStack = () => {
    const Stack = createNativeStackNavigator();
    return (
      <Stack.Navigator
        screenOptions={{
          headerBackVisible: false,
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTitleStyle: {
            color: theme.colors.white,
          },
          headerShown: false,
          animation: "fade",
        }}
      >
        <Stack.Screen name="Blogs" component={WebViewComponent4} />
      </Stack.Navigator>
    );
  };

  const UpdateStack = () => {
    const Stack = createNativeStackNavigator();
    return (
      <Stack.Navigator
        screenOptions={{
          headerBackVisible: false,
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTitleStyle: {
            color: theme.colors.white,
          },
          headerShown: false,
          animation: "fade",
        }}
      >
        <Stack.Screen name="Predictor" component={WebViewComponent3} />
      </Stack.Navigator>
    );
  };

  const WebViewComponent = ({ url }) => {
    const [activityIndicator, setActivityIndicator] = useState(false);

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Notification />
        <View
          style={{
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
            flex: 1,
          }}
        >
          <WebView
            ref={webViewRef}
            source={{
              uri: `https://www.admission.careerkick.in/?app_in_app=true&auth_token=${authToken}&user_id=${userId}`,
            }}
            style={{ flex: 1 }}
            onLoadStart={() => setActivityIndicator(true)}
            onLoadEnd={() => setActivityIndicator(false)}
          />
          {activityIndicator && (
            <ActivityIndicator
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              size="large"
            />
          )}
        </View>
      </SafeAreaView>
    );
  };

  const WebViewComponent2 = ({ url }) => {
    const [activityIndicator, setActivityIndicator] = useState(false);

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
            flex: 1,
          }}
        >
          <WebView
            ref={webViewRef}
            source={{
              uri: "https://www.admission.careerkick.in/dashboard/colleges?app_in_app=true",
            }}
            style={{ flex: 1 }}
            onLoadStart={() => setActivityIndicator(true)}
            onLoadEnd={() => setActivityIndicator(false)}
          />
          {activityIndicator && (
            <ActivityIndicator
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              size="large"
            />
          )}
        </View>
      </SafeAreaView>
    );
  };

  const WebViewComponent6 = ({ url }) => {
    const [activityIndicator, setActivityIndicator] = useState(false);

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
            flex: 1,
          }}
        >
          <WebView
            ref={webViewRef}
            source={{
              uri: "https://www.admission.careerkick.in/dashboard/predictor?app_in_app=true",
            }}
            style={{ flex: 1 }}
            onLoadStart={() => setActivityIndicator(true)}
            onLoadEnd={() => setActivityIndicator(false)}
          />
          {activityIndicator && (
            <ActivityIndicator
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              size="large"
            />
          )}
        </View>
      </SafeAreaView>
    );
  };

  const WebViewComponent3 = ({ url }) => {
    const [activityIndicator, setActivityIndicator] = useState(false);

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
            flex: 1,
          }}
        >
          <WebView
            ref={webViewRef}
            source={{
              uri: "https://www.admission.careerkick.in/dashboard/updates?app_in_app=true",
            }}
            style={{ flex: 1 }}
            onLoadStart={() => setActivityIndicator(true)}
            onLoadEnd={() => setActivityIndicator(false)}
          />
          {activityIndicator && (
            <ActivityIndicator
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              size="large"
            />
          )}
        </View>
      </SafeAreaView>
    );
  };

  const WebViewComponent4 = ({ url }) => {
    const [activityIndicator, setActivityIndicator] = useState(false);

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
            flex: 1,
          }}
        >
          <WebView
            ref={webViewRef}
            source={{
              uri: "https://www.admission.careerkick.in/dashboard/blogs?app_in_app=true",
            }}
            style={{ flex: 1 }}
            onLoadStart={() => setActivityIndicator(true)}
            onLoadEnd={() => setActivityIndicator(false)}
          />
          {activityIndicator && (
            <ActivityIndicator
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              size="large"
            />
          )}
        </View>
      </SafeAreaView>
    );
  };

  const WebViewComponent5 = ({ url }) => {
    const [activityIndicator, setActivityIndicator] = useState(false);

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
            flex: 1,
          }}
        >
          <WebView
            ref={webViewRef}
            source={{
              uri: "https://www.admission.careerkick.in/profile?app_in_app=true",
            }}
            style={{ flex: 1 }}
            onLoadStart={() => setActivityIndicator(true)}
            onLoadEnd={() => setActivityIndicator(false)}
          />
          {activityIndicator && (
            <ActivityIndicator
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              size="large"
            />
          )}
          <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
            <TouchableOpacity
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                backgroundColor: theme.colors.secondary,
                borderRadius: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              onPress={() => {
                SecureStore.deleteItemAsync("authToken")
                  .then((auth) => {
                    SecureStore.deleteItemAsync("userId")
                      .then((userId) => {
                        setCheck(false);
                      })
                      .catch((err) => console.log(err));
                  })
                  .catch((err) => console.log(err));
              }}
            >
              <Text style={{ fontSize: 20, color: "#ffffff" }}>Logout</Text>
              <AntDesign name="arrowright" color={"#ffffff"} size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  return (
    <NavigationContainer>
      <>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: "fade",
          }}
        >
          {/* <Stack.Screen name="start" component={StartScreen} />
          <Stack.Screen name="login" component={Login} />*/}
          {!check ? (
            <Stack.Screen name="start" component={StartNavigation} />
          ) : (
            <Stack.Screen name="userHome" component={UserNavigator} />
          )}
        </Stack.Navigator>
      </>
    </NavigationContainer>
  );
}
