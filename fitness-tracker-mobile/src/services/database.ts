import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'fitness_tracker.db';

export interface Task {
  id: string;
  title: string;
  description?: string;
  category: 'workout' | 'nutrition' | 'general' | 'equipment';
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  calories?: number;
  duration?: number;
  equipment?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  synced: boolean;
}

export interface WorkoutLog {
  id: string;
  workoutName: string;
  exercises: string; // JSON string
  duration: number;
  caloriesBurned: number;
  userId: string;
  completedAt: string;
  synced: boolean;
}

export interface NutritionEntry {
  id: string;
  foodName: string;
  quantity: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meal: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  userId: string;
  date: string;
  createdAt: string;
  synced: boolean;
}

let db: SQLite.SQLiteDatabase;

export const initializeDatabase = async () => {
  try {
    db = await SQLite.openDatabaseAsync(DATABASE_NAME);
    
    // Create tables
    await createTables();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
};

const createTables = async () => {
  // Tasks table
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tasks (
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
  `);

  // Workout logs table
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS workout_logs (
      id TEXT PRIMARY KEY,
      workoutName TEXT NOT NULL,
      exercises TEXT NOT NULL,
      duration INTEGER NOT NULL,
      caloriesBurned INTEGER NOT NULL,
      userId TEXT NOT NULL,
      completedAt TEXT NOT NULL,
      synced INTEGER DEFAULT 0
    );
  `);

  // Nutrition entries table
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS nutrition_entries (
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
  `);
};

// Task operations
export const addTask = async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'synced'>): Promise<string> => {
  const id = Date.now().toString() + Math.random().toString(36).substr(2, 5);
  const now = new Date().toISOString();
  
  await db.runAsync(
    `INSERT INTO tasks (id, title, description, category, completed, priority, dueDate, calories, duration, equipment, userId, createdAt, updatedAt, synced)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      task.title,
      task.description || '',
      task.category,
      task.completed ? 1 : 0,
      task.priority,
      task.dueDate || '',
      task.calories || 0,
      task.duration || 0,
      task.equipment || '',
      task.userId,
      now,
      now,
      0
    ]
  );
  
  return id;
};

export const getTasks = async (userId: string): Promise<Task[]> => {
  const result = await db.getAllAsync(
    'SELECT * FROM tasks WHERE userId = ? ORDER BY createdAt DESC',
    [userId]
  );
  
  return result.map((row: any) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    completed: Boolean(row.completed),
    priority: row.priority,
    dueDate: row.dueDate,
    calories: row.calories,
    duration: row.duration,
    equipment: row.equipment,
    userId: row.userId,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    synced: Boolean(row.synced),
  }));
};

export const updateTask = async (id: string, updates: Partial<Task>): Promise<void> => {
  const setClause = Object.keys(updates)
    .filter(key => key !== 'id' && key !== 'createdAt')
    .map(key => `${key} = ?`)
    .join(', ');
  
  const values = Object.keys(updates)
    .filter(key => key !== 'id' && key !== 'createdAt')
    .map(key => {
      const value = (updates as any)[key];
      if (typeof value === 'boolean') return value ? 1 : 0;
      return value;
    });
  
  values.push(new Date().toISOString()); // updatedAt
  values.push(id); // for WHERE clause
  
  await db.runAsync(
    `UPDATE tasks SET ${setClause}, updatedAt = ?, synced = 0 WHERE id = ?`,
    values
  );
};

export const deleteTask = async (id: string): Promise<void> => {
  await db.runAsync('DELETE FROM tasks WHERE id = ?', [id]);
};

// Nutrition operations
export const addNutritionEntry = async (entry: Omit<NutritionEntry, 'id' | 'createdAt' | 'synced'>): Promise<string> => {
  const id = Date.now().toString() + Math.random().toString(36).substr(2, 5);
  const now = new Date().toISOString();
  
  await db.runAsync(
    `INSERT INTO nutrition_entries (id, foodName, quantity, unit, calories, protein, carbs, fat, meal, userId, date, createdAt, synced)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      entry.foodName,
      entry.quantity,
      entry.unit,
      entry.calories,
      entry.protein,
      entry.carbs,
      entry.fat,
      entry.meal,
      entry.userId,
      entry.date,
      now,
      0
    ]
  );
  
  return id;
};

export const getNutritionEntries = async (userId: string, date?: string): Promise<NutritionEntry[]> => {
  let query = 'SELECT * FROM nutrition_entries WHERE userId = ?';
  const params = [userId];
  
  if (date) {
    query += ' AND date = ?';
    params.push(date);
  }
  
  query += ' ORDER BY createdAt DESC';
  
  const result = await db.getAllAsync(query, params);
  
  return result.map((row: any) => ({
    id: row.id,
    foodName: row.foodName,
    quantity: row.quantity,
    unit: row.unit,
    calories: row.calories,
    protein: row.protein,
    carbs: row.carbs,
    fat: row.fat,
    meal: row.meal,
    userId: row.userId,
    date: row.date,
    createdAt: row.createdAt,
    synced: Boolean(row.synced),
  }));
};

export const deleteNutritionEntry = async (id: string): Promise<void> => {
  await db.runAsync('DELETE FROM nutrition_entries WHERE id = ?', [id]);
};

// Workout log operations
export const addWorkoutLog = async (log: Omit<WorkoutLog, 'id' | 'synced'>): Promise<string> => {
  const id = Date.now().toString() + Math.random().toString(36).substr(2, 5);
  
  await db.runAsync(
    `INSERT INTO workout_logs (id, workoutName, exercises, duration, caloriesBurned, userId, completedAt, synced)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      log.workoutName,
      log.exercises,
      log.duration,
      log.caloriesBurned,
      log.userId,
      log.completedAt,
      0
    ]
  );
  
  return id;
};

export const getWorkoutLogs = async (userId: string): Promise<WorkoutLog[]> => {
  const result = await db.getAllAsync(
    'SELECT * FROM workout_logs WHERE userId = ? ORDER BY completedAt DESC',
    [userId]
  );
  
  return result.map((row: any) => ({
    id: row.id,
    workoutName: row.workoutName,
    exercises: row.exercises,
    duration: row.duration,
    caloriesBurned: row.caloriesBurned,
    userId: row.userId,
    completedAt: row.completedAt,
    synced: Boolean(row.synced),
  }));
};

// Sync operations (for when app comes back online)
export const getUnsyncedTasks = async (userId: string): Promise<Task[]> => {
  const result = await db.getAllAsync(
    'SELECT * FROM tasks WHERE userId = ? AND synced = 0',
    [userId]
  );
  
  return result.map((row: any) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    completed: Boolean(row.completed),
    priority: row.priority,
    dueDate: row.dueDate,
    calories: row.calories,
    duration: row.duration,
    equipment: row.equipment,
    userId: row.userId,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    synced: Boolean(row.synced),
  }));
};

export const markTaskAsSynced = async (id: string): Promise<void> => {
  await db.runAsync('UPDATE tasks SET synced = 1 WHERE id = ?', [id]);
};