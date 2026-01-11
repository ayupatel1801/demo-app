NityaFit - MVP Fitness App (Expo React Native)

Phase 1 MVP
- Daily Workout Card (1-tap start)
- Streak system visible on Home
- Simple Progress: weight + photos
- Indian-friendly Diet Guidance
- Smart Notifications (1–2/day)
- Optional screens scaffolded: Challenges, Voice cues

Run on Android
1. Install Node.js LTS 20+ (Node 18 may show engine warnings; use 20+ ideally)
2. Install Expo CLI: npm i -g expo (optional)
3. From project root: cd mvp-fitness
4. Install deps (already installed by scaffold). If needed: npm install
5. Start dev server: npm run android (opens in Expo Go or builds dev client)
6. If no Android emulator, install Expo Go on your Android phone and scan the QR (npm start)

Key files to customize first
- src/data/exercises.ts: tweak exercise pools
- src/logic/generateWorkout.ts: generator rules & duration estimates
- src/logic/streak.ts: streak milestones & logic
- src/logic/notifications.ts: message copy & scheduling
- src/data/dietGuidance.ts: content for diet guidance
- src/theme/colors.ts and src/theme/spacing.ts: look & feel
- app/onboarding.tsx: onboarding questions

Known limitations
- Local-only storage (AsyncStorage); no cloud sync
- Voice cues use placeholder files (replace with real MP3s)
- Notifications scheduled daily; exact-alarm behavior varies by device vendor
- No charts for progress (text lists only)
- No background workout timers; set/rep timing is manual
- Minimal validation on inputs

Notes
- Deterministic workout: date + prefs + mood drive selection. Avoids repeats and ensures 20–40 min.
- Streak: increments only when you mark/finish workout today; break if a day is missed.
- Android-first: notification channel, permissions in app.json.
