import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { colors } from '../src/theme/colors';
import { spacing } from '../src/theme/spacing';
import { addPhoto, addWeight, getProgress } from '../src/storage/storage';
import * as ImagePicker from 'expo-image-picker';

export default function ProgressScreen() {
  const [kg, setKg] = useState('');
  const [weights, setWeights] = useState<{date:string, kg:number}[]>([]);
  const [photos, setPhotos] = useState<{date:string, type:'front'|'side', uri:string}[]>([]);

  useEffect(() => { (async () => {
    const p = await getProgress();
    setWeights(p.weights);
    setPhotos(p.photos);
  })(); }, []);

  const onAddWeight = async () => {
    const v = parseFloat(kg);
    if (isNaN(v)) return;
    await addWeight(v);
    const p = await getProgress();
    setWeights(p.weights);
    setKg('');
  };

  const onPickPhoto = async (type: 'front'|'side') => {
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7 });
    if (!res.canceled && res.assets?.[0]?.uri) {
      await addPhoto(type, res.assets[0].uri);
      const p = await getProgress();
      setPhotos(p.photos);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Progress</Text>
      <View style={styles.row}>
        <TextInput value={kg} onChangeText={setKg} placeholder="Weight (kg)" placeholderTextColor={colors.textDim} keyboardType='numeric' style={styles.input} />
        <TouchableOpacity style={styles.btn} onPress={onAddWeight}><Text style={styles.btnTxt}>Save</Text></TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', gap: 8, marginBottom: spacing.md }}>
        <TouchableOpacity style={styles.btnGhost} onPress={() => onPickPhoto('front')}><Text style={styles.btnGhostTxt}>Add front photo</Text></TouchableOpacity>
        <TouchableOpacity style={styles.btnGhost} onPress={() => onPickPhoto('side')}><Text style={styles.btnGhostTxt}>Add side photo</Text></TouchableOpacity>
      </View>

      <Text style={styles.section}>Weights</Text>
      <FlatList data={weights} keyExtractor={(i, idx) => i.date+idx} renderItem={({ item }) => (
        <Text style={styles.item}>{item.date}: {item.kg} kg</Text>
      )} />

      <Text style={styles.section}>Photos</Text>
      <FlatList data={photos} horizontal keyExtractor={(i, idx) => i.date+i.type+idx} renderItem={({ item }) => (
        <Image source={{ uri: item.uri }} style={{ width: 120, height: 160, marginRight: 8, borderRadius: 8 }} />
      )} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg },
  title: { fontSize: 22, fontWeight: '700', color: colors.text, marginBottom: spacing.md },
  row: { flexDirection: 'row', gap: 8, marginBottom: spacing.md },
  input: { flex: 1, backgroundColor: colors.card, color: colors.text, padding: spacing.md, borderRadius: 10 },
  btn: { backgroundColor: colors.primary, padding: spacing.md, borderRadius: 10, alignItems: 'center' },
  btnTxt: { color: 'white', fontWeight: '600' },
  btnGhost: { backgroundColor: colors.card, padding: spacing.md, borderRadius: 10 },
  btnGhostTxt: { color: colors.text },
  section: { marginTop: spacing.lg, marginBottom: spacing.sm, fontWeight: '700', color: colors.text },
  item: { color: colors.text },
});
