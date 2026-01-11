import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../src/theme/colors';
import { spacing } from '../src/theme/spacing';
import { loadProfile } from '../src/storage/storage';
import { useEffect, useState } from 'react';
import { dietGuidance } from '../src/data/dietGuidance';

export default function DietScreen() {
  const [text, setText] = useState<string>('');
  useEffect(() => { (async () => {
    const p = await loadProfile();
    if (!p) return;
    setText(dietGuidance(p.goal, p.diet));
  })(); }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Diet Guidance</Text>
      <View style={styles.card}>
        <Text style={styles.body}>{text}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg },
  title: { fontSize: 22, fontWeight: '700', color: colors.text, marginBottom: spacing.md },
  card: { backgroundColor: colors.card, padding: spacing.lg, borderRadius: 12 },
  body: { color: colors.text },
});
