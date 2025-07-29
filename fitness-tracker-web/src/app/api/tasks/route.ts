import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// In-memory storage for demo purposes
// In production, you'd use a database like PostgreSQL with Prisma
let tasks: Task[] = [
  {
    id: '1',
    title: 'Morning Cardio',
    description: '30 minutes treadmill run',
    category: 'workout',
    completed: false,
    priority: 'high',
    dueDate: new Date().toISOString(),
    calories: 300,
    duration: 30,
    equipment: ['Treadmill'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Log breakfast calories',
    description: 'Track morning meal nutrition',
    category: 'nutrition',
    completed: false,
    priority: 'medium',
    dueDate: new Date().toISOString(),
    calories: 450,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export interface Task {
  id: string;
  title: string;
  description?: string;
  category: 'workout' | 'nutrition' | 'general' | 'equipment';
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  calories?: number;
  duration?: number; // in minutes
  equipment?: string[];
  createdAt: string;
  updatedAt: string;
}

// GET /api/tasks - Get all tasks
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const completed = searchParams.get('completed');

  let filteredTasks = tasks;

  if (category) {
    filteredTasks = filteredTasks.filter(task => task.category === category);
  }

  if (completed !== null) {
    const isCompleted = completed === 'true';
    filteredTasks = filteredTasks.filter(task => task.completed === isCompleted);
  }

  return NextResponse.json({
    success: true,
    data: filteredTasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  });
}

// POST /api/tasks - Create a new task
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { title, description, category, priority, dueDate, calories, duration, equipment } = body;

    if (!title || !category || !priority) {
      return NextResponse.json(
        { success: false, error: 'Title, category, and priority are required' },
        { status: 400 }
      );
    }

    const newTask: Task = {
      id: uuidv4(),
      title,
      description: description || '',
      category,
      completed: false,
      priority,
      dueDate: dueDate || new Date().toISOString(),
      calories: calories || 0,
      duration: duration || 0,
      equipment: equipment || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    tasks.push(newTask);

    return NextResponse.json({
      success: true,
      data: newTask
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create task' },
      { status: 500 }
    );
  }
}

// PUT /api/tasks - Update multiple tasks (bulk update)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { ids, updates } = body;

    if (!ids || !Array.isArray(ids) || !updates) {
      return NextResponse.json(
        { success: false, error: 'Task IDs array and updates object are required' },
        { status: 400 }
      );
    }

    const updatedTasks: Task[] = [];

    ids.forEach(id => {
      const taskIndex = tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        tasks[taskIndex] = {
          ...tasks[taskIndex],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
        updatedTasks.push(tasks[taskIndex]);
      }
    });

    return NextResponse.json({
      success: true,
      data: updatedTasks
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update tasks' },
      { status: 500 }
    );
  }
}

// DELETE /api/tasks - Delete multiple tasks
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idsParam = searchParams.get('ids');

    if (!idsParam) {
      return NextResponse.json(
        { success: false, error: 'Task IDs are required' },
        { status: 400 }
      );
    }

    const ids = idsParam.split(',');
    const deletedTasks: Task[] = [];

    ids.forEach(id => {
      const taskIndex = tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        deletedTasks.push(tasks[taskIndex]);
        tasks.splice(taskIndex, 1);
      }
    });

    return NextResponse.json({
      success: true,
      data: deletedTasks
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete tasks' },
      { status: 500 }
    );
  }
}