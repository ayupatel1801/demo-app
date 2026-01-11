import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

export default function WorkoutCard({ title, durationHint, level, mode, onStart }: {
  title: string;
  durationHint: string;
  level: string;
  mode: string;
  onStart: () => void;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.meta}>{mode} • {level} • {durationHint}</Text>
      <TouchableOpacity style={styles.cta} onPress={onStart}>
        <Text style={styles.ctaTxt}>Start Workout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.card, padding: spacing.lg, borderRadius: 16 },
  title: { color: colors.text, fontSize: 20, fontWeight: '700' },
  meta: { color: colors.textDim, marginTop: 4 },
  cta: { marginTop: spacing.md, backgroundColor: colors.primary, padding: spacing.md, borderRadius: 10, alignItems: 'center' },
  ctaTxt: { color: 'white', fontWeight: '700' },
});
