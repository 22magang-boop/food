import { BarChart3, Users, Package, ShoppingCart, Settings, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { label: 'Total Pesanan', value: '1,234', icon: ShoppingCart, color: 'bg-blue-500' },
    { label: 'Pelanggan', value: '456', icon: Users, color: 'bg-green-500' },
    { label: 'Gerobak Aktif', value: '28', icon: Package, color: 'bg-orange-500' },
    { label: 'Pendapatan', value: 'Rp 45.2M', icon: BarChart3, color: 'bg-purple-500' },
  ];

  const orders = [
    { id: '#ORD-001', customer: 'Budi Santoso', cart: 'Gerobak Premium', status: 'Aktif', date: '2026-01-09' },
    { id: '#ORD-002', customer: 'Siti Nurhaliza', cart: 'Gerobak Standar', status: 'Aktif', date: '2026-01-08' },
    { id: '#ORD-003', customer: 'Ahmad Wijaya', cart: 'Gerobak Ekonomi', status: 'Selesai', date: '2026-01-07' },
    { id: '#ORD-004', customer: 'Diana Kusuma', cart: 'Gerobak Premium', status: 'Aktif', date: '2026-01-06' },
    { id: '#ORD-005', customer: 'Rudi Hartono', cart: 'Gerobak Standar', status: 'Pending', date: '2026-01-05' },
  ];

  const carts = [
    { id: 'GR-001', name: 'Gerobak Premium A', location: 'Jakarta Pusat', status: 'Tersewa', rent: 'Budi Santoso' },
    { id: 'GR-002', name: 'Gerobak Premium B', location: 'Jakarta Selatan', status: 'Tersewa', rent: 'Siti Nurhaliza' },
    { id: 'GR-003', name: 'Gerobak Standar A', location: 'Jakarta Barat', status: 'Tersedia', rent: '-' },
    { id: 'GR-004', name: 'Gerobak Standar B', location: 'Jakarta Timur', status: 'Maintenance', rent: '-' },
    { id: 'GR-005', name: 'Gerobak Ekonomi A', location: 'Tangerang', status: 'Tersewa', rent: 'Ahmad Wijaya' },
  ];

  const customers = [
    { id: 'CST-001', name: 'Budi Santoso', phone: '085791234567', email: 'budi@email.com', join: '2025-12-15', status: 'Aktif' },
    { id: 'CST-002', name: 'Siti Nurhaliza', phone: '085792134567', email: 'siti@email.com', join: '2025-12-10', status: 'Aktif' },
    { id: 'CST-003', name: 'Ahmad Wijaya', phone: '085793214567', email: 'ahmad@email.com', join: '2025-12-05', status: 'Aktif' },
    { id: 'CST-004', name: 'Diana Kusuma', phone: '085794314567', email: 'diana@email.com', join: '2025-11-28', status: 'Nonaktif' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aktif':
      case 'Tersedia':
      case 'Tersewa':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Selesai':
        return 'bg-blue-100 text-blue-800';
      case 'Maintenance':
        return 'bg-gray-100 text-gray-800';
      case 'Nonaktif':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-2xl font-bold text-orange-600">Admin Panel</h1>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut size={20} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 w-64 bg-gray-900 text-white transition-all duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } z-30 lg:z-20 mt-16 lg:mt-0`}
        >
          <nav className="p-6 space-y-2">
            {[
              { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
              { id: 'orders', icon: ShoppingCart, label: 'Pesanan' },
              { id: 'carts', icon: Package, label: 'Gerobak' },
              { id: 'customers', icon: Users, label: 'Pelanggan' },
              { id: 'settings', icon: Settings, label: 'Pengaturan' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-orange-600 text-white'
                    : 'hover:bg-gray-800 text-gray-300'
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Selamat Datang Kembali!</h2>
                <p className="text-gray-600">Berikut adalah ringkasan bisnis Anda hari ini.</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`${stat.color} p-3 rounded-lg`}>
                        <stat.icon size={24} className="text-white" />
                      </div>
                      <span className="text-sm text-green-600 font-semibold">+12%</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Charts Placeholder */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Pesanan Terbaru</h3>
                  <div className="space-y-4">
                    {orders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center justify-between pb-4 border-b last:border-b-0">
                        <div>
                          <p className="font-semibold text-gray-900">{order.customer}</p>
                          <p className="text-sm text-gray-600">{order.cart}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Gerobak</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Tersedia', count: 5, color: 'bg-green-500' },
                      { label: 'Tersewa', count: 18, color: 'bg-blue-500' },
                      { label: 'Maintenance', count: 3, color: 'bg-gray-500' },
                      { label: 'Tidak Aktif', count: 2, color: 'bg-red-500' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                          <span className="text-gray-700">{item.label}</span>
                        </div>
                        <span className="font-semibold text-gray-900">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Pesanan</h2>
                  <p className="text-gray-600 mt-1">Kelola semua pesanan penyewaan gerobak</p>
                </div>
                <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                  Pesanan Baru
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID Pesanan</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Pelanggan</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Gerobak</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tanggal</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-orange-600">{order.id}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{order.customer}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{order.cart}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                              Lihat Detail
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Carts Tab */}
          {activeTab === 'carts' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Gerobak</h2>
                  <p className="text-gray-600 mt-1">Kelola inventori gerobak Anda</p>
                </div>
                <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                  Tambah Gerobak
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {carts.map((cart) => (
                  <div key={cart.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{cart.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{cart.location}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(cart.status)}`}>
                        {cart.status}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm mb-4">
                      <p><span className="text-gray-600">ID:</span> <span className="font-medium text-gray-900">{cart.id}</span></p>
                      <p><span className="text-gray-600">Disewa oleh:</span> <span className="font-medium text-gray-900">{cart.rent}</span></p>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50 font-semibold text-sm transition-colors">
                        Edit
                      </button>
                      <button className="flex-1 px-3 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 font-semibold text-sm transition-colors">
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Customers Tab */}
          {activeTab === 'customers' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Pelanggan</h2>
                  <p className="text-gray-600 mt-1">Kelola data pelanggan Anda</p>
                </div>
                <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                  Pelanggan Baru
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nama</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Telepon</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Bergabung</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((customer) => (
                        <tr key={customer.id} className="border-b hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{customer.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{customer.email}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{customer.phone}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{customer.join}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(customer.status)}`}>
                              {customer.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Pengaturan</h2>
                <p className="text-gray-600 mt-1">Kelola pengaturan aplikasi Anda</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[
                  { title: 'Profil Bisnis', desc: 'Edit informasi bisnis Anda' },
                  { title: 'Harga Penyewaan', desc: 'Atur harga gerobak' },
                  { title: 'Notifikasi', desc: 'Kelola pengaturan notifikasi' },
                  { title: 'Keamanan', desc: 'Ubah password dan keamanan akun' },
                ].map((setting, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{setting.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{setting.desc}</p>
                    <button className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                      Atur Sekarang →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
