import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEvents } from "../context/EventsContext";
import { colors } from "../constants/theme";

export default function EventCard({ event }) {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useEvents();
  const favorite = isFavorite(event.id);

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={() => router.push(`/event/${event.id}`)}
    >
      <Image source={{ uri: event.image }} style={styles.image} />
      <View style={styles.body}>
        <View style={styles.row}>
          <Text style={styles.category}>{event.category.toUpperCase()}</Text>
          <Pressable onPress={() => toggleFavorite(event)} hitSlop={10}>
            <Ionicons
              name={favorite ? "heart" : "heart-outline"}
              size={24}
              color={favorite ? colors.danger : colors.muted}
            />
          </Pressable>
        </View>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.meta}>📅 {event.date} · {event.time}</Text>
        <Text style={styles.meta}>📍 {event.location}</Text>
        <Text style={styles.price}>{event.price}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  pressed: { opacity: 0.85 },
  image: { width: "100%", height: 150, backgroundColor: colors.border },
  body: { padding: 14 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  category: { fontSize: 12, fontWeight: "700", color: colors.accent, letterSpacing: 1 },
  title: { fontSize: 18, fontWeight: "700", color: colors.text, marginTop: 4, marginBottom: 6 },
  meta: { fontSize: 14, color: colors.muted, marginTop: 2 },
  price: { fontSize: 14, fontWeight: "600", color: colors.primary, marginTop: 8 },
});
