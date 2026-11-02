---
name: skillbuataplikasi
description: Membuat aplikasi HP sederhana yang menarik dan berkarakter (contoh: Green, tabungan umroh) dari ide sampai terpasang di HP dan siap ke Play Store. Pakai saat pengguna minta "buatkan aplikasi ...", ingin aplikasi dengan maskot/animasi lucu/suara, ingin aplikasinya bisa dipasang di HP tanpa Claude, atau bertanya cara masuk Play Store.
---

# Skill: Buat Aplikasi (alur Green)

Alur lengkap yang sudah terbukti saat membuat **Green**, aplikasi tabungan umroh Rp 28 juta / 12 bulan.
Jawab pengguna dalam Bahasa Indonesia yang sederhana. Pengguna bukan programmer: beri langkah bernomor, link langsung, dan jangan pakai istilah teknis tanpa penjelasan.

## Tahap 1 — Prototipe sebagai Artifact (cepat dilihat)

1. Panggil `Artifact` `action: "quickstart"` dengan `intent: "other"`, lalu tulis satu file HTML.
2. Data yang harus awet (setoran, catatan) disimpan dengan capability `db` + `user`:
   `capabilities: {db:{rules:[{path:"",read:"owner",write:"owner"}]}, user:{}}` → hanya pemilik yang membaca/menulis.
   Selalu sediakan cadangan `localStorage` bila `claude.use("db")` null atau penonton bukan pemilik.
3. Setelah publish: satu kali `ArtifactData list` per koleksi untuk memastikan tersambung.
4. Jangan isi data contoh palsu di aplikasi keuangan; buat tampilan kosong yang ramah ("Belum ada setoran…").

## Tahap 2 — Bikin berkarakter (yang disukai pengguna)

- **Maskot SVG** dengan status: idle (bergoyang, berkedip, melambai), senang (lompat, mata ^ ^), sedih (alis turun, air mata, keringat), tertawa saat diketuk. Atur lewat class CSS di `<svg>` (`.happy`, `.sad`, `.party`, `.giggle`).
- **Mata mengikuti jari/kursor**: geser `<g class="pupils">` maksimal ±3.5px saat `pointermove`.
- **Ketuk maskot** → kalimat acak bertema (10 kalimat), ketuk 5x cepat → reaksi "pusing".
- **Gaya Duolingo (versi orisinal, jangan tiru burung hantunya)**: streak api 🔥, baris 8 minggu, layar perayaan bertahap penuh layar (setoran masuk → streak naik → lencana baru), angka menghitung naik, progress bar tebal berkilau, confetti, tombol 3D yang "tertekan".
- **Lencana tonggak** (10/25/50/75/100%) dengan nama bertema.
- **Suara Web Audio (tanpa file)**: koin "cring", jingle sukses, "wuush" streak, fanfare lencana, nada sedih, "pop" tombol, dan **suara maskot** = celoteh blip `square` pendek (nada tinggi saat senang, rendah saat sedih). Buat `AudioContext` hanya setelah sentuhan pertama; sediakan tombol speaker (simpan pilihan di localStorage). Tambah `navigator.vibrate` dalam try/catch.
- **Pengingat di dalam aplikasi**: tanyakan frekuensi (pengguna Green memilih **Jumat 19.00 WIB, di aplikasi saja**). Kartu pengingat berubah oranye + lonceng berdering saat jatuh tempo, pop-up "Waktunya nabung!" sekali per pembukaan, maskot sedih sampai pengguna menabung. Hari/jam bisa diubah di Pengaturan.
- Hormati `prefers-reduced-motion`. Uji sekali dengan Playwright (lebar 400px), lalu publish.

## Tahap 3 — Aplikasi HP mandiri (PWA, tanpa Claude)

Struktur folder (templat ada di `templates/`):
```
index.html              # dokumen HTML lengkap (doctype, head, manifest, apple-touch-icon, [hidden]{display:none!important})
manifest.webmanifest    # name, short_name, display: standalone, theme_color, ikon 192/512 + maskable
sw.js                   # cache-first + perbarui di latar → bisa offline
icon-192.png icon-512.png icon-maskable-512.png apple-touch-icon.png   # dibuat dengan templates/buat-ikon.js (Playwright)
.nojekyll  README.md
```
- Hapus ketergantungan `window.claude` (kode sudah jatuh ke localStorage otomatis).
- Tambah **Simpan cadangan** (unduh JSON) dan **Pulihkan cadangan** (input file, validasi isi) + `navigator.storage.persist()`.
- Uji: `python3 -m http.server`, Playwright cek service worker terdaftar, ekspor→hapus→impor, dan mode offline.

## Tahap 4 — Online lewat GitHub Pages

Batasan sesi cloud yang sudah ditemui:
- Sesi **tidak bisa membuat repo baru** → minta pengguna buat repo kosong publik di https://github.com/new.
- Kalau `add_repo` gagal "not found": cek `list_repos` (nama bisa beda, mis. Green jadi `green-umroh-` dengan strip) atau minta pengguna memberi akses aplikasi Claude di https://github.com/settings/installations → Configure → Repository access.
- Setelah `add_repo`: clone, salin file, commit, `git push -u origin main`, panggil `register_repo_root`.
- API Pages **diblokir proxy** → pengguna menyalakan sendiri: Settings → Pages → Deploy from a branch → `main` / root → Save.
- Situs `*.github.io` tidak bisa dibuka dari sesi; minta pengguna mengecek.
- Pasang di HP: Android Chrome ⋮ → **Instal aplikasi**; iPhone Safari **Bagikan → Tambah ke Layar Utama**.

## Tahap 5 — Play Store

1. Akun Play Console: US$25 sekali bayar + verifikasi identitas.
2. Akun pribadi baru wajib **uji tertutup ≥12 penguji selama 14 hari** sebelum produksi.
3. Buat `.aab` lewat https://www.pwabuilder.com → Package for stores → Android (Trusted Web Activity).
4. **Digital Asset Links** harus di akar domain: `/.well-known/assetlinks.json`. Situs di subfolder (`user.github.io/repo/`) tidak bisa → ganti nama repo jadi `<user>.github.io` atau pakai domain sendiri. Isi file dengan package name + SHA-256 dari PWABuilder.
5. Siapkan: kebijakan privasi (halaman di situs), judul + deskripsi singkat (≤80 karakter) + deskripsi lengkap, ikon 512, ≥2 screenshot HP, feature graphic 1024×500.

## Contoh nyata
- Prototipe: https://claude.ai/artifact/74T349HTgkFWFP66xhUr6o
- Repo: https://github.com/greendhiita-bot/green-umroh-
- Situs: https://greendhiita-bot.github.io/green-umroh-/
