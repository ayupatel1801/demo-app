import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors } from '../src/theme/colors';
import { spacing } from '../src/theme/spacing';
import { Profile, saveProfile } from '../src/storage/storage';
import { router } from 'expo-router';

export default function Onboarding() {
  const [name, setName] = useState('');
  const [level, setLevel] = useState<'Beginner'|'Intermediate'|'Advanced'>('Beginner');
  const [preferredTime, setPreferredTime] = useState<'morning'|'evening'>('morning');
  const [locationPref, setLocationPref] = useState<'home'|'gym'>('home');
  const [diet, setDiet] = useState<'veg'|'nonveg'>('veg');
  const [goal, setGoal] = useState<'fatloss'|'musclegain'>('fatloss');

  const onContinue = async () => {
    const profile: Profile = { name: name || 'Friend', level, preferredTime, locationPref, diet, goal };
    await saveProfile(profile);
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Let’s personalize your plan</Text>

      <TextInput
        placeholder="Your name"
        placeholderTextColor={colors.textDim}
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <View style={styles.row}>
        {(['Beginner','Intermediate','Advanced'] as const).map((l) => (
          <TouchableOpacity key={l} style={[styles.pill, level===l && styles.pillActive]} onPress={() => setLevel(l)}>
            <Text style={[styles.pillTxt, level===l && styles.pillTxtActive]}>{l}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.row}>
        {(['morning','evening'] as const).map((l) => (
          <TouchableOpacity key={l} style={[styles.pill, preferredTime===l && styles.pillActive]} onPress={() => setPreferredTime(l)}>
            <Text style={[styles.pillTxt, preferredTime===l && styles.pillTxtActive]}>{l}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.row}>
        {(['home','gym'] as const).map((l) => (
          <TouchableOpacity key={l} style={[styles.pill, locationPref===l && styles.pillActive]} onPress={() => setLocationPref(l)}>
            <Text style={[styles.pillTxt, locationPref===l && styles.pillTxtActive]}>{l}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.row}>
        {(['veg','nonveg'] as const).map((l) => (
          <TouchableOpacity key={l} style={[styles.pill, diet===l && styles.pillActive]} onPress={() => setDiet(l)}>
            <Text style={[styles.pillTxt, diet===l && styles.pillTxtActive]}>{l}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.row}>
        {(['fatloss','musclegain'] as const).map((l) => (
          <TouchableOpacity key={l} style={[styles.pill, goal===l && styles.pillActive]} onPress={() => setGoal(l)}>
            <Text style={[styles.pillTxt, goal===l && styles.pillTxtActive]}>{l}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.cta} onPress={onContinue}>
        <Text style={styles.ctaTxt}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg },
  title: { fontSize: 22, fontWeight: '700', color: colors.text, marginBottom: spacing.md },
  input: { backgroundColor: colors.card, color: colors.text, padding: spacing.md, borderRadius: 10, marginBottom: spacing.md },
  row: { flexDirection: 'row', gap: 8, marginBottom: spacing.sm, flexWrap: 'wrap' },
  pill: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: colors.card, borderRadius: 999 },
  pillActive: { backgroundColor: colors.primary },
  pillTxt: { color: colors.text },
  pillTxtActive: { color: colors.background, fontWeight: '600' },
  cta: { marginTop: spacing.lg, backgroundColor: colors.accent, padding: spacing.lg, borderRadius: 12, alignItems: 'center' },
  ctaTxt: { color: 'white', fontWeight: '700' },
});
