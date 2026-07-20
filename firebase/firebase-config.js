/*
 * ERSUS — Firebase Web Config (project: astra-ersus)
 * ---------------------------------------------------------------------------
 * CATATAN: Ini "client config" Firebase — AMAN dipublikasikan (bukan rahasia).
 * apiKey di sini hanya identifier project, bukan kunci akses. Keamanan data
 * ditegakkan oleh Firestore Security Rules (firebase/firestore.rules) + Auth,
 * BUKAN dengan menyembunyikan config ini.
 * JANGAN pernah menaruh service-account / Admin SDK private key di file client.
 */

export const firebaseConfig = {
  apiKey: "AIzaSyBxIfwRyQaM2jS9Az4ifXpe29ndlGp4YSY",
  authDomain: "astra-ersus.firebaseapp.com",
  projectId: "astra-ersus",
  storageBucket: "astra-ersus.firebasestorage.app",
  messagingSenderId: "76994972830",
  appId: "1:76994972830:web:3213231ae132ff809dbf8f",
  measurementId: "G-DK0H7YHR22"
};
