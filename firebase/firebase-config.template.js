/*
 * ERSUS — Firebase Web Config (TEMPLATE)
 * ---------------------------------------------------------------------------
 * 1. Buat project di https://console.firebase.google.com
 * 2. Project Settings → General → "Your apps" → Web app (</>) → daftarkan app
 * 3. Salin objek firebaseConfig yang diberikan Firebase ke bawah ini
 * 4. Rename file ini menjadi `firebase-config.js`
 *
 * CATATAN KEAMANAN:
 * - Nilai di bawah ini adalah "client config" Firebase — AMAN untuk dipublikasikan
 *   (bukan rahasia). Keamanan data ditegakkan oleh Firestore Security Rules
 *   (lihat firestore.rules), BUKAN oleh menyembunyikan config ini.
 * - JANGAN pernah menaruh service-account / admin private key di file client.
 */

export const firebaseConfig = {
  apiKey: "GANTI_DENGAN_API_KEY",
  authDomain: "ersus-astra.firebaseapp.com",
  projectId: "ersus-astra",
  storageBucket: "ersus-astra.appspot.com",
  messagingSenderId: "GANTI_DENGAN_SENDER_ID",
  appId: "GANTI_DENGAN_APP_ID"
  // measurementId: "G-XXXXXXX" // opsional (Analytics)
};

/*
 * Contoh inisialisasi (Firebase v10 modular, via CDN ESM):
 *
 *   import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
 *   import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
 *   import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
 *   import { firebaseConfig } from "./firebase-config.js";
 *
 *   const app  = initializeApp(firebaseConfig);
 *   export const auth = getAuth(app);
 *   export const db   = getFirestore(app);
 */
