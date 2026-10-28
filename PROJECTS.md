# Menambahkan proyek

Daftar proyek berada di `projects.html`, di dalam `#projectGrid`. Semua delapan proyek lama tetap dipertahankan.

1. Salin satu blok `.proj-card` biasa beserta preview dan `.project-body`.
2. Ganti nama, deskripsi, dan teknologi sesuai proyek sebenarnya.
3. Isi `data-category` dengan satu atau beberapa kategori, dipisahkan spasi: `saas`, `web`, `ai`, `mobile`.
4. Pasang screenshot di `.project-preview` jika tersedia. Gunakan `<img src="..." alt="Tampilan aplikasi ..." loading="lazy" width="1280" height="800" style="width:100%;height:100%;object-fit:cover;object-position:top">`.
5. Masukkan tautan demo/repository asli di `.project-actions`. Jika belum tersedia, pertahankan catatan tanpa tombol kosong `href="#"`.

Pencarian, filter, jumlah proyek, dan keadaan hasil kosong otomatis mengikuti kartu yang ada. Untuk kategori baru, tambahkan tombol `.filter-btn` dengan `data-filter` yang sesuai. Gunakan `.project-featured` hanya untuk proyek unggulan pertama.

Sertakan masalah yang diselesaikan, kontribusi pribadi, dan hasil yang dapat dibuktikan dalam deskripsi. Jangan menambahkan metrik atau tautan perkiraan.

Setelah mengubah HTML, jalankan `npm.cmd run build` di PowerShell untuk memperbarui CSS Tailwind.
