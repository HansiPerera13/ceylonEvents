import { Pressable } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/theme";

// Nested stack: Event Details -> Venue Details
export default function EventLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          title: "Event Details",
          headerLeft: () => (
            <Pressable onPress={() => router.back()} hitSlop={12} style={{ marginRight: 12 }}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen name="venue/[id]" options={{ title: "Venue" }} />
    </Stack>
  );
}
