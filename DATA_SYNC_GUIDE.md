# Data Synchronization Guide

## Overview
Admin page dan landing page sekarang terhubung melalui localStorage. Setiap perubahan yang dilakukan di admin panel akan otomatis ditampilkan di landing page.

## Fitur Sinkronisasi

### 1. **Sinkronisasi Harga Gerobak**
- **Lokasi Admin**: Settings Tab → Harga Penyewaan Gerobak
- **Lokasi Landing Page**: Catalog Section
- **Cara Kerja**: 
  - Admin mengubah harga di modal "Ubah Harga Sewa"
  - Data otomatis disimpan ke localStorage
  - Landing page membaca data dari localStorage saat pertama kali load
  - Perubahan langsung muncul tanpa perlu refresh

### 2. **Sinkronisasi Nama Gerobak**
- **Lokasi Admin**: Carts Tab (Edit Gerobak)
- **Lokasi Landing Page**: Catalog Section (Nama Gerobak)
- **Cara Kerja**:
  - Admin mengedit nama gerobak di modal edit
  - Perubahan nama disimpan ke localStorage
  - Landing page otomatis menampilkan nama terbaru

### 3. **Sinkronisasi Profil Bisnis**
- **Lokasi Admin**: Settings Tab → Profil Bisnis
- **Lokasi Landing Page**: Dapat diakses dari berbagai bagian
- **Informasi yang Disinkronkan**:
  - Nama bisnis (Foud Court)
  - Nomor telepon
  - Email
  - Alamat lengkap
  - Kota & Provinsi
  - Deskripsi bisnis

### 4. **Sinkronisasi Data Pelanggan**
- **Lokasi Admin**: Customers Tab (Add/Edit Customer)
- **Lokasi Landing Page**: Dapat digunakan untuk sistem notifikasi atau referensi
- **Cara Kerja**: Data pelanggan baru atau yang diedit disimpan ke localStorage

## Implementasi Teknis

### Admin.tsx Changes
```tsx
// useEffect hooks ditambahkan untuk sync data
useEffect(() => {
  localStorage.setItem('cartsData', JSON.stringify(carts));
}, [carts]);

useEffect(() => {
  localStorage.setItem('customersData', JSON.stringify(customers));
}, [customers]);

useEffect(() => {
  localStorage.setItem('businessProfile', JSON.stringify(businessProfile));
}, [businessProfile]);
```

### Catalog.tsx Changes
```tsx
// Membaca data dari localStorage saat component mount
useEffect(() => {
  const savedCartsData = localStorage.getItem('cartsData');
  if (savedCartsData) {
    const parsedCarts = JSON.parse(savedCartsData);
    // Map dengan default icons dan descriptions
    const cartsWithIcons = parsedCarts.map((cart) => ({
      ...cart,
      icon: defaultCart?.icon || Coffee,
      description: defaultCart?.description || '',
      features: defaultCart?.features || []
    }));
    setCarts(cartsWithIcons);
  }
}, []);
```

### Storage Event Listener
Catalog juga mendengarkan perubahan localStorage dari tab/window lain:
```tsx
const handleStorageChange = (e: StorageEvent) => {
  if (e.key === 'cartsData') {
    loadCartsData();
  }
};

window.addEventListener('storage', handleStorageChange);
```

## Data Structure

### Carts Data
```json
{
  "id": "GR-001",
  "name": "Gerobak Kopi / Coffee Cart",
  "location": "Jakarta Pusat",
  "status": "Tersewa",
  "rent": "Budi Santoso",
  "price": "Rp 500.000"
}
```

### Customers Data
```json
{
  "id": "CST-001",
  "name": "Budi Santoso",
  "phone": "085791234567",
  "email": "budi@email.com",
  "join": "2025-12-15",
  "status": "Aktif"
}
```

### Business Profile Data
```json
{
  "name": "Foud Court",
  "phone": "+62 821 1234 5678",
  "email": "info@foudcourt.com",
  "address": "Jl. Merdeka No. 123, Jakarta Pusat 12190",
  "city": "Jakarta",
  "province": "DKI Jakarta",
  "description": "Platform penyewaan gerobak makanan terpercaya..."
}
```

## localStorage Keys
- `cartsData` - Data gerobak/cart
- `customersData` - Data pelanggan
- `businessProfile` - Profil bisnis
- `adminAuth` - Token autentikasi admin (existing)

## Cara Menguji Sinkronisasi

1. **Buka Admin Page**
   - Login ke admin panel
   - Navigasi ke Settings → Harga Penyewaan Gerobak
   - Ubah salah satu harga dan simpan

2. **Buka Landing Page di Tab Baru**
   - Di tab/window baru, buka landing page
   - Scroll ke Catalog section
   - Verifikasi bahwa harga yang berubah sudah tampil dengan benar

3. **Test Multi-Tab Sync**
   - Buka landing page di satu tab
   - Buka admin di tab lain
   - Ubah harga di admin
   - Lihat perubahan langsung muncul di tab landing page tanpa refresh

## File yang Terlibat

- `src/components/Admin.tsx` - Tempat data diubah dan disimpan
- `src/components/Catalog.tsx` - Tempat data ditampilkan
- `src/utils/dataSync.ts` - Utility functions untuk synchronization
- `src/components/Pricing.tsx` - Mungkin perlu update untuk sinkronisasi pricing di masa depan

## Catatan Penting

- Data tersimpan dalam localStorage browser, bersifat lokal per browser
- Refresh browser akan mempertahankan data (localStorage persisten)
- Jika localStorage dihapus, data akan kembali ke default
- Untuk production, pertimbangkan menggunakan backend/database untuk persistent storage
- Storage event listener hanya bekerja untuk perubahan dari tab/window lain, bukan dari tab yang sama
