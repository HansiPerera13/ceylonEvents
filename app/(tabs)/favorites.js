import { useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import EventCard from "../../components/EventCard";
import { useEvents } from "../../context/EventsContext";
import { colors } from "../../constants/theme";

export default function FavoritesScreen() {
  const { favorites, clearFavorites } = useEvents();
  const [confirmVisible, setConfirmVisible] = useState(false);

  return (
    <View style={styles.container}>
      {favorites.length > 0 && (
        <Pressable style={styles.clearButton} onPress={() => setConfirmVisible(true)}>
          <Text style={styles.clearText}>Clear all favorites</Text>
        </Pressable>
      )}

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} />}
        contentContainerStyle={{ paddingBottom: 24, flexGrow: 1 }}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyEmoji}>💚</Text>
            <Text style={styles.emptyTitle}>No favorites yet</Text>
            <Text style={styles.emptyText}>Tap the heart on any event to save it here.</Text>
          </View>
        }
      />

      {/* Confirmation modal */}
      <Modal
        visible={confirmVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setConfirmVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.dialog}>
            <Text style={styles.dialogTitle}>Remove all favorites?</Text>
            <Text style={styles.dialogText}>This will remove {favorites.length} saved event(s).</Text>
            <View style={styles.dialogButtons}>
              <Pressable style={[styles.dialogButton, styles.cancel]} onPress={() => setConfirmVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.dialogButton, styles.confirm]}
                onPress={() => {
                  clearFavorites();
                  setConfirmVisible(false);
                }}
              >
                <Text style={styles.confirmText}>Remove</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  clearButton: { alignSelf: "flex-end", marginBottom: 10 },
  clearText: { color: colors.danger, fontWeight: "600" },
  emptyBox: { flex: 1, alignItems: "center", justifyContent: "center" },
  emptyEmoji: { fontSize: 48 },
  emptyTitle: { fontSize: 20, fontWeight: "700", color: colors.text, marginTop: 8 },
  emptyText: { color: colors.muted, marginTop: 4 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.45)", alignItems: "center", justifyContent: "center", padding: 24 },
  dialog: { backgroundColor: colors.card, borderRadius: 16, padding: 20, width: "100%" },
  dialogTitle: { fontSize: 18, fontWeight: "700", color: colors.text },
  dialogText: { color: colors.muted, marginTop: 6, marginBottom: 16 },
  dialogButtons: { flexDirection: "row", justifyContent: "flex-end" },
  dialogButton: { paddingVertical: 10, paddingHorizontal: 18, borderRadius: 8, marginLeft: 10 },
  cancel: { backgroundColor: colors.background },
  cancelText: { color: colors.text, fontWeight: "600" },
  confirm: { backgroundColor: colors.danger },
  confirmText: { color: "#fff", fontWeight: "700" },
});
