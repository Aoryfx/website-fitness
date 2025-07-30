# FitTracker Pro - Mobile Application

A React Native mobile app built with Expo for comprehensive fitness task management with offline capabilities and user authentication.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start Expo development server
npm start

# Run on iOS simulator (macOS only)
npm run ios

# Run on Android emulator
npm run android

# Run in web browser
npm run web
```

## 📱 Demo Login

Use these credentials to test the app:
- **Email**: demo@fittracker.com
- **Password**: password123

## 🌟 Features

- ✅ User authentication (demo implementation)
- ✅ Offline task management with SQLite
- ✅ Cross-platform (iOS & Android)
- ✅ Tab-based navigation
- ✅ Real-time task creation and updates
- ✅ Data synchronization tracking
- ✅ Modern Material Design UI

## 🛠️ Technology Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation 6
- **Database**: SQLite (expo-sqlite)
- **Storage**: AsyncStorage
- **Icons**: Expo Vector Icons
- **State Management**: React Context + Hooks

## 📱 App Structure

```
src/
├── screens/              # App screens
│   ├── auth/            # Authentication screens
│   │   └── LoginScreen.tsx
│   ├── TasksScreen.tsx   # Main task management
│   ├── WorkoutsScreen.tsx # Workout plans (placeholder)
│   ├── NutritionScreen.tsx # Nutrition tracking (placeholder)
│   └── ProfileScreen.tsx  # User profile
├── context/             # State management
│   ├── AuthContext.tsx  # Authentication state
│   └── TaskContext.tsx  # Task management state
├── services/            # Business logic
│   └── database.ts      # SQLite operations
└── components/          # Reusable components
```

## 🗃️ Database Schema

### Tasks Table
```sql
CREATE TABLE tasks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  completed INTEGER DEFAULT 0,
  priority TEXT NOT NULL,
  dueDate TEXT,
  calories INTEGER,
  duration INTEGER,
  equipment TEXT,
  userId TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL,
  synced INTEGER DEFAULT 0
);
```

## 🎯 Key Features

### Task Management
- Create tasks with fitness-specific fields
- Mark tasks as complete/incomplete
- Delete tasks with confirmation
- Categories: workout, nutrition, equipment, general
- Priority levels: low, medium, high
- Offline storage with sync tracking

### User Authentication
- Simple demo authentication
- Persistent login state
- Secure logout functionality

### Offline Capabilities
- Full CRUD operations work offline
- SQLite database for local storage
- Sync status tracking for online updates
- AsyncStorage for user session

## 🔧 Development

```bash
# Start development
npm start

# Clear cache
npx expo start --clear

# Type checking
npx tsc --noEmit

# iOS development (macOS only)
npx expo run:ios

# Android development
npx expo run:android
```

## 📱 Testing

### Physical Device
1. Install Expo Go from App Store/Play Store
2. Run `npm start`
3. Scan QR code with Expo Go

### Simulators
- **iOS**: Requires Xcode (macOS only)
- **Android**: Requires Android Studio

## 🚀 Building for Production

```bash
# Build for Android
eas build --platform android

# Build for iOS (requires Apple Developer Account)
eas build --platform ios

# Build for both platforms
eas build --platform all
```

## 📦 Dependencies

### Core Dependencies
- `expo` - Expo SDK
- `react-navigation` - Navigation library
- `expo-sqlite` - SQLite database
- `@react-native-async-storage/async-storage` - Local storage

### Development Dependencies
- `typescript` - Type safety
- `@types/*` - Type definitions

## 🔒 Security Notes

This app uses simplified authentication for demo purposes. For production:
- Implement secure authentication (JWT, OAuth)
- Add input validation
- Secure API communications
- Implement proper error handling
- Add user data encryption

## 🌟 Future Enhancements

- Real-time data synchronization
- Push notifications
- Workout timer functionality
- Progress photos
- Social features
- Wearable device integration

## 🐛 Troubleshooting

### Common Issues

**Metro bundler issues:**
```bash
npx expo start --clear
```

**Dependencies issues:**
```bash
rm -rf node_modules
npm install
```

**iOS simulator not starting:**
```bash
npx expo run:ios --device
```

## 📱 Supported Platforms

- iOS 11.0+
- Android 6.0+ (API level 23+)
- Expo Go app

---

Built with ❤️ using React Native and Expo