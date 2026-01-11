import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTodayKey } from '../utils/date';

export type Profile = {
  name: string;
  level: 'Beginner'|'Intermediate'|'Advanced';
  preferredTime: 'morning'|'evening';
  locationPref: 'home'|'gym';
  diet: 'veg'|'nonveg';
  goal: 'fatloss'|'musclegain';
};

type RootState = {
  profile?: Profile;
  streak?: any;
  progress?: { weights: { date: string; kg: number }[]; photos: { date: string; type: 'front'|'side'; uri: string }[] };
  challenges?: { id: string; title: string; days: number; ticks: boolean[] }[];
};

const ROOT_KEY = 'root_state_v1';

export async function getItem<T>(key: string): Promise<T | undefined> {
  const raw = await AsyncStorage.getItem(ROOT_KEY);
  if (!raw) return undefined;
  const obj: RootState = JSON.parse(raw);
  return (obj as any)[key];
}

export async function setItem(key: string, value: any) {
  const raw = await AsyncStorage.getItem(ROOT_KEY);
  const obj: RootState = raw ? JSON.parse(raw) : {};
  (obj as any)[key] = value;
  await AsyncStorage.setItem(ROOT_KEY, JSON.stringify(obj));
}

export async function loadProfile(): Promise<Profile | null> {
  const p = await getItem<Profile>('profile');
  return p || null;
}

export async function saveProfile(p: Profile) {
  await setItem('profile', p);
}

export async function getProgress() {
  const def = { weights: [] as { date: string; kg: number }[], photos: [] as { date: string; type: 'front'|'side'; uri: string }[] };
  return (await getItem<typeof def>('progress')) || def;
}

export async function addWeight(kg: number) {
  const p = await getProgress();
  p.weights.unshift({ date: getTodayKey(), kg });
  await setItem('progress', p);
}

export async function addPhoto(type: 'front'|'side', uri: string) {
  const p = await getProgress();
  p.photos.unshift({ date: getTodayKey(), type, uri });
  await setItem('progress', p);
}

export async function getChallenges() {
  const def = [
    { id: 'fatloss30', title: '30-Day Fat Loss', days: 30, ticks: Array(30).fill(false) },
    { id: 'home30', title: '30-Day Home Workout', days: 30, ticks: Array(30).fill(false) },
    { id: 'pushup30', title: '30-Day Push-up Challenge', days: 30, ticks: Array(30).fill(false) },
  ];
  return (await getItem<typeof def>('challenges')) || def;
}

export async function toggleChallengeDay(id: string, dayIndex: number) {
  const list = await getChallenges();
  const idx = list.findIndex(c => c.id === id);
  if (idx >= 0) list[idx].ticks[dayIndex] = !list[idx].ticks[dayIndex];
  await setItem('challenges', list);
}
