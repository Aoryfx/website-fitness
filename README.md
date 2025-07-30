# FitTracker Pro - Complete Fitness Management System

A comprehensive fitness management system consisting of a Next.js web application and React Native mobile app, designed for fitness enthusiasts who want to track their workouts, nutrition, and fitness tasks with both online and offline capabilities.

## 🏗️ Project Structure

```
├── fitness-tracker-web/          # Next.js Web Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── api/              # API Routes (CRUD operations)
│   │   │   ├── tasks/            # Task management pages
│   │   │   ├── workouts/         # Workout plans pages
│   │   │   └── nutrition/        # Nutrition tracking pages
│   │   └── components/           # Reusable React components
│   ├── package.json
│   └── tailwind.config.ts
│
└── fitness-tracker-mobile/       # React Native Mobile App
    ├── src/
    │   ├── screens/              # App screens
    │   ├── context/              # State management contexts
    │   ├── services/             # Database and API services
    │   └── components/           # Reusable RN components
    ├── App.tsx
    └── package.json
```

## 🌟 Features

### Web Application (Next.js)
- **Modern Homepage**: Beautiful landing page with fitness-focused design
- **Task Management**: Complete CRUD operations for fitness tasks
- **Workout Plans**: Professional workout plans with exercise details and safety tips
- **Nutrition Tracking**: Calorie and macro tracking with daily goals
- **Equipment Safety**: Safety guidelines and proper equipment usage
- **Responsive Design**: Works on desktop, tablet, and mobile browsers
- **API Integration**: RESTful API endpoints for all operations

### Mobile Application (React Native)
- **User Authentication**: Simple demo authentication system
- **Offline Storage**: SQLite database for offline task management
- **Task Management**: Create, update, delete fitness tasks offline
- **Data Synchronization**: Tracks which data needs syncing when online
- **Cross-Platform**: Works on both iOS and Android
- **Native Navigation**: Tab-based navigation with modern UI

## 🚀 Quick Start

### Web Application Setup

1. **Navigate to the web directory:**
   ```bash
   cd fitness-tracker-web
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   ```
   http://localhost:3000
   ```

### Mobile Application Setup

1. **Navigate to the mobile directory:**
   ```bash
   cd fitness-tracker-mobile
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the Expo development server:**
   ```bash
   npm start
   ```

4. **Run on your device:**
   - Install the Expo Go app on your phone
   - Scan the QR code displayed in your terminal
   - Or use `npm run ios` / `npm run android` for simulators

## 📱 Demo Credentials

For the mobile app authentication:
- **Email**: demo@fittracker.com
- **Password**: password123

## 🛠️ Technology Stack

### Web Application
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **State Management**: React Hooks
- **API**: Next.js API Routes
- **Authentication**: Simple demo implementation

### Mobile Application
- **Framework**: React Native with Expo
- **Navigation**: React Navigation 6
- **Database**: SQLite (expo-sqlite)
- **Storage**: AsyncStorage
- **Icons**: Expo Vector Icons
- **State Management**: React Context + Hooks
- **Authentication**: Simple demo implementation

## 🗃️ Database Schema (Mobile)

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

### Nutrition Entries Table
```sql
CREATE TABLE nutrition_entries (
  id TEXT PRIMARY KEY,
  foodName TEXT NOT NULL,
  quantity REAL NOT NULL,
  unit TEXT NOT NULL,
  calories REAL NOT NULL,
  protein REAL NOT NULL,
  carbs REAL NOT NULL,
  fat REAL NOT NULL,
  meal TEXT NOT NULL,
  userId TEXT NOT NULL,
  date TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  synced INTEGER DEFAULT 0
);
```

## 🔌 API Endpoints (Web)

### Tasks API
- `GET /api/tasks` - Get all tasks (with filtering)
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks` - Bulk update tasks
- `DELETE /api/tasks` - Delete multiple tasks
- `GET /api/tasks/[id]` - Get specific task
- `PUT /api/tasks/[id]` - Update specific task
- `DELETE /api/tasks/[id]` - Delete specific task

### Workouts API
- `GET /api/workouts` - Get workout plans
- `POST /api/workouts` - Create workout plan

### Nutrition API
- `GET /api/nutrition` - Get nutrition entries
- `POST /api/nutrition` - Add nutrition entry
- `DELETE /api/nutrition` - Delete nutrition entry

## 🎯 Key Features Breakdown

### Task Management
- **Categories**: Workout, Nutrition, Equipment, General
- **Priorities**: Low, Medium, High
- **Fitness-Specific Fields**: Calories, Duration, Equipment
- **Progress Tracking**: Completion status and statistics
- **Offline Support**: Full CRUD operations work offline on mobile

### Workout Plans
- **Difficulty Levels**: Beginner, Intermediate, Advanced
- **Exercise Details**: Sets, reps, rest time, descriptions
- **Safety Tips**: Comprehensive safety guidelines for each exercise
- **Equipment Lists**: Required equipment for each workout
- **Target Muscles**: Muscle groups targeted by each exercise

### Nutrition Tracking
- **Meal Categories**: Breakfast, Lunch, Dinner, Snacks
- **Macro Tracking**: Calories, protein, carbs, fat, fiber
- **Daily Goals**: Customizable nutrition targets
- **Progress Monitoring**: Daily totals and goal achievement

## 🔒 Security Considerations

**Note**: This is a demo application with simplified authentication. For production use, implement:
- Secure authentication (JWT, OAuth, etc.)
- Input validation and sanitization
- Rate limiting
- HTTPS enforcement
- Secure database connections
- Environment variable management

## 🎨 Design Philosophy

- **Fitness-First**: UI designed specifically for fitness enthusiasts
- **Mobile-First**: Responsive design prioritizing mobile experience
- **Accessibility**: Clear typography, good contrast, intuitive navigation
- **Performance**: Optimized for fast loading and smooth interactions
- **Offline-First**: Mobile app works seamlessly without internet connection

## 🚧 Future Enhancements

### Planned Features
- **Workout Timer**: Built-in timer for workout sessions
- **Progress Photos**: Photo tracking for visual progress
- **Social Features**: Share workouts and achievements
- **Wearable Integration**: Sync with fitness trackers
- **Advanced Analytics**: Detailed progress charts and insights
- **Meal Planning**: AI-powered meal suggestions
- **Expert Content**: Professional trainer guidance

### Technical Improvements
- **Real Authentication**: Secure user management system
- **Cloud Sync**: Real-time data synchronization
- **Push Notifications**: Workout reminders and achievements
- **Caching Strategy**: Improved offline experience
- **Performance Optimization**: Bundle splitting, lazy loading
- **Testing Suite**: Comprehensive unit and integration tests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team**: For the excellent React framework
- **Expo Team**: For simplifying React Native development
- **Tailwind CSS**: For the utility-first CSS framework
- **Heroicons**: For the beautiful icon set
- **React Navigation**: For smooth mobile navigation

## 📞 Support

For support, email support@fittrackerpro.com or create an issue in this repository.

---

**Built with ❤️ for the fitness community**
