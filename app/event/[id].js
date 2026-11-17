import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useEvents } from "../../context/EventsContext";
import { colors } from "../../constants/theme";

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { events, isFavorite, toggleFavorite, reminderIds, setReminder } = useEvents();

  const event = events.find((item) => item.id === id);
  if (!event) {
    return (
      <View style={styles.center}>
        <Text>Event not found.</Text>
      </View>
    );
  }

  const favorite = isFavorite(event.id);
  const reminded = reminderIds.includes(event.id);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: event.image }} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.category}>{event.category.toUpperCase()}</Text>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.meta}>📅 {event.date} · {event.time}</Text>
        <Text style={styles.meta}>📍 {event.location}</Text>
        <Text style={styles.meta}>🎟️ {event.price}</Text>
        <Text style={styles.meta}>💺 {event.seats} seats · by {event.organizer}</Text>

        <Text style={styles.sectionTitle}>About this event</Text>
        <Text style={styles.description}>{event.description}</Text>

        <Pressable
          style={[styles.button, favorite && styles.buttonActive]}
          onPress={() => toggleFavorite(event)}
        >
          <Ionicons name={favorite ? "heart" : "heart-outline"} size={20} color="#fff" />
          <Text style={styles.buttonText}>{favorite ? "Remove from favorites" : "Add to favorites"}</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.reminder]}
          onPress={() => setReminder(event, 10)}
          disabled={reminded}
        >
          <Ionicons name="alarm" size={20} color="#fff" />
          <Text style={styles.buttonText}>
            {reminded ? "Reminder set (arrives in 10s)" : "Remind me (demo: 10 seconds)"}
          </Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.outline]}
          onPress={() => router.push(`/event/venue/${event.id}`)}
        >
          <Ionicons name="location" size={20} color={colors.primary} />
          <Text style={[styles.buttonText, { color: colors.primary }]}>View venue details</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  image: { width: "100%", height: 220, backgroundColor: colors.border },
  body: { padding: 18 },
  category: { color: colors.accent, fontWeight: "700", letterSpacing: 1, fontSize: 12 },
  title: { fontSize: 24, fontWeight: "800", color: colors.text, marginVertical: 6 },
  meta: { color: colors.muted, marginTop: 4, fontSize: 15 },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: colors.text, marginTop: 20, marginBottom: 6 },
  description: { color: colors.text, lineHeight: 22, marginBottom: 20 },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonActive: { backgroundColor: colors.danger },
  reminder: { backgroundColor: colors.accent },
  outline: { backgroundColor: "transparent", borderWidth: 2, borderColor: colors.primary },
  buttonText: { color: "#fff", fontWeight: "700", marginLeft: 8 },
});
