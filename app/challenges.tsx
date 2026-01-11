import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { colors } from '../src/theme/colors';
import { spacing } from '../src/theme/spacing';
import { getChallenges, toggleChallengeDay } from '../src/storage/storage';
import { useEffect, useState } from 'react';

export default function ChallengesScreen() {
  const [list, setList] = useState<{id:string, title:string, days:number, ticks:boolean[]}[]>([]);
  useEffect(() => { (async () => setList(await getChallenges()))(); }, []);

  const onTick = async (id: string, day: number) => {
    await toggleChallengeDay(id, day);
    setList(await getChallenges());
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>30-Day Challenges</Text>
      <FlatList data={list} keyExtractor={i=>i.id} renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {Array.from({ length: item.days }).map((_, i) => (
              <TouchableOpacity key={i} style={[styles.tick, item.ticks[i] && styles.tickOn]} onPress={() => onTick(item.id, i)}>
                <Text style={[styles.tickTxt, item.ticks[i] && styles.tickTxtOn]}>{i+1}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg },
  title: { fontSize: 22, fontWeight: '700', color: colors.text, marginBottom: spacing.md },
  card: { backgroundColor: colors.card, padding: spacing.md, borderRadius: 12, marginBottom: spacing.md },
  cardTitle: { color: colors.text, fontWeight: '700' },
  tick: { width: 32, height: 32, borderRadius: 8, backgroundColor: '#2a2a2a', alignItems: 'center', justifyContent: 'center' },
  tickOn: { backgroundColor: colors.accent },
  tickTxt: { color: colors.text },
  tickTxtOn: { color: 'white', fontWeight: '700' },
});
