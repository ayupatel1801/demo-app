// Minimal pools for deterministic generation respecting Indian-friendly moves
export type Level = 'Beginner'|'Intermediate'|'Advanced';

export const homeExercises = [
  { name: 'Jumping Jacks', reps: [20, 30, 40], restSec: [30, 25, 20] },
  { name: 'Bodyweight Squats', reps: [12, 15, 20], restSec: [45, 40, 30] },
  { name: 'Forward Lunges', reps: [10, 12, 15], restSec: [45, 40, 30] },
  { name: 'Glute Bridge', reps: [12, 15, 20], restSec: [45, 40, 30] },
  { name: 'Push-ups (Incline for beginners)', reps: [8, 12, 15], restSec: [60, 45, 30] },
  { name: 'Hindu Push-ups', reps: [5, 8, 12], restSec: [60, 45, 30] },
  { name: 'Plank', durationSec: [30, 40, 60], restSec: [45, 40, 30] },
  { name: 'Mountain Climbers', reps: [20, 30, 40], restSec: [45, 40, 30] },
  { name: 'Wall Sit', durationSec: [30, 45, 60], restSec: [45, 40, 30] },
  { name: 'Surya Namaskar', reps: [4, 6, 8], restSec: [60, 45, 30] },
];

export const gymExercises = [
  { name: 'Dumbbell Bench Press', reps: [10, 12, 12], restSec: [90, 75, 60] },
  { name: 'Lat Pulldown', reps: [10, 12, 12], restSec: [90, 75, 60] },
  { name: 'Seated Row', reps: [10, 12, 12], restSec: [90, 75, 60] },
  { name: 'Goblet Squat', reps: [10, 12, 15], restSec: [90, 75, 60] },
  { name: 'Romanian Deadlift', reps: [8, 10, 12], restSec: [90, 75, 60] },
  { name: 'Overhead Press (DB)', reps: [8, 10, 12], restSec: [90, 75, 60] },
  { name: 'Cable Face Pull', reps: [12, 15, 15], restSec: [60, 60, 45] },
  { name: 'Cable Crunch', reps: [12, 15, 20], restSec: [60, 60, 45] },
];
