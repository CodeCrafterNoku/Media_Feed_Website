import { Platform } from "react-native";
import * as Notifications from "expo-notifications";

export const requestNotifPermissions = async (): Promise<boolean> => {
  if (Platform.OS === "web") return false;
  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
};

export const scheduleReminder = async (
  postId: string,
  title: string,
  fireDate: Date
): Promise<string | undefined> => {
  if (Platform.OS === "web") {
    console.warn("Notifications not supported on web.");
    return;
  }

  const now = Date.now();
  let timestamp = fireDate.getTime();
  if (timestamp - now < 5000) {
    timestamp = now + 5000;
  }
  const secondsFromNow = Math.floor((timestamp - now) / 1000);

  const trigger = {
    type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
    seconds: secondsFromNow,
    repeats: false,
  } as any;

  return Notifications.scheduleNotificationAsync({
    content: { title: "Reminder", body: title, data: { postId } },
    trigger,
  });
};

export const addResponseListener = (cb: (postId: string) => void) => {
  if (Platform.OS === "web") return { remove: () => {} };
  return Notifications.addNotificationResponseReceivedListener((resp) => {
    const postId = resp.notification.request.content.data?.postId as string;
    if (postId) cb(postId);
  });
};
