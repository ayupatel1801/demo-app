import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { Exercise } from '../logic/generateWorkout';

export default function ExerciseItem({ item, index }: { item: Exercise; index: number }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{index+1}. {item.name}</Text>
      <Text style={styles.meta}>{item.sets} sets × {item.reps ? `${item.reps} reps` : `${item.durationSec}s`} • Rest {item.restSec}s</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.card, padding: spacing.md, borderRadius: 12 },
  title: { color: colors.text, fontWeight: '700' },
  meta: { color: colors.textDim, marginTop: 4 },
});
