# AMDI Energy Profile & EnPI — Analisis Data 2020–2026

> Sumber: `data_EnP.xlsx` (upload user, Jul 2026) → diekstrak ke `docs/data/amdi-enpi.json`.
> Dokumen ini adalah **memori kerja ERSUS** untuk modul EnPI. Setiap angka di bawah berasal
> langsung dari file Excel tersebut, kecuali ditandai sebagai perhitungan/estimasi.

---

## 1. Fakta gedung (sheet "Data Resume")

| Parameter | Nilai |
|---|---|
| Luas gedung total | **46.557 m²** |
| Luas gedung ber-AC | **27.179,67 m²** ← dipakai sebagai denominator kWh/m² |
| Manpower | 2025: 2.300 · 2026: 2.500 (breakdown rinci total **2.448**) |
| Breakdown okupansi 2026 | NPK AI 927 · CIST 700 · HSO 400 · Tamu 220 · Sigap 50 · ISS 42 · OI 28 · Depot 25 · MTC 20 · Driver 15 · Permata 11 · FM dll 10 |
| Tarif PLN | B3, ± Rp 1.035,7/kWh (LWBP) · Rp 1.553,6/kWh (WBP) — dari sheet harian |
| Target EnPI listrik | **15 kWh/m²/bulan** |
| Target EnPI air | **53 liter/orang/hari** (2020: 55, 2021–22: 52) |

## 2. Profil tahunan

### Listrik (kWh/bulan rata-rata · kWh/m²/bulan rata-rata)
| Tahun | kWh/bln (avg) | kWh/m²/bln | vs Target 15 |
|---|---|---|---|
| 2020 | 335.652 | 12,38 | ✅ |
| 2021 | 320.145 | 11,69 | ✅ (COVID WFH Jul–Sep terlihat: 8,0–9,3) |
| 2022 | 316.388 | 11,61 | ✅ |
| 2023 | 322.452 | 11,91 | ✅ |
| 2024 | 331.708 | 12,15 | ✅ |
| 2025 | 315.368 | 11,68 | ✅ — **ANJLOK mulai Agu-25: 13,66 → 9,72** |
| 2026 (Jan–Mei) | 261.252 | **9,61** | ✅ jauh di bawah |

**Struktural break Agustus 2025:** konsumsi turun dari ±350rb → ±250–290rb kWh/bln (−18% YoY
Jan–Mei 2026 vs 2024). kWh/m² turun dari ±12–13 → ±9,2. *Penyebab belum terdokumentasi di file
— perlu konfirmasi user (retrofit chiller? perubahan okupansi? kebijakan AC?).*

### Air (m³/bulan rata-rata · liter/orang/hari rata-rata)
| Tahun | m³/bln | L/org/hari | vs Target |
|---|---|---|---|
| 2020 | 1.959 | 36,87 | ✅ (COVID) |
| 2021 | 1.456 | 29,34 | ✅ (COVID) |
| 2022 | 2.438 | 51,34 | ✅ |
| 2023 | 2.304 | 49,48 | ✅ |
| 2024 | 2.672 | 53,45 | ⚠ pas di target |
| 2025 | 2.961 | 59,75 | ❌ **+13% di atas target** |
| 2026 (Jan–Jun) | 3.188 | 63,30 | ❌ **+19% di atas target, tren naik terus** |

**Divergensi kunci:** listrik TURUN tajam sejak Agu-25, air NAIK terus sejak 2022 (+24% Jan–Jun
2026 vs 2024). Dua utilitas bergerak berlawanan — indikasi driver berbeda (air: okupansi/acara/
kebocoran?; listrik: efisiensi sistem).

### Biaya
- PLN: ± Rp 4,3–4,7 M/tahun (2020–2025 stabil; 2026 diproyeksikan turun signifikan).
- Air: Rp 274 jt (2020) → Rp 410 jt (2025) → run-rate 2026 ± Rp 478 jt (**naik 75% dari 2020**).

## 3. Temuan kualitas data (⚠ untuk diklarifikasi)

1. **Denominator L/org/hari adalah KONSTANTA, bukan okupansi aktual.** Back-calculation
   menunjukkan pembagi tetap: 50.000 person-days/bln (2020–21, 2024–26) dan 46.000 (2022–23)
   ≈ 2.273 / 2.091 orang × 22 hari. Padahal manpower tercatat 2.300 (2025) dan 2.500 (2026).
   → EnPI air tidak mencerminkan variasi okupansi nyata; jika orang = 2.500, L/O/H 2026 = 58,0
   (bukan 63,3) — masih di atas target, tapi beda 8%.
2. **Kolom `jml peserta` di sheet harian KOSONG** (hanya template). Nama acara ada di
   `Keterangan`, jumlah pesertanya tidak pernah diisi. → regresi "orang vs energi" tidak bisa
   memakai peserta aktual; lihat §4 untuk pendekatan yang tetap valid.
3. Jun 2026 listrik (180.000 kWh) tampak **parsial** (data harian berhenti 16 Jul; resume Jun
   belum final). Des 2025 di tabel bulanan = 291.108,75 (persis rata-rata) → kemungkinan diisi
   rata-rata, namun sheet harian mencatat "Kwh DES.25 = 249.120". Ada dua versi angka Des-25.
4. 2025 kWh: kolom Nov/Des di tabel tampak bergeser (nilai average masuk kolom Des).
5. Sheet "Listrik & Acara" dan "AIR & PESERTA" (2023) hanya kerangka kosong.

## 4. Regresi orang ↔ energi (hasil awal)

**Data okupansi per-hari tidak tersedia**, jadi regresi dilakukan dengan proxy okupansi
hari-kerja (0/1) pada data harian 2026 (n = 197 hari, 1 Jan–16 Jul):

```
kWh/hari = 4.403 + 7.847 × hari_kerja        R² = 0,825
```
- **Baseload akhir pekan/libur: ± 4.400 kWh/hari** (36% dari beban hari kerja!) — lift,
  server, AC standby, pompa. Ini target penghematan yang jelas.
- Hari kerja rata-rata: ± 12.250 kWh/hari.
- **Delta okupansi: ± 7.850 kWh/hari** ÷ 2.448 penghuni ≈ **3,2 kWh/orang/hari kerja**
  (koefisien energi marginal per orang — estimasi kasar, valid selama okupansi harian ±konstan).
- Jumlah acara (dihitung dari teks Keterangan) TIDAK menambah daya jelas (koef ≈ −60, tidak
  signifikan) — jumlah nama acara ≠ jumlah peserta.
- Regresi bulanan kWh vs person-days 2020–26: **R² = 0,002** — nol, karena person-days-nya
  konstanta asumsi (lihat §3.1), bukan pengukuran. Ini bukti kuat butuh data okupansi nyata.

## 5. Rekomendasi desain EnPI untuk modul ERSUS

Dua indikator user (dipertahankan sebagai indikator utama):
1. **kWh/m²/bulan** (denominator: luas AC 27.179,67 m²) — target 15.
2. **Liter/orang/hari** — target 53.

Usulan pelengkap (challenge):
- **kWh/orang/hari-kerja** — listrik sama sekali tidak dinormalisasi orang saat ini; dengan
  koefisien marginal 3,2 kWh/org/hari sudah ada baseline-nya.
- **Baseload akhir-pekan (kWh/hari)** — KPI actionable langsung (± 4.400 sekarang).
- **Rasio WBP/LWBP** — data harian sudah memisahkan; tarif WBP 1,5×.
- Target L/O/H perlu direview: aktual sudah 63 vs target 53 (gap 19%) — target diabaikan
  atau ada masalah nyata (kebocoran/okupansi tak tercatat).
- Denominator orang harus dari data nyata (badge/access log bulanan), bukan konstanta.
- Normalisasi cuaca (CDD) menyusul saat integrasi BMKG di ERSUS.

## 6. Artefak

- Dataset lengkap: `docs/data/amdi-enpi.json` (monthly 2020–26 semua seri + daily 2026 +
  meta + hasil regresi) — siap dikonsumsi modul EnPI ERSUS / di-seed ke Firestore.
