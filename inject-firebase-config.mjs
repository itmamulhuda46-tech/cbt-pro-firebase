import fs from 'node:fs';
const p='public/firebase-config.js';
let s=fs.readFileSync(p,'utf8');
const map={
'__VITE_FIREBASE_API_KEY__':process.env.VITE_FIREBASE_API_KEY||'YOUR_API_KEY',
'__VITE_FIREBASE_AUTH_DOMAIN__':process.env.VITE_FIREBASE_AUTH_DOMAIN||'YOUR_PROJECT.firebaseapp.com',
'__VITE_FIREBASE_PROJECT_ID__':process.env.VITE_FIREBASE_PROJECT_ID||'YOUR_PROJECT_ID',
'__VITE_FIREBASE_STORAGE_BUCKET__':process.env.VITE_FIREBASE_STORAGE_BUCKET||'YOUR_PROJECT.firebasestorage.app',
'__VITE_FIREBASE_MESSAGING_SENDER_ID__':process.env.VITE_FIREBASE_MESSAGING_SENDER_ID||'YOUR_SENDER_ID',
'__VITE_FIREBASE_APP_ID__':process.env.VITE_FIREBASE_APP_ID||'YOUR_APP_ID'};
for(const [a,b] of Object.entries(map))s=s.replaceAll(a,b);
fs.writeFileSync(p,s); fs.writeFileSync('firebase-config.js',s);
console.log('Firebase web config injected.');
