import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Show notifications even while the app is open.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Create the Android channel and ask the user for permission.
export async function setupNotifications() {
  try {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "Default",
        importance: Notifications.AndroidImportance.MAX,
      });
    }
    const current = await Notifications.getPermissionsAsync();
    if (current.granted) return true;
    const request = await Notifications.requestPermissionsAsync();
    return request.granted;
  } catch (error) {
    console.log("Notification setup failed:", error);
    return false;
  }
}

// Immediate local notification (trigger: null).
export async function notifyNow(title, body) {
  try {
    await Notifications.scheduleNotificationAsync({
      content: { title, body },
      trigger: null,
    });
  } catch (error) {
    console.log("notifyNow failed:", error);
  }
}

// Timed local notification, fires after `seconds`.
export async function scheduleReminder(title, body, seconds) {
  try {
    await Notifications.scheduleNotificationAsync({
      content: { title, body },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds,
        channelId: "default",
      },
    });
  } catch (error) {
    console.log("scheduleReminder failed:", error);
  }
}
