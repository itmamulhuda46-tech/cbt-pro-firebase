# CBT PRO — GitHub + Vercel + TeraBox + Firebase

CBT PRO responsif untuk sekolah: Firebase Authentication, Cloud Firestore, Vercel Functions, import/export Excel dan media soal dari URL TeraBox.

## 1. Fitur
- Login Firebase Email/Password untuk admin dan siswa.
- Admin claim (`admin=true`) untuk RBAC.
- Dashboard: kelas, peserta, bank soal, ujian, hasil/ranking.
- Import bank soal Excel 50–1000+ soal.
- Import peserta Excel dan otomatis membuat akun Firebase.
- Token ujian, durasi, acak soal.
- Jawaban disimpan di client selama sesi, lalu dinilai di Vercel API.
- `question_public` berisi soal TANPA kunci.
- `question_keys` berisi kunci dan hanya admin yang boleh membaca lewat Rules.
- Hasil final ditulis oleh Vercel API menggunakan Admin SDK.
- Export hasil ke Excel.
- Media gambar dari URL TeraBox (pastikan URL memang dapat diakses langsung dari browser).
- Fully responsive.

## 2. Firebase
1. Buat Firebase project.
2. Aktifkan Authentication → Sign-in method → Email/Password.
3. Buat Firestore Database.
4. Terapkan `firestore.rules` dan `firestore.indexes.json` melalui Firebase CLI atau Console.
5. Ambil konfigurasi Web App dari Project Settings. Isikan nilainya sebagai Environment Variables Vercel: `FIREBASE_WEB_API_KEY`, `FIREBASE_AUTH_DOMAIN`, `FIREBASE_PROJECT_ID`, `FIREBASE_STORAGE_BUCKET`, `FIREBASE_MESSAGING_SENDER_ID`, `FIREBASE_APP_ID`. Frontend mengambil konfigurasi publik dari `/api/config`; tidak perlu menaruh secret Firebase Admin di frontend.

## 3. Vercel Environment Variables
Set:
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `ADMIN_EMAIL=admin@cbt.local`
- `ADMIN_PASSWORD=hudasukses`
- `BOOTSTRAP_SECRET=<acak-panjang>`

Untuk keamanan, `FIREBASE_*` server-side jangan diletakkan pada halaman/frontend. Firebase custom claims sebaiknya hanya ditetapkan dari lingkungan server tepercaya.

## 4. Bootstrap Admin
Deploy ke Vercel, kemudian buka aplikasi → Pengaturan → masukkan `BOOTSTRAP_SECRET` → Siapkan Admin.

Akun awal:
- email: `admin@cbt.local`
- password: `hudasukses`

Setelah login pertama, ubah password admin. Setelah bootstrap berhasil, hapus/rotate `BOOTSTRAP_SECRET`.

## 5. Deploy GitHub + Vercel
```bash
git init
git add .
git commit -m "CBT PRO Firebase"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

Kemudian Vercel → Add New Project → Import Git Repository → Deploy.

## 6. Import Bank Soal
Kolom Excel:
`id | pertanyaan | a | b | c | d | jawaban | bobot | media`

Contoh:
```text
Q001 | 2 + 2 = ? | 3 | 4 | 5 | 6 | B | 1 | https://...
```

## 7. Import Peserta
Kolom Excel:
`nis | nama | kelas | password | email`

Jika email kosong, aplikasi otomatis menggunakan `nis@cbt.local`.

## 8. TeraBox
Simpan URL media yang bisa dibuka langsung di browser. Jangan pernah menaruh kunci jawaban pada URL/media.

## 9. Model keamanan
- Frontend Firebase config bukan rahasia; keamanan ditentukan Authentication + Firestore Security Rules.
- Firebase Admin SDK hanya di Vercel Functions.
- Custom claim admin digunakan sebagai role dan ditegakkan oleh Firestore Rules.
- Siswa tidak diberi akses ke `question_keys`.
- Endpoint `submit-exam` memverifikasi Firebase ID token sebelum menghitung nilai.

## 10. Catatan skala
Firestore Web `WriteBatch` memiliki batas 500 operasi; untuk import besar aplikasi ini sengaja memproses satu dokumen per permintaan saat import peserta dan soal. Untuk ribuan/lebih banyak dokumen, gunakan bulk/server import.
