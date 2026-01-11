import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { colors } from '../src/theme/colors';
import { spacing } from '../src/theme/spacing';
import { useEffect, useState } from 'react';
import { getTodayKey } from '../src/utils/date';
import { generateWorkoutForDate, WorkoutPlan } from '../src/logic/generateWorkout';
import { loadProfile } from '../src/storage/storage';
import MoodSelector from '../src/components/MoodSelector';
import ExerciseItem from '../src/components/ExerciseItem';
import { recordTodayCompletion } from '../src/logic/streak';
import { playVoiceCue } from '../src/logic/voiceCoach';

export default function WorkoutScreen() {
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);
  const [mood, setMood] = useState<'tired'|'normal'|'energetic'>('normal');

  useEffect(() => {
    (async () => {
      const profile = await loadProfile();
      if (!profile) return;
      const key = getTodayKey();
      const p = await generateWorkoutForDate(key, { level: profile.level, mode: profile.locationPref, mood });
      setPlan(p);
      playVoiceCue('start');
    })();
  }, [mood]);

  const onComplete = async () => {
    await recordTodayCompletion(true);
    playVoiceCue('finish');
  };

  if (!plan) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{plan.title}</Text>
        <Text style={styles.meta}>{plan.mode.toUpperCase()} • {plan.level} • {plan.duration} min</Text>
      </View>

      <MoodSelector value={mood} onChange={setMood} />

      <FlatList
        data={plan.exercises}
        keyExtractor={(item, idx) => item.name + idx}
        renderItem={({ item, index }) => (
          <ExerciseItem item={item} index={index} />
        )}
        contentContainerStyle={{ gap: 8 }}
      />

      <TouchableOpacity style={styles.cta} onPress={onComplete}>
        <Text style={styles.ctaTxt}>Finish Workout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg },
  header: { marginBottom: spacing.md },
  title: { fontSize: 22, fontWeight: '700', color: colors.text },
  meta: { color: colors.textDim, marginTop: 4 },
  cta: { marginTop: spacing.md, backgroundColor: colors.primary, padding: spacing.lg, borderRadius: 12, alignItems: 'center' },
  ctaTxt: { color: 'white', fontWeight: '700' },
});
