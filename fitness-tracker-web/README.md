# FitTracker Pro - Web Application

A modern Next.js web application for comprehensive fitness management, featuring task tracking, workout plans, nutrition monitoring, and equipment safety guidelines.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Available Pages

- **Homepage** (`/`) - Landing page with features overview
- **Tasks** (`/tasks`) - Fitness task management with filtering
- **Workouts** (`/workouts`) - Professional workout plans
- **Nutrition** (`/nutrition`) - Calorie and macro tracking
- **Safety** (`/safety`) - Equipment safety guidelines

## 🔌 API Endpoints

### Tasks API
- `GET /api/tasks` - Get all tasks with optional filtering
- `POST /api/tasks` - Create new task
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

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **API**: Next.js API Routes
- **State Management**: React Hooks
- **Data Storage**: In-memory (demo)

## 📱 Features

- ✅ Responsive design for all devices
- ✅ Modern UI with fitness-focused theme
- ✅ Complete task CRUD operations
- ✅ Workout plan management
- ✅ Nutrition tracking
- ✅ Equipment safety guidelines
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for rapid styling

## 🎯 Project Structure

```
src/
├── app/
│   ├── api/              # API routes
│   │   ├── tasks/        # Task management endpoints
│   │   ├── workouts/     # Workout plan endpoints
│   │   └── nutrition/    # Nutrition tracking endpoints
│   ├── tasks/            # Task management pages
│   ├── workouts/         # Workout plan pages
│   ├── nutrition/        # Nutrition tracking pages
│   ├── safety/           # Safety guidelines pages
│   └── page.tsx          # Homepage
└── components/           # Reusable components
```

## 🔧 Development

```bash
# Run development server
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Build production
npm run build
```

## 🌟 Key Features

### Task Management
- Create, read, update, delete tasks
- Filter by category (workout, nutrition, equipment, general)
- Priority levels (low, medium, high)
- Fitness-specific metadata (calories, duration, equipment)
- Progress tracking and statistics

### Workout Plans
- Pre-built workout routines
- Exercise details with sets, reps, and rest times
- Equipment requirements
- Target muscle groups
- Safety tips for each exercise

### Nutrition Tracking
- Daily calorie and macro tracking
- Meal categorization
- Progress towards daily goals
- Food database with nutritional information

## 📊 Sample Data

The application includes sample data for:
- Fitness tasks with various categories
- Professional workout plans for different levels
- Nutrition entries with macro breakdowns

## 🚀 Deployment

This application can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Digital Ocean App Platform**
- Any platform supporting Node.js

## 🔒 Production Considerations

For production deployment, consider:
- Database integration (PostgreSQL, MongoDB)
- User authentication system
- Environment variable management
- Error logging and monitoring
- Performance optimization
- SEO optimization

---

Built with ❤️ using Next.js and Tailwind CSS
