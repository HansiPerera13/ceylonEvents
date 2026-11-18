# Ceylon Events 🇱🇰

**Name:** GAHJ Perera

**Student ID:** FGS/MSc/CS/2025/020

**Course:** COSC 64173 – Mobile Computing, Assignment 01 (University of Kelaniya)

**Demo video:** https://drive.google.com/file/d/1y4hWLfQunHmtwd_Kmc9Cg5zys3GRUexc/view?usp=sharing

---


## 1. What is the app and what problem does it solve?

Ceylon Events is a mobile app for discovering cultural festivals, concerts, food fairs, sports and arts events across Sri Lanka. Information about local events is scattered across social media posts and word of mouth, which makes it hard to know what is on, where, when and how much it costs.

The app puts realistic event information in one place. Users can browse and filter events, save favorites, view venue details and set reminders so they do not miss an event.

## 2. Screens (5)

| # | Screen | File | Purpose |
|---|--------|------|---------|
| 1 | **Events** (tab) | `app/(tabs)/index.js` | Lists all events in a FlatList with search and a category filter modal. Shows a "Welcome back" banner when the app returns from the background. |
| 2 | **Favorites** (tab) | `app/(tabs)/favorites.js` | Shows the events the user bookmarked. Has a confirmation modal for "Clear all". |
| 3 | **Settings** (tab) | `app/(tabs)/settings.js` | App info, activity stats (favorites, reminders, foreground count) and buttons to test local notifications. |
| 4 | **Event Details** (stack) | `app/event/[id].js` | Full details of one event with favorite and reminder buttons. |
| 5 | **Venue Details** (stack) | `app/event/venue/[id].js` | Venue name, address and visitor tips. |

## 3. Core React Native components used

| Component | Where it is used |
|-----------|------------------|
| `View`, `Text` | All screens |
| `Image` | `components/EventCard.js`, `app/event/[id].js` |
| `Pressable` | Cards, heart button, filter/apply/confirm buttons, detail buttons |
| `FlatList` | `app/(tabs)/index.js` and `app/(tabs)/favorites.js` (rendering `data/events.js`) |
| `Modal` | Category filter (`app/(tabs)/index.js`) and "Clear all favorites" confirmation (`app/(tabs)/favorites.js`) |
| `TextInput` | Search box in `app/(tabs)/index.js` |
| `ScrollView` | Detail, venue and settings screens |
| `AppState` | `context/EventsContext.js` |

## 4. Expo Router structure

```
app/
├── _layout.js            # Root Stack + EventsProvider (global state)
├── (tabs)/               # Tab navigation group
│   ├── _layout.js        # Tabs: Events, Favorites (with badge), Settings
│   ├── index.js          # Events list
│   ├── favorites.js      # Favorites list
│   └── settings.js       # Settings and notification tests
└── event/                # Nested stack layout
    ├── _layout.js        # Stack with back button
    ├── [id].js           # Event details (dynamic route)
    └── venue/
        └── [id].js       # Venue details (dynamic route)
```

- The root `Stack` contains the `(tabs)` group and the `event` nested stack.
- Pressing a card calls `router.push("/event/<id>")`. The venue button pushes `/event/venue/<id>`.
- Back navigation works through the header back arrow and the Android hardware back button.

## 5. State management

Global state lives in `context/EventsContext.js` (React Context with `useState`) and is shared across all screens:

- `favoriteIds`: favorited events. Hearting an event on the list or detail screen updates the Favorites tab and its badge instantly.
- `reminderIds`: events with a reminder set.
- `resumeInfo` and `resumeCount`: updated by the AppState listener.

## 6. AppState

In `context/EventsContext.js`, `AppState.addEventListener("change", ...)` tracks the previous state. When the state goes from `background` (or `inactive`) to `active`, the app records how long the user was away, shows a "Welcome back" banner on the Events screen and increments a counter on the Settings screen. The listener is removed on unmount.

## 7. Local notifications (expo-notifications)

Implemented in `utils/notifications.js`:

- **Immediate:** "Event bookmarked!" is sent when an event is added to favorites (`trigger: null`).
- **Timed:** "Remind me" on the detail screen schedules a reminder after 10 seconds using a `TIME_INTERVAL` trigger. The Settings screen also has "Send now" and "Send in 5 seconds" test buttons.

**How I researched it:** I read the Expo Notifications documentation to learn the permission flow (`requestPermissionsAsync`), the foreground handler (`setNotificationHandler`) and the `scheduleNotificationAsync` API with its trigger types. I then created an Android notification channel, tested immediate and timed notifications separately, and finally connected them to the favorite and reminder actions. 

Local notifications work in Expo Go. Remote push notifications do not work in Expo Go on Android and are not used here.

## 8. Run the project

```bash
git clone <YOUR_REPO_URL>
cd ceylonEvents
npm install
npx expo start -c
```

Then open **Expo Go** (SDK 58) on your phone and scan the QR code. The phone and computer must be on the same Wi-Fi. Allow notifications when prompted.

**Tech:** Expo SDK 58, React Native, Expo Router, expo-notifications, JavaScript.

## 9. Hard-coded data

`data/events.js` contains 10 realistic sample events (Kandy Esala Perahera, Galle Literary Festival, Arugam Bay Surf Fest and more) with dates, prices, seats, organizers, descriptions and venue details. Event images are loaded from picsum.photos and need an internet connection.
