import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export interface FoodEntry {
  id: string;
  name: string;
  brand?: string;
  quantity: number;
  unit: 'grams' | 'oz' | 'cups' | 'pieces' | 'ml' | 'liters';
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
  fiber?: number; // grams
  sugar?: number; // grams
  sodium?: number; // mg
  meal: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  date: string; // ISO date string
  createdAt: string;
}

export interface NutritionGoals {
  id: string;
  userId?: string;
  dailyCalories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
  fiber: number; // grams
  water: number; // liters
  createdAt: string;
  updatedAt: string;
}

// Sample nutrition data
let foodEntries: FoodEntry[] = [
  {
    id: '1',
    name: 'Chicken Breast',
    brand: 'Organic',
    quantity: 150,
    unit: 'grams',
    calories: 231,
    protein: 43.5,
    carbs: 0,
    fat: 5,
    fiber: 0,
    sugar: 0,
    sodium: 74,
    meal: 'lunch',
    date: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Oatmeal',
    quantity: 0.5,
    unit: 'cups',
    calories: 154,
    protein: 5.3,
    carbs: 27.4,
    fat: 3.2,
    fiber: 4,
    sugar: 0.6,
    sodium: 2,
    meal: 'breakfast',
    date: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
  }
];

let nutritionGoals: NutritionGoals[] = [
  {
    id: '1',
    dailyCalories: 2000,
    protein: 150, // 30% of calories
    carbs: 200, // 40% of calories
    fat: 67, // 30% of calories
    fiber: 25,
    water: 2.5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// GET /api/nutrition - Get food entries
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  const meal = searchParams.get('meal');
  const type = searchParams.get('type'); // 'entries' or 'goals'

  if (type === 'goals') {
    return NextResponse.json({
      success: true,
      data: nutritionGoals[0] || null
    });
  }

  let filteredEntries = foodEntries;

  if (date) {
    filteredEntries = filteredEntries.filter(entry => entry.date === date);
  } else {
    // Default to today's entries
    const today = new Date().toISOString().split('T')[0];
    filteredEntries = filteredEntries.filter(entry => entry.date === today);
  }

  if (meal) {
    filteredEntries = filteredEntries.filter(entry => entry.meal === meal);
  }

  // Calculate daily totals
  const dailyTotals = filteredEntries.reduce((totals, entry) => ({
    calories: totals.calories + entry.calories,
    protein: totals.protein + entry.protein,
    carbs: totals.carbs + entry.carbs,
    fat: totals.fat + entry.fat,
    fiber: totals.fiber + (entry.fiber || 0),
    sugar: totals.sugar + (entry.sugar || 0),
    sodium: totals.sodium + (entry.sodium || 0),
  }), {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,
    sodium: 0,
  });

  return NextResponse.json({
    success: true,
    data: {
      entries: filteredEntries,
      totals: dailyTotals,
      goals: nutritionGoals[0]
    }
  });
}

// POST /api/nutrition - Add a food entry or update goals
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type } = body;

    if (type === 'goal') {
      // Update nutrition goals
      const { dailyCalories, protein, carbs, fat, fiber, water } = body;

      if (!dailyCalories || !protein || !carbs || !fat) {
        return NextResponse.json(
          { success: false, error: 'All macronutrient goals are required' },
          { status: 400 }
        );
      }

      const updatedGoals: NutritionGoals = {
        id: nutritionGoals[0]?.id || uuidv4(),
        dailyCalories,
        protein,
        carbs,
        fat,
        fiber: fiber || 25,
        water: water || 2.5,
        createdAt: nutritionGoals[0]?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (nutritionGoals.length === 0) {
        nutritionGoals.push(updatedGoals);
      } else {
        nutritionGoals[0] = updatedGoals;
      }

      return NextResponse.json({
        success: true,
        data: updatedGoals
      });
    }

    // Add food entry
    const { name, brand, quantity, unit, calories, protein, carbs, fat, fiber, sugar, sodium, meal, date } = body;

    if (!name || !quantity || !unit || !calories || !meal) {
      return NextResponse.json(
        { success: false, error: 'Name, quantity, unit, calories, and meal are required' },
        { status: 400 }
      );
    }

    const newEntry: FoodEntry = {
      id: uuidv4(),
      name,
      brand: brand || undefined,
      quantity,
      unit,
      calories,
      protein: protein || 0,
      carbs: carbs || 0,
      fat: fat || 0,
      fiber: fiber || undefined,
      sugar: sugar || undefined,
      sodium: sodium || undefined,
      meal,
      date: date || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
    };

    foodEntries.push(newEntry);

    return NextResponse.json({
      success: true,
      data: newEntry
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process nutrition data' },
      { status: 500 }
    );
  }
}

// DELETE /api/nutrition - Delete food entry
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Entry ID is required' },
        { status: 400 }
      );
    }

    const entryIndex = foodEntries.findIndex(entry => entry.id === id);

    if (entryIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Food entry not found' },
        { status: 404 }
      );
    }

    const deletedEntry = foodEntries.splice(entryIndex, 1)[0];

    return NextResponse.json({
      success: true,
      data: deletedEntry
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete food entry' },
      { status: 500 }
    );
  }
}