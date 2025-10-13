# app-mobile (Expo + React Native)

iOS-first Expo app for Civora.

## Prereqs
- macOS with Xcode (install from App Store; open once and accept licenses)
- Node.js LTS (v20+): `brew install node`
- Expo CLI (auto via npx)
- iOS Simulator (comes with Xcode) OR Expo Go app on iPhone

## Run (Simulator)
```bash
npm install
npx expo start   # then press "i" to open iOS Simulator

Backend (required)

Start the Python backend locally (separate repo app-backend):

# in the backend repo
source .venv/bin/activate
./scripts/run_dev.sh
# should serve http://127.0.0.1:8000/health -> {"status":"ok"}

Config

The app uses constants/env.ts to pick the API base URL.
	•	iOS Simulator: http://127.0.0.1:8000
	•	Real iPhone: set your Mac’s IP in constants/env.ts (e.g., http://192.168.1.23:8000)

Useful scripts
	•	npx expo start — dev server (press “i” for iOS Simulator)
	•	r in the expo terminal — reload app
	•	shift + r — clear cache & reload