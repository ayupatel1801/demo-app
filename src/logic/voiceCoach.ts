import { Audio } from 'expo-av';

const clips: Record<string, any> = {
  start: require('../../assets/voice/start.mp3'),
  lastset: require('../../assets/voice/lastset.mp3'),
  slow: require('../../assets/voice/slow.mp3'),
  finish: require('../../assets/voice/finish.mp3'),
};

export async function playVoiceCue(key: 'start'|'lastset'|'slow'|'finish') {
  try {
    const { sound } = await Audio.Sound.createAsync(clips[key]);
    await sound.playAsync();
  } catch {}
}
