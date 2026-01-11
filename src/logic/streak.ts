import { getItem, setItem } from '../storage/storage';
import { getTodayKey, getYesterdayKey } from '../utils/date';

export type StreakState = { currentStreak: number; lastActiveDate?: string; totalWorkouts: number };

const KEY = 'stats';

export async function getStreak(): Promise<StreakState> {
  const raw = await getItem<any>(KEY);
  return raw?.streak || { currentStreak: 0, lastActiveDate: undefined, totalWorkouts: 0 };
}

export async function recordTodayCompletion(completed: boolean): Promise<StreakState> {
  const today = getTodayKey();
  const yday = getYesterdayKey();
  const prev = await getItem<any>(KEY);
  const old: StreakState = prev?.streak || { currentStreak: 0, lastActiveDate: undefined, totalWorkouts: 0 };
  let currentStreak = old.currentStreak;
  let lastActiveDate = old.lastActiveDate;
  let totalWorkouts = old.totalWorkouts;

  if (completed) {
    if (lastActiveDate === yday) {
      currentStreak = currentStreak + 1;
    } else if (lastActiveDate === today) {
      // already counted; do nothing
    } else {
      currentStreak = 1; // reset
    }
    lastActiveDate = today;
    totalWorkouts += 1;
  }

  const next: StreakState = { currentStreak, lastActiveDate, totalWorkouts };
  await setItem(KEY, { ...(prev||{}), streak: next });
  return next;
}
