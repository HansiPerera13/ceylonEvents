import { useMemo, useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import EventCard from "../../components/EventCard";
import { useEvents } from "../../context/EventsContext";
import { CATEGORIES } from "../../data/events";
import { colors } from "../../constants/theme";

export default function HomeScreen() {
  const { events, resumeInfo, dismissResume } = useEvents();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [filterVisible, setFilterVisible] = useState(false);

  const filtered = useMemo(
    () =>
      events.filter((event) => {
        const matchesCategory = category === "All" || event.category === category;
        const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
      }),
    [events, search, category]
  );

  return (
    <View style={styles.container}>
      {resumeInfo && (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            👋 Welcome back! You were away for {resumeInfo.awaySeconds}s.
          </Text>
          <Pressable onPress={dismissResume}>
            <Text style={styles.bannerAction}>Dismiss</Text>
          </Pressable>
        </View>
      )}

      <View style={styles.searchRow}>
        <TextInput
          style={styles.search}
          placeholder="Search events..."
          value={search}
          onChangeText={setSearch}
        />
        <Pressable style={styles.filterButton} onPress={() => setFilterVisible(true)}>
          <Ionicons name="filter" size={20} color="#fff" />
        </Pressable>
      </View>

      <Text style={styles.sub}>
        Showing {filtered.length} event(s){category !== "All" ? ` in ${category}` : ""}
      </Text>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} />}
        contentContainerStyle={{ paddingBottom: 24 }}
        ListEmptyComponent={<Text style={styles.empty}>No events match your search.</Text>}
      />

      {/* Filter modal */}
      <Modal
        visible={filterVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>Filter by category</Text>
            {CATEGORIES.map((item) => (
              <Pressable
                key={item}
                style={[styles.option, category === item && styles.optionActive]}
                onPress={() => setCategory(item)}
              >
                <Text style={[styles.optionText, category === item && styles.optionTextActive]}>
                  {item}
                </Text>
              </Pressable>
            ))}
            <Pressable style={styles.applyButton} onPress={() => setFilterVisible(false)}>
              <Text style={styles.applyText}>Apply</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  banner: {
    backgroundColor: "#FFF4D6",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bannerText: { color: colors.text, flex: 1, marginRight: 8 },
  bannerAction: { color: colors.primary, fontWeight: "700" },
  searchRow: { flexDirection: "row", marginBottom: 8 },
  search: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginLeft: 8,
    width: 46,
    alignItems: "center",
    justifyContent: "center",
  },
  sub: { color: colors.muted, marginBottom: 10 },
  empty: { textAlign: "center", color: colors.muted, marginTop: 40 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
  sheet: { backgroundColor: colors.card, padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  sheetTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12, color: colors.text },
  option: { paddingVertical: 12, paddingHorizontal: 14, borderRadius: 8, marginBottom: 6 },
  optionActive: { backgroundColor: colors.primary },
  optionText: { fontSize: 16, color: colors.text },
  optionTextActive: { color: "#fff", fontWeight: "700" },
  applyButton: {
    backgroundColor: colors.accent,
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    marginTop: 10,
  },
  applyText: { fontWeight: "700", color: "#fff", fontSize: 16 },
});
