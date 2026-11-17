import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { EventsProvider } from "../context/EventsContext";

export default function RootLayout() {
  return (
    <EventsProvider>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="event" options={{ headerShown: false }} />
      </Stack>
    </EventsProvider>
  );
}
