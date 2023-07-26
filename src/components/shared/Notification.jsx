import React, { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import { StyleSheet } from "react-native";
import { server } from "../../helpers/apiCall";
import * as SecureStore from "expo-secure-store";

export default function Notification() {

  useEffect(() => {
    registerForPushNotificationsAsync();

    // Handle incoming notifications when the app is in the foreground
    Notifications.addNotificationReceivedListener(handleNotification);

    // Handle incoming notifications when the app is in the background or closed
    Notifications.addNotificationResponseReceivedListener(
      handleNotificationResponse
    );

    // Handle background notifications
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    Notifications.scheduleNotificationAsync({
      content: {
        title: "Welcome To Careerkick",
        body: "Your Career is our Success.",
      },
      trigger: null,
    });
  }, []);

  const registerForPushNotificationsAsync = async () => {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        const { status: newStatus } =
          await Notifications.requestPermissionsAsync();
        console.log(newStatus, "sadf");
        if (newStatus === "granted") {
          // Token will be available after granting permission
          const token = (
            await Notifications.getExpoPushTokenAsync({
              projectId: "f51f57da-fc03-4075-98c2-1b14235837af",
            })
          ).data;
          const auth = await SecureStore.getItemAsync("authToken");
          if (auth) {
            server
              .put(
                "/user/update/expo-token",
                { expoToken: token },
                { headers: { Authorization: `Bearer ${auth}` } }
              )
              .then((res) => {
                console.log("Success", res.data);
              })
              .catch((err) => console.log(err, "errrr", "error"));
          }
        }
      } else {
        // Token is already available
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token, "hello");
      }
    } catch (err) {
      console.log(err);
      setData(JSON.stringify(err));
    }
  };

  const handleNotification = (notification) => {
    console.log(notification);
    // Handle the received notification when the app is in the foreground
  };

  const handleNotificationResponse = (response) => {
    console.log(response);
    // Handle the user's interaction with the notification when the app is in the background or closed
  };

  return <></>;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
