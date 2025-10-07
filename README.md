# 🦺 APD-HSE Dashboard – PT Dummy Sejahtera

**APD-HSE Dashboard** adalah aplikasi berbasis web untuk memantau, mencatat, dan mengelola data **Alat Pelindung Diri (APD)** serta **Obat-obatan** di lingkungan kerja perusahaan.  
Dibangun menggunakan **React + TypeScript + TailwindCSS + Vite**, dengan desain modern, ringan, dan siap dideploy ke **Vercel**.

---

## 🚀 Fitur Utama

### 🧰 Manajemen APD
- Form input pengambilan APD lengkap dengan tanggal, nama, ID, divisi, dan jumlah.
- Simpan data secara lokal (tanpa backend).
- Export data APD ke **Excel (.xlsx)** dan **PDF** otomatis.

### 💊 Manajemen Obat
- Form input pengambilan obat untuk karyawan.
- Statistik total pengambilan obat.
- Export data obat ke **Excel** dan **PDF**.

### 📊 Dashboard Statistik
- Menampilkan jumlah total pengambilan APD dan obat secara cepat.
- Tabel data interaktif dan responsif.
- Tombol ekspor untuk kedua dataset.

### 🔐 Login System
- Autentikasi sederhana via `localStorage`.
- Username dan password default:
- Username: admin
- Password: admin123


### 🎨 Tampilan Modern
- Tema gelap (dark mode) profesional dengan aksen kuning.
- Header custom bergambar logo perusahaan.
- Desain responsif menggunakan TailwindCSS.

---

## 📁 Struktur Folder
apd-hse-dashboard-final/
├── public/
│ ├── Gambar Header.jpg # Gambar header (bisa diganti)
├── src/
│ ├── components/ # Komponen UI
│ ├── pages/ # Halaman Dashboard, Login, APD, dan Obat
│ ├── utils/ # Fungsi helper & export Excel
│ ├── App.tsx # Routing utama
│ └── main.tsx # Entry point aplikasi
├── .gitignore
├── package.json
├── tailwind.config.cjs
├── vite.config.ts
└── vercel.json


---

## 🧩 Instalasi dan Menjalankan Project

### 1️⃣ Clone Repository
```bash
git clone https://github.com/<username>/apd-hse-dashboard-final.git
cd apd-hse-dashboard-final
npm install
npm run dev

🧠 Teknologi yang Digunakan
⚛️ React 18 + TypeScript
💨 TailwindCSS
⚡ Vite
📊 Recharts
📦 xlsx (SheetJS)
🔐 React Router DOM

🧾 Tentang Project

Proyek ini dikembangkan sebagai simulasi sistem pengelolaan APD dan kesehatan kerja (HSE) untuk perusahaan fiktif PT Dummy Sejahtera.
Tujuan utama:
- Meningkatkan efisiensi pencatatan pengambilan APD dan obat.
- Memberikan visualisasi data keselamatan kerja yang informatif dan menarik.
