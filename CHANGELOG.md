# ERSUS — Version Log

Semua perubahan penting pada ERSUS (ESG Ready Smart Utility System) dicatat di sini.
Format mengikuti [Keep a Changelog](https://keepachangelog.com/) & [Semantic Versioning](https://semver.org/lang/id/).

> Konvensi: `MAJOR.MINOR.PATCH` — MAJOR = perubahan besar/arsitektur, MINOR = fitur baru, PATCH = perbaikan kecil.

---

## [Unreleased]
### Rencana
- Integrasi Firebase (Auth + Firestore) — lihat `docs/FIREBASE_SETUP.md`
- Platform role-based (menu berbeda per role)
- Platform fully self-contained (lepas dependensi Tailwind CDN)
- Sinkronisasi branch `main` dengan rilis terbaru

---

## [0.4.1] — 2026-07-20
### Added
- `CHANGELOG.md` — version log resmi ERSUS (dokumen ini).
- `docs/FIREBASE_SETUP.md` — panduan setup Firebase (Auth + Firestore) + data model.
- `firebase/firebase-config.template.js` — template konfigurasi Firebase (placeholder).
- `firebase/firestore.rules` — security rules role-based (Super Admin / Admin / Energy Manager / Operator).

---

## [0.4.0] — 2026-07-20
### Added
- `login.html` — halaman login baru bergaya **futuristik "Apple liquid glass"**:
  dark tone, electric blue + cyan + grey/white, glassmorphism, aurora animasi, orb energi, partikel.
- **4 role akun** selaras dengan AGAVA: Super Admin, Admin, Energy Manager, Operator/Viewer.
- 1 akun demo per role (klik untuk isi otomatis), password demo `Ersus@2026`.
- Ikon sepenuhnya **inline SVG** — login page 100% self-contained (tanpa CDN ikon).
- Session-based auth: login menyimpan `ersus_session` di localStorage → routing ke platform.
### Changed
- `index.html`: ditambahkan **auth gate** (redirect ke `login.html` bila belum login),
  user chip menampilkan nama + role dari session, logout membersihkan session.
### Removed
- Overlay login lama (single-admin) di `index.html` dinonaktifkan — `login.html` jadi satu-satunya pintu masuk.

---

## [0.3.0] — 2026-07-20
### Added
- Login overlay awal (single admin) pada `index.html` dan `ersus-demo.html`.
- Akun demo administrator: `admin@ersus.astra.co.id`.

---

## [0.2.0] — 2026-07-20
### Added
- `ersus-demo.html` — demo presentasi untuk TV (dark theme, full-screen), 5 layar:
  Command Center, BEMS vs ERSUS, AHU Intelligence, AI Agent Live, Business Impact.
- Data real BEMS AMDI (AHU 3A/3B/4A/4B, ruang meeting 301–303, parkir).
- Highlight anomali AHU 3B (pembacaan daya −0.05W → meter malfunction).

---

## [0.1.0] — 2026 (baseline)
### Added
- `index.html` — platform ERSUS self-contained (React 18 UMD inline + JSX pre-compiled).
- Mode Dokumentasi (6 subhalaman arsitektur) + Mode Platform (6 tab operasional:
  Overview, SEU Analysis, EnPI & Baseline, Asset Monitor, Anomaly Center, Governance).
- Data simulasi Gedung AMDI (12.500 m², 9 lantai).

---

### Cara memperbarui log ini
Setiap perubahan, tambahkan entri baru di paling atas (di bawah `[Unreleased]`), naikkan versi
sesuai jenis perubahan, dan cantumkan tanggal. Idealnya versi ini juga dicerminkan ke koleksi
`changelog` di Firestore (lihat `docs/FIREBASE_SETUP.md`) agar riwayat tersimpan di database.
