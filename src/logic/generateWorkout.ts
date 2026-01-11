import { homeExercises, gymExercises, Level } from '../data/exercises';
import { seededRandom } from '../utils/seed';

export type Exercise = {
  name: string;
  sets: number;
  reps?: number;
  durationSec?: number;
  restSec: number;
};

export type WorkoutPlan = {
  title: string;
  mode: 'home'|'gym';
  level: 'Beginner'|'Intermediate'|'Advanced';
  duration: number; // minutes estimate
  exercises: Exercise[];
};

export async function generateWorkoutForDate(dateKey: string, opts: { level: Level, mode: 'home'|'gym', mood: 'tired'|'normal'|'energetic' }): Promise<WorkoutPlan> {
  const pool = opts.mode === 'home' ? homeExercises : gymExercises;
  const levelIdx = opts.level === 'Beginner' ? 0 : opts.level === 'Intermediate' ? 1 : 2;
  const rnd = seededRandom(dateKey + opts.level + opts.mode + opts.mood);

  // Choose 5–7 exercises deterministically
  const count = 5 + Math.floor(rnd()*3);
  const selected = [...pool].sort(() => rnd() - 0.5).slice(0, count);

  // Mood modifiers
  const moodMod = opts.mood === 'tired' ? { sets: 2, restMul: 1.2 } : opts.mood === 'energetic' ? { sets: 4, restMul: 0.8 } : { sets: 3, restMul: 1 };

  const exercises = selected.map((e) => {
    const reps = (e as any).reps ? (e as any).reps[levelIdx] : undefined;
    const durationSec = (e as any).durationSec ? (e as any).durationSec[levelIdx] : undefined;
    const baseRest = (e as any).restSec[levelIdx];
    return {
      name: (e as any).name,
      sets: moodMod.sets,
      reps,
      durationSec,
      restSec: Math.round(baseRest * moodMod.restMul),
    } as Exercise;
  });

  // Rough duration estimation: assume each set ~ (reps*3s or durationSec) + rest
  let totalSec = 0;
  exercises.forEach((ex) => {
    for (let s = 0; s < ex.sets; s++) {
      const work = ex.reps ? ex.reps * 3 : (ex.durationSec || 30);
      const rest = s < ex.sets - 1 ? ex.restSec : 0;
      totalSec += work + rest;
    }
  });
  const durationMin = Math.max(20, Math.min(40, Math.round(totalSec / 60)));

  const title = opts.mode === 'home' ? `Home Full Body` : `Gym Full Body`;
  return { title, mode: opts.mode, level: opts.level, duration: durationMin, exercises };
}
