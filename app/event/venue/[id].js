import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEvents } from "../../../context/EventsContext";
import { colors } from "../../../constants/theme";

export default function VenueScreen() {
  const { id } = useLocalSearchParams();
  const { events } = useEvents();
  const event = events.find((item) => item.id === id);

  if (!event) {
    return (
      <View style={styles.center}>
        <Text>Venue not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 18 }}>
      <Text style={styles.forEvent}>For: {event.title}</Text>
      <Text style={styles.name}>{event.venue.name}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.value}>{event.venue.address}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Visitor tips</Text>
        <Text style={styles.value}>{event.venue.tips}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Date & time</Text>
        <Text style={styles.value}>{event.date} at {event.time}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  forEvent: { color: colors.muted },
  name: { fontSize: 24, fontWeight: "800", color: colors.primary, marginVertical: 8 },
  card: { backgroundColor: colors.card, borderRadius: 12, padding: 16, marginTop: 12 },
  label: { color: colors.accent, fontWeight: "700", marginBottom: 4 },
  value: { color: colors.text, lineHeight: 21 },
});
