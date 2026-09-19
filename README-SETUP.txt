# CBT PRO Firebase — Full Project

## Perbaikan utama
- Error `JSON.parse: unexpected character at line 1 column 1` diperbaiki.
- Konfigurasi Firebase dimuat dari `firebase-config.js`.
- Endpoint `/api/config` disediakan untuk deployment Vercel.
- `vercel.json` disertakan.

## Sebelum digunakan
1. Buka `firebase-config.js`.
2. Isi konfigurasi dari Firebase Console.
3. Aktifkan Authentication/Firestore sesuai kebutuhan aplikasi.
4. Untuk Vercel, isi Environment Variables sesuai `.env.example`.
5. Deploy folder proyek ini ke Vercel.

## Catatan
Endpoint bisnis lain yang dipanggil oleh aplikasi asli tetap mengikuti kode sumber yang sudah ada. Endpoint tersebut perlu disesuaikan dengan struktur Firestore/Authentication proyek Firebase Anda jika aplikasi memanggil route `/api/...` lain.


## Firebase yang sudah dikonfigurasi
Project ID: cbt-smp-sekolah
