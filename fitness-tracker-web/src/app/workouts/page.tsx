'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HeartIcon, FireIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';

interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  equipment: string[];
  targetMuscles: string[];
  estimatedCalories: number;
  exercises: Exercise[];
}

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number | string;
  restTime: number;
  description: string;
  muscleGroups: string[];
  equipment: string[];
  safetyTips: string[];
}

const levelColors = {
  beginner: 'text-green-600 bg-green-100',
  intermediate: 'text-yellow-600 bg-yellow-100',
  advanced: 'text-red-600 bg-red-100',
};

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState<WorkoutPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutPlan | null>(null);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await fetch('/api/workouts');
      const data = await response.json();
      if (data.success) {
        setWorkouts(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch workouts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading workouts...</p>
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
              <Link href="/tasks" className="text-gray-700 hover:text-blue-600 transition-colors">
                Tasks
              </Link>
              <Link href="/workouts" className="text-blue-600 font-medium">
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Workout Plans</h1>
          <p className="text-gray-600">Professional workout plans designed for all fitness levels</p>
        </div>

        {/* Workout Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout) => (
            <div key={workout.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{workout.name}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${levelColors[workout.level]}`}>
                    {workout.level}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{workout.description}</p>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span className="flex items-center">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  {workout.duration} min
                </span>
                <span className="flex items-center">
                  <FireIcon className="h-4 w-4 mr-1" />
                  {workout.estimatedCalories} cal
                </span>
                <span className="flex items-center">
                  <UserIcon className="h-4 w-4 mr-1" />
                  {workout.exercises.length} exercises
                </span>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Equipment:</p>
                <div className="flex flex-wrap gap-1">
                  {workout.equipment.map((item, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Target Muscles:</p>
                <div className="flex flex-wrap gap-1">
                  {workout.targetMuscles.map((muscle, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedWorkout(workout)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                View Details
              </button>
            </div>
          ))}
        </div>

        {/* Workout Detail Modal */}
        {selectedWorkout && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedWorkout.name}</h2>
                    <p className="text-gray-600">{selectedWorkout.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedWorkout(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <ClockIcon className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{selectedWorkout.duration}</p>
                    <p className="text-gray-600">Minutes</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <FireIcon className="h-8 w-8 mx-auto text-orange-600 mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{selectedWorkout.estimatedCalories}</p>
                    <p className="text-gray-600">Calories</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <UserIcon className="h-8 w-8 mx-auto text-green-600 mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{selectedWorkout.exercises.length}</p>
                    <p className="text-gray-600">Exercises</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercises</h3>
                  <div className="space-y-4">
                    {selectedWorkout.exercises.map((exercise, index) => (
                      <div key={exercise.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">
                            {index + 1}. {exercise.name}
                          </h4>
                          <span className="text-sm text-gray-500">
                            {exercise.sets} sets × {exercise.reps} reps
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{exercise.description}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {exercise.muscleGroups.map((muscle, idx) => (
                            <span key={idx} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                              {muscle}
                            </span>
                          ))}
                        </div>
                        {exercise.safetyTips.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm font-medium text-red-700 mb-1">Safety Tips:</p>
                            <ul className="text-sm text-red-600 list-disc list-inside">
                              {exercise.safetyTips.map((tip, idx) => (
                                <li key={idx}>{tip}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedWorkout(null)}
                    className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                    Start Workout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}