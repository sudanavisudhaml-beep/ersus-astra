# ERSUS × Firebase — Panduan Setup

Dokumen ini menjelaskan cara memberi ERSUS **database & autentikasi nyata** menggunakan Firebase,
menggantikan akun demo hardcoded dengan Firebase Auth + Firestore.

---

## 1. Kenapa Firebase untuk ERSUS?

| Kebutuhan ERSUS | Produk Firebase |
|---|---|
| Login 4 role (Super Admin, Admin, Energy Manager, Operator) | **Firebase Authentication** (email/password + custom claims `role`) |
| Data user, site, asset, anomali, laporan, version log | **Cloud Firestore** (NoSQL, realtime) |
| Telemetry frekuensi tinggi (opsional) | **Realtime Database** atau TSDB eksternal (Firestore untuk agregat) |
| Hosting alternatif GitHub Pages | **Firebase Hosting** (opsional) |

> Catatan: untuk telemetry IoT sub-detik dalam skala produksi, Firestore bukan pilihan ideal
> (biaya per-write). Gunakan MQTT → TimescaleDB (arsitektur ERSUS penuh) untuk raw telemetry,
> dan simpan **agregat / KPI / anomali** di Firestore untuk konsumsi dashboard.

---

## 2. Langkah Setup (yang perlu Anda lakukan)

1. Buka https://console.firebase.google.com → **Add project** → nama `ersus-astra`.
2. **Build → Authentication → Get started → Sign-in method → Email/Password → Enable.**
3. **Build → Firestore Database → Create database** → mode **Production** → region `asia-southeast2 (Jakarta)`.
4. **Project Settings (⚙️) → General → Your apps → Web (`</>`)** → daftarkan app `ERSUS Web`.
5. Salin objek `firebaseConfig` yang muncul.
6. Di repo: copy `firebase/firebase-config.template.js` → `firebase/firebase-config.js`, tempel config Anda.
7. **Deploy security rules** dari `firebase/firestore.rules` (via Firebase Console → Firestore → Rules, atau `firebase deploy --only firestore:rules`).

> Setelah langkah 5 selesai, kirim `firebaseConfig` ke saya (aman — ini client config publik,
> bukan rahasia) dan saya wiring-kan ke `login.html` + platform.

---

## 3. Data Model (Firestore)

```
users/{uid}
  email:      string
  name:       string
  role:       "superadmin" | "admin" | "energy" | "operator"
  site:       string        // mis. "AMDI-AHO-01"
  active:     boolean
  createdAt:  timestamp

sites/{siteId}
  name, location, area, floors, contractKva, installedKva, tariff, rateKwh, bemsLive

assets/{assetId}
  siteId, name, type, loc, status, kw, cop, alarm, updatedAt

anomalies/{anomalyId}
  siteId, sev ("HIGH"|"MED"|"LOW"), title, wasteKwh, wasteIdr,
  status ("open"|"ack"|"resolved"), detectedAt, resolvedAt

reports/{reportId}
  siteId, period, type, payload, createdBy, createdAt

telemetry/{docId}            // agregat (bukan raw sub-detik)
  siteId, assetId, ts, kwh, kw, ...

changelog/{version}          // cermin CHANGELOG.md di database
  version, date, summary, changes[]
```

---

## 4. Role → Permission (ditegakkan `firestore.rules`)

| Aksi | Super Admin | Admin | Energy Manager | Operator |
|---|:---:|:---:|:---:|:---:|
| Baca data operasional | ✅ | ✅ | ✅ | ✅ |
| Kelola user | ✅ | — | — | — |
| Tulis site / asset / telemetry | ✅ | ✅ | — | — |
| Ack/resolve anomali | ✅ | ✅ | ✅ | — |
| Tulis laporan/analisis | ✅ | ✅ | ✅ | — |
| Tulis version log (changelog) | ✅ | ✅ | — | — |

Role disimpan sebagai **custom claim** `role` di token Auth (di-set via Admin SDK saat membuat user),
dengan fallback ke `users/{uid}.role`.

---

## 5. Seed akun 4 role (contoh, via Admin SDK / Cloud Function)

```js
// jalankan sekali dengan Firebase Admin SDK (server-side)
const admin = require('firebase-admin');
admin.initializeApp();

const seed = [
  { email: 'superadmin@ersus.astra.co.id', password: 'Ersus@2026', name: 'Super Administrator', role: 'superadmin' },
  { email: 'admin@ersus.astra.co.id',        password: 'Ersus@2026', name: 'Administrator',       role: 'admin' },
  { email: 'energy.manager@ersus.astra.co.id',password: 'Ersus@2026', name: 'Energy Manager',      role: 'energy' },
  { email: 'operator@ersus.astra.co.id',      password: 'Ersus@2026', name: 'Operator',            role: 'operator' },
];

for (const u of seed) {
  const rec = await admin.auth().createUser({ email: u.email, password: u.password, displayName: u.name });
  await admin.auth().setCustomUserClaims(rec.uid, { role: u.role });
  await admin.firestore().doc(`users/${rec.uid}`).set({
    email: u.email, name: u.name, role: u.role, site: 'AMDI-AHO-01', active: true,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });
}
```

---

## 6. Status integrasi

- [x] Data model & role matrix dirancang
- [x] Security rules ditulis (`firebase/firestore.rules`)
- [x] Config template disiapkan (`firebase/firebase-config.template.js`)
- [ ] `firebaseConfig` diisi (menunggu project Firebase Anda)
- [ ] `login.html` diwiring ke Firebase Auth (fallback demo tetap ada)
- [ ] Seed 4 akun role
- [ ] Platform baca data dari Firestore
