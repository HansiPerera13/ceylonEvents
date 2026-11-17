import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useEvents } from "../../context/EventsContext";
import { notifyNow, scheduleReminder } from "../../utils/notifications";
import { colors } from "../../constants/theme";

export default function SettingsScreen() {
  const { favoriteIds, reminderIds, resumeCount, events } = useEvents();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.heading}>Ceylon Events</Text>
      <Text style={styles.text}>
        Discover festivals, concerts, food fairs and outdoor adventures across Sri Lanka.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your activity</Text>
        <Text style={styles.stat}>Total events: {events.length}</Text>
        <Text style={styles.stat}>Favorites: {favoriteIds.length}</Text>
        <Text style={styles.stat}>Reminders set: {reminderIds.length}</Text>
        <Text style={styles.stat}>Times app returned to foreground: {resumeCount}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Test notifications</Text>
        <Pressable
          style={styles.button}
          onPress={() => notifyNow("Ceylon Events 🇱🇰", "This is an immediate local notification.")}
        >
          <Text style={styles.buttonText}>Send now</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonAlt]}
          onPress={() =>
            scheduleReminder("Ceylon Events ⏰", "This notification was scheduled 5 seconds ago.", 5)
          }
        >
          <Text style={styles.buttonText}>Send in 5 seconds</Text>
        </Pressable>
        <Text style={styles.hint}>Tip: press Home after tapping, then watch for the notification.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  heading: { fontSize: 24, fontWeight: "800", color: colors.primary },
  text: { color: colors.muted, marginTop: 6, marginBottom: 16 },
  card: { backgroundColor: colors.card, borderRadius: 14, padding: 16, marginBottom: 16 },
  cardTitle: { fontSize: 16, fontWeight: "700", color: colors.text, marginBottom: 10 },
  stat: { color: colors.text, marginBottom: 4 },
  button: { backgroundColor: colors.primary, padding: 14, borderRadius: 10, alignItems: "center", marginBottom: 10 },
  buttonAlt: { backgroundColor: colors.accent },
  buttonText: { color: "#fff", fontWeight: "700" },
  hint: { color: colors.muted, fontSize: 12 },
});
