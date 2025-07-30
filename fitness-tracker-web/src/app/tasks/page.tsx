'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  PlusIcon, 
  CheckIcon, 
  TrashIcon, 
  PencilIcon,
  FunnelIcon,
  HeartIcon,
  FireIcon,
  ClockIcon,
  CogIcon
} from '@heroicons/react/24/outline';

interface Task {
  id: string;
  title: string;
  description?: string;
  category: 'workout' | 'nutrition' | 'general' | 'equipment';
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  calories?: number;
  duration?: number;
  equipment?: string[];
  createdAt: string;
  updatedAt: string;
}

const categoryIcons = {
  workout: FireIcon,
  nutrition: HeartIcon,
  general: ClockIcon,
  equipment: CogIcon,
};

const categoryColors = {
  workout: 'text-orange-600 bg-orange-100',
  nutrition: 'text-green-600 bg-green-100',
  general: 'text-blue-600 bg-blue-100',
  equipment: 'text-purple-600 bg-purple-100',
};

const priorityColors = {
  low: 'text-gray-600 bg-gray-100',
  medium: 'text-yellow-600 bg-yellow-100',
  high: 'text-red-600 bg-red-100',
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState({ category: '', completed: '' });
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: 'general' as Task['category'],
    priority: 'medium' as Task['priority'],
    dueDate: '',
    calories: '',
    duration: '',
    equipment: '',
  });

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const fetchTasks = async () => {
    try {
      const params = new URLSearchParams();
      if (filter.category) params.append('category', filter.category);
      if (filter.completed) params.append('completed', filter.completed);

      const response = await fetch(`/api/tasks?${params.toString()}`);
      const data = await response.json();
      if (data.success) {
        setTasks(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const taskData = {
        ...newTask,
        calories: newTask.calories ? parseInt(newTask.calories) : undefined,
        duration: newTask.duration ? parseInt(newTask.duration) : undefined,
        equipment: newTask.equipment ? newTask.equipment.split(',').map(item => item.trim()) : [],
      };

      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });

      const data = await response.json();
      if (data.success) {
        setTasks([data.data, ...tasks]);
        setNewTask({
          title: '',
          description: '',
          category: 'general',
          priority: 'medium',
          dueDate: '',
          calories: '',
          duration: '',
          equipment: '',
        });
        setShowAddForm(false);
      }
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  const toggleTaskCompletion = async (taskId: string) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;

      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed }),
      });

      const data = await response.json();
      if (data.success) {
        setTasks(tasks.map(t => t.id === taskId ? data.data : t));
      }
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        setTasks(tasks.filter(t => t.id !== taskId));
      }
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalCalories = tasks
    .filter(task => task.completed && task.calories)
    .reduce((sum, task) => sum + (task.calories || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <HeartIcon className="h-8 w-8 text-red-500" />
                <h1 className="ml-2 text-2xl font-bold text-gray-900">FitTracker Pro</h1>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/tasks" className="text-blue-600 font-medium">
                Tasks
              </Link>
              <Link href="/workouts" className="text-gray-700 hover:text-blue-600 transition-colors">
                Workouts
              </Link>
              <Link href="/nutrition" className="text-gray-700 hover:text-blue-600 transition-colors">
                Nutrition
              </Link>
              <Link href="/safety" className="text-gray-700 hover:text-blue-600 transition-colors">
                Safety
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Fitness Tasks</h1>
          <p className="text-gray-600">Manage your fitness goals, workouts, and nutrition tasks</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <CheckIcon className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{completedTasks}</p>
                <p className="text-gray-600">Completed Tasks</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{tasks.length - completedTasks}</p>
                <p className="text-gray-600">Pending Tasks</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <FireIcon className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{totalCalories}</p>
                <p className="text-gray-600">Calories Burned</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Task
          </button>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <select
              value={filter.category}
              onChange={(e) => setFilter({ ...filter, category: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="">All Categories</option>
              <option value="workout">Workout</option>
              <option value="nutrition">Nutrition</option>
              <option value="equipment">Equipment</option>
              <option value="general">General</option>
            </select>

            <select
              value={filter.completed}
              onChange={(e) => setFilter({ ...filter, completed: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="">All Status</option>
              <option value="false">Pending</option>
              <option value="true">Completed</option>
            </select>
          </div>
        </div>

        {/* Add Task Form */}
        {showAddForm && (
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Task</h3>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value as Task['category'] })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="general">General</option>
                    <option value="workout">Workout</option>
                    <option value="nutrition">Nutrition</option>
                    <option value="equipment">Equipment</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Task['priority'] })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Calories (optional)</label>
                  <input
                    type="number"
                    value={newTask.calories}
                    onChange={(e) => setNewTask({ ...newTask, calories: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (mins)</label>
                  <input
                    type="number"
                    value={newTask.duration}
                    onChange={(e) => setNewTask({ ...newTask, duration: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Equipment (comma-separated)</label>
                <input
                  type="text"
                  value={newTask.equipment}
                  onChange={(e) => setNewTask({ ...newTask, equipment: e.target.value })}
                  placeholder="Dumbbells, Treadmill, Yoga Mat"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Task
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <ClockIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
              <p className="text-gray-600">Get started by adding your first fitness task!</p>
            </div>
          ) : (
            tasks.map((task) => {
              const CategoryIcon = categoryIcons[task.category];
              return (
                <div
                  key={task.id}
                  className={`bg-white p-6 rounded-lg shadow-sm border-l-4 ${
                    task.completed ? 'border-green-500' : 'border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <button
                        onClick={() => toggleTaskCompletion(task.id)}
                        className={`mt-1 h-5 w-5 rounded border-2 flex items-center justify-center transition-colors ${
                          task.completed
                            ? 'bg-green-600 border-green-600 text-white'
                            : 'border-gray-300 hover:border-green-400'
                        }`}
                      >
                        {task.completed && <CheckIcon className="h-3 w-3" />}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {task.title}
                          </h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[task.category]}`}>
                            <CategoryIcon className="h-3 w-3 mr-1" />
                            {task.category}
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                            {task.priority}
                          </span>
                        </div>

                        {task.description && (
                          <p className={`text-gray-600 mb-2 ${task.completed ? 'line-through' : ''}`}>
                            {task.description}
                          </p>
                        )}

                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          {task.calories && (
                            <span className="flex items-center">
                              <FireIcon className="h-4 w-4 mr-1" />
                              {task.calories} cal
                            </span>
                          )}
                          {task.duration && (
                            <span className="flex items-center">
                              <ClockIcon className="h-4 w-4 mr-1" />
                              {task.duration} min
                            </span>
                          )}
                          {task.equipment && task.equipment.length > 0 && (
                            <span className="flex items-center">
                              <CogIcon className="h-4 w-4 mr-1" />
                              {task.equipment.join(', ')}
                            </span>
                          )}
                          <span>Created {formatDate(task.createdAt)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}