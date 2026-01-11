import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

export default function MoodSelector({ value, onChange }: { value: 'tired'|'normal'|'energetic'; onChange: (v:'tired'|'normal'|'energetic')=>void }) {
  const options: {key:'tired'|'normal'|'energetic'; label:string}[] = [
    { key: 'tired', label: '😴 Tired' },
    { key: 'normal', label: '😐 Normal' },
    { key: 'energetic', label: '🔥 Energetic' },
  ];
  return (
    <View style={styles.row}>
      {options.map(o => (
        <TouchableOpacity key={o.key} style={[styles.pill, value===o.key && styles.pillActive]} onPress={() => onChange(o.key)}>
          <Text style={[styles.txt, value===o.key && styles.txtActive]}>{o.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8, marginBottom: spacing.md },
  pill: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: colors.card, borderRadius: 999 },
  pillActive: { backgroundColor: colors.primary },
  txt: { color: colors.text },
  txtActive: { color: 'white', fontWeight: '700' },
});
