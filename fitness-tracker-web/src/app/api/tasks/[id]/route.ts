import { NextRequest, NextResponse } from 'next/server';
import { Task } from '../route';

// Import the tasks array - in production this would be a database query
import '../route';

declare global {
  var tasks: Task[];
}

// We need to access the tasks array from the main route
// In production, this would be database operations

// GET /api/tasks/[id] - Get a specific task
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Access tasks from global or import from database
    const { tasks } = require('../route');
    const task = tasks.find((t: Task) => t.id === params.id);

    if (!task) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: task
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch task' },
      { status: 500 }
    );
  }
}

// PUT /api/tasks/[id] - Update a specific task
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { tasks } = require('../route');
    
    const taskIndex = tasks.findIndex((t: Task) => t.id === params.id);

    if (taskIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    const updatedTask: Task = {
      ...tasks[taskIndex],
      ...body,
      id: params.id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    };

    tasks[taskIndex] = updatedTask;

    return NextResponse.json({
      success: true,
      data: updatedTask
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

// DELETE /api/tasks/[id] - Delete a specific task
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { tasks } = require('../route');
    const taskIndex = tasks.findIndex((t: Task) => t.id === params.id);

    if (taskIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];

    return NextResponse.json({
      success: true,
      data: deletedTask
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}