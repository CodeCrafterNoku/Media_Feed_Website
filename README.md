
# React Native Media Feed App

This is a React Native,Type Script project built with **Expo**. It demonstrates a social media feed with posts, notifications, and reminders.

---

## 📦 Dependencies

This project uses the following packages:

* **React & React Native** (core)
* **expo-blur** → for blur effects
* **expo-linear-gradient** → for gradient backgrounds
* **@expo/vector-icons** → for icons (Ionicons, etc.)
* **expo-notifications** → for handling push/local notifications
* **expo-status-bar** → for status bar management (comes with Expo)

---

## ⚙️ Installation

1. **Clone the repo**

```bash
git clone <your-repo-url>
cd MediaFeedApp
```

2. **Install Expo CLI (if not installed)**

```bash
npm install -g expo-cli
```

3. **Install dependencies**

Run this in the project root:

```bash
npm install react react-native
npm install expo-blur
npm install expo-linear-gradient
npm install @expo/vector-icons
npm install expo-notifications
expo install expo-status-bar
npm install --save-dev typescript @types/react @types/react-native @types/react-dom
npm install --save-dev jest @testing-library/react-native @testing-library/jest-native jest-expo @types/jest
npm install --save-dev jest ts-jest @types/jest babel-jest @babel/preset-env @babel/preset-typescript
npm install --save-dev babel-preset-expo
```

Or all at once:

```bash
npm install react react-native expo-blur expo-linear-gradient @expo/vector-icons expo-notifications
expo install expo-status-bar
```

---

## ▶️ Running the project

1. Start the Expo development server:

```bash
npx expo start
```

2. Open the app:

   * On Android → scan the QR code with **Expo Go** app
   * On iOS → scan QR with the Camera app or open Expo Go
   * On Web → press `w` in the terminal

---
## ▶️ Running the test
1. npm test

## 🛠️ Project Structure

```
.
├── App.js
├── src/
│   ├── api/
│   │   └── mockApi.js
│   ├── components/
│   │   └── PostCard.js
│   ├── data/
│   │   └── posts.js
│   ├── notifications.js
│   └── utils/
│       ├── money.js
│       └── time.js
```

* `mockApi.js` → fetches mock posts
* `PostCard.js` → UI component for posts
* `notifications.js` → notification handling (permission requests, reminders)
* `money.js` → ZAR currency formatting
* `time.js` → time helpers
### Home Screen
![Screenshot](https://res.cloudinary.com/diet4t4b9/image/upload/v1756381608/Screenshot_2025-08-28_114444_j5t7in.png)
![Screenshot](https://res.cloudinary.com/diet4t4b9/image/upload/v1756382335/Screenshot_2025-08-28_135716_rpdnqz.png)






