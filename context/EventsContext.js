import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AppState } from "react-native";
import { EVENTS } from "../data/events";
import { notifyNow, scheduleReminder, setupNotifications } from "../utils/notifications";

const EventsContext = createContext(null);

export function EventsProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [reminderIds, setReminderIds] = useState([]);
  const [resumeInfo, setResumeInfo] = useState(null); // shown as a banner
  const [resumeCount, setResumeCount] = useState(0);

  const lastAppState = useRef(AppState.currentState);
  const backgroundedAt = useRef(null);

  // Ask for notification permission once on launch.
  useEffect(() => {
    setupNotifications();
  }, []);

  // AppState listener: detects background -> foreground.
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      const previous = lastAppState.current;

      if (nextState === "background") {
        backgroundedAt.current = Date.now();
      }

      if (previous.match(/inactive|background/) && nextState === "active") {
        const awaySeconds = backgroundedAt.current
          ? Math.round((Date.now() - backgroundedAt.current) / 1000)
          : 0;
        console.log(`App returned to foreground after ${awaySeconds}s`);
        setResumeCount((count) => count + 1);
        setResumeInfo({ awaySeconds });
      }

      lastAppState.current = nextState;
    });

    return () => subscription.remove();
  }, []);

  const isFavorite = useCallback((id) => favoriteIds.includes(id), [favoriteIds]);

  const toggleFavorite = useCallback(
    (event) => {
      const alreadyFavorite = favoriteIds.includes(event.id);
      setFavoriteIds((ids) =>
        alreadyFavorite ? ids.filter((id) => id !== event.id) : [...ids, event.id]
      );
      if (!alreadyFavorite) {
        notifyNow("Event bookmarked! ⭐", `${event.title} was added to your favorites.`);
      }
    },
    [favoriteIds]
  );

  const clearFavorites = useCallback(() => setFavoriteIds([]), []);

  const setReminder = useCallback((event, seconds = 10) => {
    setReminderIds((ids) => (ids.includes(event.id) ? ids : [...ids, event.id]));
    scheduleReminder(
      "Event reminder ⏰",
      `${event.title} is on ${event.date} at ${event.time}. Don't forget!`,
      seconds
    );
  }, []);

  const value = useMemo(
    () => ({
      events: EVENTS,
      favoriteIds,
      favorites: EVENTS.filter((event) => favoriteIds.includes(event.id)),
      reminderIds,
      resumeInfo,
      resumeCount,
      isFavorite,
      toggleFavorite,
      clearFavorites,
      setReminder,
      dismissResume: () => setResumeInfo(null),
    }),
    [favoriteIds, reminderIds, resumeInfo, resumeCount, isFavorite, toggleFavorite, clearFavorites, setReminder]
  );

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>;
}

export function useEvents() {
  const context = useContext(EventsContext);
  if (!context) throw new Error("useEvents must be used inside EventsProvider");
  return context;
}
