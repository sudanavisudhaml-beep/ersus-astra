# ERSUS — Version Log

Semua perubahan penting pada ERSUS (ESG Ready Smart Utility System) dicatat di sini.
Format mengikuti [Keep a Changelog](https://keepachangelog.com/) & [Semantic Versioning](https://semver.org/lang/id/).

> Konvensi: `MAJOR.MINOR.PATCH` — MAJOR = perubahan besar/arsitektur, MINOR = fitur baru, PATCH = perbaikan kecil.

---

## [Unreleased]
### Rencana
- Custom claim `role` via Admin SDK (saat ini role disimpan di `users/{uid}`)
- Menu/akses berbeda per role (gating penuh, bukan hanya read-only)
- Kontrol device (write-back) via ERSUS
- Realtime listener (onSnapshot) agar dashboard update tanpa reload

---

## [0.7.1] — 2026-07-20
### Added
- **Favicon ERSUS** (ikon bolt) di tab browser semua halaman (`index.html`, `login.html`,
  `ersus-demo.html`, `firebase/seed.html`) — SVG inline (data URI), rounded-square
  gradient electric-blue→cyan + petir putih. Self-contained, tanpa file/CDN eksternal.
- `favicon.svg` — file sumber ikon disimpan di root repo.

---

## [0.7.0] — 2026-07-20
### Added
- **Platform baca data LIVE dari Firestore** (`index.html`):
  - Renderer di-refactor jadi data-driven (`renderSEU/renderAssets/renderAnomalies`).
  - Modul Firebase memuat koleksi `assets`, `anomalies`, `seu` setelah user login via
    Firebase, lalu me-render ulang kartu aset, tabel anomali, dan distribusi SEU.
  - Badge jumlah anomali kritis & indikator sumber data ("LIVE · Firestore") ikut ter-update.
  - **Fallback penuh**: bila Firebase tak tersedia / user login mode demo / Firestore kosong,
    platform tetap tampil pakai data lokal (tanpa error).
- `firebase/seed.html`: skema `assets` dilengkapi field tampilan (`statusLabel`, `dispV/P/Kwh`)
  dan `anomalies` diberi `desc`, `seu` diberi `order` — agar cocok dgn renderer platform.
- `firebase/firestore.rules`: tambah aturan koleksi `seu` (baca semua role, tulis Admin+).

---

## [0.6.0] — 2026-07-20
### Added
- **Integrasi Firebase** (project `astra-ersus`):
  - `firebase/firebase-config.js` — config web project (client-safe).
  - `login.html` kini autentikasi via **Firebase Auth** (email/password), ambil role
    dari Firestore `users/{uid}`. **Fallback otomatis ke akun demo** bila SDK/jaringan
    terblokir atau akun belum di-seed → login tetap jalan.
  - `firebase/seed.html` — halaman sekali-jalan: buat 4 akun role di Auth + tulis
    dokumen role, lalu seed data awal AMDI (`sites`, `assets`, `anomalies`, `seu`, `changelog`).
### Notes
- Firebase Web SDK dimuat dari gstatic CDN. Bila jaringan Astra memblokir domain Google,
  login otomatis memakai mode demo lokal (tidak error). Aktivasi Firebase penuh butuh
  whitelist domain Firebase di jaringan Astra.

---

## [0.5.0] — 2026-07-20
### Changed
- **Platform ERSUS dirombak total** ke tema **dark liquid-glass** (selaras dengan login page):
  sidebar navigasi, top bar, glass cards, aksen electric blue/cyan.
- Login sekarang **langsung masuk Platform (Overview)** — tidak lagi ke halaman Arsitektur.
### Added
- 6 modul operasional dalam satu shell: Overview, SEU Analysis, EnPI & Baseline,
  Asset Monitor, Anomaly Center, Governance (data real BEMS AMDI).
- Role-aware UI: chip nama+role di top bar; **Operator/Viewer = read-only** (tombol aksi non-aktif).
- `index.html` kini **100% self-contained** — ikon inline SVG, tanpa Tailwind/Phosphor/font CDN
  (menghindari kegagalan CDN di jaringan Astra).
### Removed
- Halaman **Arsitektur / Dokumentasi** (mode docs + 6 subhalaman React) dihapus dari aplikasi.
  Tetap tersimpan di **git history** (commit sebelum v0.5.0) — tidak hilang, bisa dipulihkan.
- Dependensi React 18 UMD + Babel precompiled (platform lama) — digantikan vanilla JS.
### Login
- Menghapus kalimat "Platform AI yang mengubah data BEMS…" di brand panel.
- Revisi copyright → "2026 · System Development · GA Departemen / PT. Astra International Tbk".

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
