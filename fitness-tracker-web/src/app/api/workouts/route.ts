import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  exercises: Exercise[];
  equipment: string[];
  targetMuscles: string[];
  estimatedCalories: number;
  createdAt: string;
  updatedAt: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number | string; // can be "to failure" or a number
  restTime: number; // in seconds
  description: string;
  muscleGroups: string[];
  equipment: string[];
  safetyTips: string[];
}

// Sample workout plans data
let workoutPlans: WorkoutPlan[] = [
  {
    id: '1',
    name: 'Beginner Full Body',
    description: 'A complete full-body workout for beginners focusing on form and basic movements',
    level: 'beginner',
    duration: 45,
    equipment: ['Dumbbells', 'Bench', 'Pull-up bar'],
    targetMuscles: ['Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core'],
    estimatedCalories: 250,
    exercises: [
      {
        id: 'ex1',
        name: 'Push-ups',
        sets: 3,
        reps: '8-12',
        restTime: 60,
        description: 'Classic bodyweight chest exercise',
        muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
        equipment: [],
        safetyTips: [
          'Keep your body in a straight line',
          'Don\'t let your hips sag',
          'Control the movement - don\'t rush'
        ]
      },
      {
        id: 'ex2',
        name: 'Bodyweight Squats',
        sets: 3,
        reps: '12-15',
        restTime: 60,
        description: 'Fundamental lower body exercise',
        muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'],
        equipment: [],
        safetyTips: [
          'Keep knees in line with toes',
          'Don\'t let knees cave inward',
          'Go down until thighs are parallel to floor'
        ]
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'HIIT Cardio Blast',
    description: 'High-intensity interval training for maximum calorie burn',
    level: 'intermediate',
    duration: 30,
    equipment: ['Timer'],
    targetMuscles: ['Full Body', 'Cardiovascular'],
    estimatedCalories: 400,
    exercises: [
      {
        id: 'ex3',
        name: 'Burpees',
        sets: 4,
        reps: '30 seconds',
        restTime: 30,
        description: 'Full body explosive movement',
        muscleGroups: ['Full Body'],
        equipment: [],
        safetyTips: [
          'Land softly when jumping',
          'Maintain proper plank position',
          'Modify by stepping back instead of jumping'
        ]
      },
      {
        id: 'ex4',
        name: 'Mountain Climbers',
        sets: 4,
        reps: '30 seconds',
        restTime: 30,
        description: 'Core and cardio combination',
        muscleGroups: ['Core', 'Shoulders', 'Legs'],
        equipment: [],
        safetyTips: [
          'Keep hips level',
          'Don\'t hold your breath',
          'Maintain plank position throughout'
        ]
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// GET /api/workouts - Get all workout plans
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const level = searchParams.get('level');
  const equipment = searchParams.get('equipment');

  let filteredWorkouts = workoutPlans;

  if (level) {
    filteredWorkouts = filteredWorkouts.filter(workout => workout.level === level);
  }

  if (equipment) {
    const requiredEquipment = equipment.split(',');
    filteredWorkouts = filteredWorkouts.filter(workout => 
      requiredEquipment.every(eq => workout.equipment.includes(eq))
    );
  }

  return NextResponse.json({
    success: true,
    data: filteredWorkouts
  });
}

// POST /api/workouts - Create a new workout plan
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { name, description, level, duration, exercises, equipment, targetMuscles, estimatedCalories } = body;

    if (!name || !description || !level || !exercises) {
      return NextResponse.json(
        { success: false, error: 'Name, description, level, and exercises are required' },
        { status: 400 }
      );
    }

    const newWorkout: WorkoutPlan = {
      id: uuidv4(),
      name,
      description,
      level,
      duration: duration || 30,
      exercises: exercises.map((ex: any) => ({
        ...ex,
        id: ex.id || uuidv4()
      })),
      equipment: equipment || [],
      targetMuscles: targetMuscles || [],
      estimatedCalories: estimatedCalories || 200,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    workoutPlans.push(newWorkout);

    return NextResponse.json({
      success: true,
      data: newWorkout
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create workout plan' },
      { status: 500 }
    );
  }
}