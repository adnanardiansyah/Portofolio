# Menambahkan proyek

Portofolio menampilkan 19 proyek: delapan kartu awal dan sebelas tambahan berdasarkan CV serta repositori publik GitHub.

1. Tambahkan objek baru ke `projects-data.json`.
2. Isi `id` unik, `name`, `summary`, `label` bidang proyek, dan `mark` berupa inisial untuk sampul.
3. Isi `category` dengan satu atau beberapa kategori yang dipisahkan spasi: `saas`, `web`, `ai`, `mobile`, `iot`, `security`.
4. Isi `technologies`, URL HTTPS `repository`, dan URL `demo` jika tersedia. Jangan menambahkan alamat perkiraan.
5. Isi `sources` dengan referensi CV atau file publik untuk verifikasi konten. Referensi ini tidak ditampilkan dalam kartu.
6. Jalankan `npm.cmd run build`. Script menghasilkan HTML statis dan memperbarui jumlah proyek, sehingga konten tetap tersedia tanpa JavaScript.

Kartu tambahan dibuat oleh `scripts/render-projects.cjs` di antara penanda `GENERATED PROJECTS` dalam `projects.html`. Jangan mengedit hasil generasi secara langsung. Delapan kartu awal beserta ilustrasinya berada sebelum penanda dan masih dapat diedit langsung.

Pencarian, filter, jumlah proyek, dan keadaan hasil kosong otomatis mengikuti kartu yang ada. Untuk kategori baru, tambahkan tombol `.filter-btn` dengan `data-filter` yang sesuai.

Sertakan masalah yang diselesaikan, kontribusi pribadi, dan hasil yang dapat dibuktikan dalam deskripsi. Jangan menambahkan metrik atau tautan perkiraan.

Sampul tipografi proyek tambahan merupakan ilustrasi identitas, bukan screenshot aplikasi. Repo fork, profil GitHub, kebijakan privasi, dan template yang konteksnya belum jelas tidak otomatis diperlakukan sebagai proyek pribadi.

Informasi tambahan diperiksa dari CV pengguna, metadata GitHub, README, file dependensi, dan beberapa file aplikasi. Tautan demo berasal dari CV atau metadata GitHub; ketersediaan backend demo tidak dijamin.
