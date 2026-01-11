import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

export default function StreakBanner({ streak }: { streak: number }) {
  const text = streak > 0 ? `🔥 ${streak}-day streak — Don’t break it today` : 'Start your streak today';
  return (
    <View style={styles.banner}>
      <Text style={styles.txt}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: { backgroundColor: colors.accentSoft, padding: spacing.md, borderRadius: 12, marginBottom: spacing.md },
  txt: { color: colors.accent, fontWeight: '700' },
});
