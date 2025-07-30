import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Task, addTask, getTasks, updateTask, deleteTask as deleteTaskFromDb } from '../services/database';
import { useAuth } from './AuthContext';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  addNewTask: (task: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'synced'>) => Promise<void>;
  updateExistingTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteExistingTask: (id: string) => Promise<void>;
  refreshTasks: () => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      refreshTasks();
    } else {
      setTasks([]);
    }
  }, [user]);

  const refreshTasks = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const userTasks = await getTasks(user.id);
      setTasks(userTasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const addNewTask = async (taskData: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'synced'>) => {
    if (!user) return;
    
    try {
      const id = await addTask({ ...taskData, userId: user.id });
      await refreshTasks(); // Refresh to get the new task
    } catch (error) {
      console.error('Failed to add task:', error);
      throw error;
    }
  };

  const updateExistingTask = async (id: string, updates: Partial<Task>) => {
    try {
      await updateTask(id, updates);
      await refreshTasks(); // Refresh to get updated data
    } catch (error) {
      console.error('Failed to update task:', error);
      throw error;
    }
  };

  const deleteExistingTask = async (id: string) => {
    try {
      await deleteTaskFromDb(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
      throw error;
    }
  };

  const value: TaskContextType = {
    tasks,
    loading,
    addNewTask,
    updateExistingTask,
    deleteExistingTask,
    refreshTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};