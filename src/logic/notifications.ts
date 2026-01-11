import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { getStreak } from './streak';

export async function requestNotificationPermission() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

// Schedule up to 2 notifications per day aligned to preferred time.
export async function scheduleSmartNotifications(preferredTime: 'morning'|'evening') {
  try {
    const granted = await requestNotificationPermission();
    if (!granted) return;

    // Cancel previous schedules to avoid spamming
    await Notifications.cancelAllScheduledNotificationsAsync();

    const streak = await getStreak();
    const now = new Date();

    const primaryHour = preferredTime === 'morning' ? 7 : 19;
    const secondaryHour = preferredTime === 'morning' ? 19 : 7;

    const msgs = buildMessages(streak.currentStreak);
    const first = scheduleAtHour(primaryHour, now);
    const second = scheduleAtHour(secondaryHour, now);

    await Notifications.scheduleNotificationAsync({
      content: { title: msgs[0].title, body: msgs[0].body, sound: undefined },
      trigger: first,
    });

    await Notifications.scheduleNotificationAsync({
      content: { title: msgs[1].title, body: msgs[1].body, sound: undefined },
      trigger: second,
    });
  } catch (e) {
    // ignore errors in MVP
  }
}

function buildMessages(streak: number): { title: string; body: string }[] {
  const callout = (d: number) => ({ title: `Day ${d} streak — keep it`, body: 'Only 25 min today' });
  if (streak === 0) return [ { title: 'Start today', body: 'Only 25 min to begin' }, { title: '🔥 Your streak is waiting', body: 'Don’t miss today' } ];
  if ([1,3,7,21].includes(streak)) return [ callout(streak), { title: '🔥 Your streak is waiting', body: 'Quick full-body session' } ];
  return [ { title: 'Chest day 💪', body: 'Open the app to start' }, { title: '🔥 Keep the chain', body: `You are on ${streak} days` } ];
}

function scheduleAtHour(hour: number, now: Date): Notifications.DailyTriggerInput {
  // Schedule for next occurrence of given hour today or tomorrow
  const trigger: Notifications.DailyTriggerInput = { hour, minute: 0, repeats: true }; // daily at that time
  return trigger;
}
