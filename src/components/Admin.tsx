import { BarChart3, Users, Package, ShoppingCart, Settings, LogOut, Menu, X, Edit2, Trash2, Eye } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [carts, setCarts] = useState([
    { id: 'GR-001', name: 'Gerobak Kopi / Coffee Cart', location: 'Jakarta Pusat', status: 'Tersewa', rent: 'Budi Santoso', price: 'Rp 500.000' },
    { id: 'GR-002', name: 'Gerobak Es Teh / Minuman', location: 'Jakarta Selatan', status: 'Tersewa', rent: 'Siti Nurhaliza', price: 'Rp 500.000' },
    { id: 'GR-003', name: 'Gerobak Snack / Gorengan', location: 'Jakarta Barat', status: 'Tersedia', rent: '-', price: 'Rp 350.000' },
    { id: 'GR-004', name: 'Gerobak Bakso / Mie Ayam', location: 'Jakarta Timur', status: 'Maintenance', rent: '-', price: 'Rp 350.000' },
    { id: 'GR-005', name: 'Gerobak Ayam Geprek', location: 'Tangerang', status: 'Tersewa', rent: 'Ahmad Wijaya', price: 'Rp 500.000' },
  ]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCart, setEditingCart] = useState<typeof carts[0] | null>(null);
  const [formData, setFormData] = useState({ name: '', location: '', status: '', rent: '' });
  const [newCartData, setNewCartData] = useState({ name: '', location: '', status: 'Tersedia', rent: '-', price: 'Rp 350.000' });
  const [orders, setOrders] = useState([
    { id: '#ORD-001', customer: 'Budi Santoso', cart: 'Gerobak Kopi / Coffee Cart', status: 'Aktif', date: '2026-01-09', phone: '085791234567', email: 'budi@email.com', startDate: '2026-01-09', endDate: '2026-01-15', price: 'Rp 500.000' },
    { id: '#ORD-002', customer: 'Siti Nurhaliza', cart: 'Gerobak Es Teh / Minuman', status: 'Aktif', date: '2026-01-08', phone: '085792134567', email: 'siti@email.com', startDate: '2026-01-08', endDate: '2026-01-14', price: 'Rp 500.000' },
    { id: '#ORD-003', customer: 'Ahmad Wijaya', cart: 'Gerobak Snack / Gorengan', status: 'Selesai', date: '2026-01-07', phone: '085793214567', email: 'ahmad@email.com', startDate: '2026-01-01', endDate: '2026-01-07', price: 'Rp 350.000' },
    { id: '#ORD-004', customer: 'Diana Kusuma', cart: 'Gerobak Bakso / Mie Ayam', status: 'Aktif', date: '2026-01-06', phone: '085794314567', email: 'diana@email.com', startDate: '2026-01-06', endDate: '2026-01-20', price: 'Rp 350.000' },
    { id: '#ORD-005', customer: 'Rudi Hartono', cart: 'Gerobak Ayam Geprek', status: 'Pending', date: '2026-01-05', phone: '085795314567', email: 'rudi@email.com', startDate: '2026-01-12', endDate: '2026-01-18', price: 'Rp 500.000' },
  ]);
  const [showOrderDetailModal, setShowOrderDetailModal] = useState(false);
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);
  const [newOrderData, setNewOrderData] = useState({ customer: '', cart: '', phone: '', email: '', startDate: '', endDate: '', status: 'Pending', price: '' });
  const [customers, setCustomers] = useState([
    { id: 'CST-001', name: 'Budi Santoso', phone: '085791234567', email: 'budi@email.com', join: '2025-12-15', status: 'Aktif' },
    { id: 'CST-002', name: 'Siti Nurhaliza', phone: '085792134567', email: 'siti@email.com', join: '2025-12-10', status: 'Aktif' },
    { id: 'CST-003', name: 'Ahmad Wijaya', phone: '085793214567', email: 'ahmad@email.com', join: '2025-12-05', status: 'Aktif' },
    { id: 'CST-004', name: 'Diana Kusuma', phone: '085794314567', email: 'diana@email.com', join: '2025-11-28', status: 'Nonaktif' },
  ]);
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [showEditCustomerModal, setShowEditCustomerModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<typeof customers[0] | null>(null);
  const [customerFormData, setCustomerFormData] = useState({ name: '', phone: '', email: '', status: 'Aktif' });
  const [newCustomerData, setNewCustomerData] = useState({ name: '', phone: '', email: '', status: 'Aktif' });
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [editingPricingCart, setEditingPricingCart] = useState<typeof carts[0] | null>(null);
  const [pricingFormData, setPricingFormData] = useState({ price: '' });
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'order', message: 'Pesanan baru dari Budi Santoso untuk Gerobak Kopi', time: '2026-01-13 10:30', read: false },
    { id: 2, type: 'customer', message: 'Pelanggan baru: Rudi Hartono', time: '2026-01-12 15:45', read: false },
    { id: 3, type: 'maintenance', message: 'Gerobak Bakso / Mie Ayam masuk maintenance', time: '2026-01-11 08:00', read: true },
  ]);
  const [notificationSettings, setNotificationSettings] = useState({
    orderNotifications: true,
    customerNotifications: true,
    maintenanceNotifications: true,
    emailNotifications: true,
  });
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [accountEmail, setAccountEmail] = useState('admin@foudcourt.com');
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    newEmail: '',
  });
  const [securityMessage, setSecurityMessage] = useState({ type: '', text: '' });

  const stats = [
    { label: 'Total Pesanan', value: '1,234', icon: ShoppingCart, color: 'bg-blue-500' },
    { label: 'Pelanggan', value: '456', icon: Users, color: 'bg-green-500' },
    { label: 'Gerobak Aktif', value: '28', icon: Package, color: 'bg-orange-500' },
    { label: 'Pendapatan', value: 'Rp 45.2M', icon: BarChart3, color: 'bg-purple-500' },
  ];

  const handleViewOrderDetail = (order: typeof orders[0]) => {
    setSelectedOrder(order);
    setShowOrderDetailModal(true);
  };

  const handleAddOrder = () => {
    if (newOrderData.customer && newOrderData.cart && newOrderData.phone && newOrderData.email && newOrderData.startDate && newOrderData.endDate && newOrderData.price) {
      const newId = `#ORD-${String(parseInt(orders[orders.length - 1].id.slice(-3)) + 1).padStart(3, '0')}`;
      const today = new Date().toISOString().split('T')[0];
      setOrders([...orders, { 
        id: newId, 
        customer: newOrderData.customer,
        cart: newOrderData.cart,
        status: newOrderData.status,
        date: today,
        phone: newOrderData.phone,
        email: newOrderData.email,
        startDate: newOrderData.startDate,
        endDate: newOrderData.endDate,
        price: newOrderData.price
      }]);
      
      // Add notification
      if (notificationSettings.orderNotifications) {
        const currentTime = new Date().toLocaleString('id-ID');
        setNotifications([
          { id: notifications.length + 1, type: 'order', message: `Pesanan baru dari ${newOrderData.customer} untuk ${newOrderData.cart}`, time: currentTime, read: false },
          ...notifications
        ]);
      }
      
      setNewOrderData({ customer: '', cart: '', phone: '', email: '', startDate: '', endDate: '', status: 'Pending', price: '' });
      setShowAddOrderModal(false);
    }
  };

  const handleEditCart = (cart: typeof carts[0]) => {
    setEditingCart(cart);
    setFormData({ name: cart.name, location: cart.location, status: cart.status, rent: cart.rent });
    setShowEditModal(true);
  };

  const handleSaveCart = () => {
    if (editingCart) {
      setCarts(carts.map(cart => 
        cart.id === editingCart.id 
          ? { ...cart, name: formData.name, location: formData.location, status: formData.status, rent: formData.rent }
          : cart
      ));
      setShowEditModal(false);
      setEditingCart(null);
    }
  };

  const handleDeleteCart = (cartId: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus gerobak ini?')) {
      setCarts(carts.filter(cart => cart.id !== cartId));
    }
  };

  const handleAddCart = () => {
    if (newCartData.name && newCartData.location) {
      const newId = `GR-${String(carts.length + 1).padStart(3, '0')}`;
      setCarts([...carts, { id: newId, ...newCartData }]);
      setNewCartData({ name: '', location: '', status: 'Tersedia', rent: '-', price: 'Rp 350.000' });
      setShowAddModal(false);
    }
  };

  const handleEditCustomer = (customer: typeof customers[0]) => {
    setEditingCustomer(customer);
    setCustomerFormData({ name: customer.name, phone: customer.phone, email: customer.email, status: customer.status });
    setShowEditCustomerModal(true);
  };

  const handleSaveCustomer = () => {
    if (editingCustomer && customerFormData.name && customerFormData.phone && customerFormData.email) {
      setCustomers(customers.map(customer => 
        customer.id === editingCustomer.id 
          ? { ...customer, name: customerFormData.name, phone: customerFormData.phone, email: customerFormData.email, status: customerFormData.status }
          : customer
      ));
      setShowEditCustomerModal(false);
      setEditingCustomer(null);
    }
  };

  const handleAddCustomer = () => {
    if (newCustomerData.name && newCustomerData.phone && newCustomerData.email) {
      const newId = `CST-${String(customers.length + 1).padStart(3, '0')}`;
      const today = new Date().toISOString().split('T')[0];
      setCustomers([...customers, { id: newId, name: newCustomerData.name, phone: newCustomerData.phone, email: newCustomerData.email, join: today, status: newCustomerData.status }]);
      setNewCustomerData({ name: '', phone: '', email: '', status: 'Aktif' });
      setShowAddCustomerModal(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin logout?')) {
      localStorage.removeItem('adminAuth');
      navigate('/login');
    }
  };

  const handleChangePassword = () => {
    setSecurityMessage({ type: '', text: '' });
    
    if (!securityForm.currentPassword) {
      setSecurityMessage({ type: 'error', text: 'Password saat ini tidak boleh kosong' });
      return;
    }
    if (securityForm.currentPassword !== 'admin123') {
      setSecurityMessage({ type: 'error', text: 'Password saat ini salah' });
      return;
    }
    if (!securityForm.newPassword) {
      setSecurityMessage({ type: 'error', text: 'Password baru tidak boleh kosong' });
      return;
    }
    if (securityForm.newPassword.length < 6) {
      setSecurityMessage({ type: 'error', text: 'Password baru minimal 6 karakter' });
      return;
    }
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      setSecurityMessage({ type: 'error', text: 'Konfirmasi password tidak sesuai' });
      return;
    }

    // Simulate password change
    setSecurityMessage({ type: 'success', text: 'Password berhasil diubah!' });
    setTimeout(() => {
      setSecurityForm({ currentPassword: '', newPassword: '', confirmPassword: '', newEmail: '' });
      setSecurityMessage({ type: '', text: '' });
      setShowSecurityModal(false);
    }, 1500);
  };

  const handleChangeEmail = () => {
    setSecurityMessage({ type: '', text: '' });
    
    if (!securityForm.newEmail) {
      setSecurityMessage({ type: 'error', text: 'Email baru tidak boleh kosong' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(securityForm.newEmail)) {
      setSecurityMessage({ type: 'error', text: 'Format email tidak valid' });
      return;
    }

    // Simulate email change
    setAccountEmail(securityForm.newEmail);
    setSecurityMessage({ type: 'success', text: 'Email berhasil diubah!' });
    setTimeout(() => {
      setSecurityForm({ currentPassword: '', newPassword: '', confirmPassword: '', newEmail: '' });
      setSecurityMessage({ type: '', text: '' });
      setShowSecurityModal(false);
    }, 1500);
  };

  const handleEditPricing = (cart: typeof carts[0]) => {
    setEditingPricingCart(cart);
    setPricingFormData({ price: cart.price });
    setShowPricingModal(true);
  };

  const handleSavePricing = () => {
    if (editingPricingCart && pricingFormData.price) {
      setCarts(carts.map(cart => 
        cart.id === editingPricingCart.id 
          ? { ...cart, price: pricingFormData.price }
          : cart
      ));
      setShowPricingModal(false);
      setEditingPricingCart(null);
    }
  };

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
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
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
                <button 
                  onClick={() => setShowAddOrderModal(true)}
                  className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                >
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
                            <button 
                              onClick={() => handleViewOrderDetail(order)}
                              className="text-orange-600 hover:text-orange-700 font-semibold text-sm flex items-center gap-1"
                            >
                              <Eye size={16} />
                              Lihat Detail
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order Detail Modal */}
              {showOrderDetailModal && selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Detail Pesanan</h2>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">ID Pesanan</p>
                        <p className="text-lg font-semibold text-orange-600">{selectedOrder.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Nama Pelanggan</p>
                        <p className="font-semibold text-gray-900">{selectedOrder.customer}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">No. Telepon</p>
                        <p className="font-semibold text-gray-900">{selectedOrder.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Email</p>
                        <p className="font-semibold text-gray-900">{selectedOrder.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Gerobak</p>
                        <p className="font-semibold text-gray-900">{selectedOrder.cart}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Tanggal Mulai</p>
                          <p className="font-semibold text-gray-900">{selectedOrder.startDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Tanggal Selesai</p>
                          <p className="font-semibold text-gray-900">{selectedOrder.endDate}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Harga</p>
                        <p className="font-semibold text-lg text-orange-600">{selectedOrder.price}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Status</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedOrder.status)}`}>
                          {selectedOrder.status}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowOrderDetailModal(false)}
                      className="w-full mt-6 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold transition-colors"
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              )}

              {/* Add Order Modal */}
              {showAddOrderModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                  <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 my-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Tambah Pesanan</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Pelanggan</label>
                        <input
                          type="text"
                          value={newOrderData.customer}
                          onChange={(e) => setNewOrderData({ ...newOrderData, customer: e.target.value })}
                          placeholder="Contoh: Budi Santoso"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon</label>
                        <input
                          type="tel"
                          value={newOrderData.phone}
                          onChange={(e) => setNewOrderData({ ...newOrderData, phone: e.target.value })}
                          placeholder="085791234567"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          value={newOrderData.email}
                          onChange={(e) => setNewOrderData({ ...newOrderData, email: e.target.value })}
                          placeholder="budi@email.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gerobak</label>
                        <input
                          type="text"
                          value={newOrderData.cart}
                          onChange={(e) => setNewOrderData({ ...newOrderData, cart: e.target.value })}
                          placeholder="Contoh: Gerobak Premium A"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai</label>
                          <input
                            type="date"
                            value={newOrderData.startDate}
                            onChange={(e) => setNewOrderData({ ...newOrderData, startDate: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Selesai</label>
                          <input
                            type="date"
                            value={newOrderData.endDate}
                            onChange={(e) => setNewOrderData({ ...newOrderData, endDate: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Harga</label>
                        <input
                          type="text"
                          value={newOrderData.price}
                          onChange={(e) => setNewOrderData({ ...newOrderData, price: e.target.value })}
                          placeholder="Rp 500.000"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                          value={newOrderData.status}
                          onChange={(e) => setNewOrderData({ ...newOrderData, status: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Aktif">Aktif</option>
                          <option value="Selesai">Selesai</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => setShowAddOrderModal(false)}
                        className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleAddOrder}
                        className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold transition-colors"
                      >
                        Tambah
                      </button>
                    </div>
                  </div>
                </div>
              )}
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
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                >
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
                      <button 
                        onClick={() => handleEditCart(cart)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50 font-semibold text-sm transition-colors"
                      >
                        <Edit2 size={16} />
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteCart(cart.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 font-semibold text-sm transition-colors"
                      >
                        <Trash2 size={16} />
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit Modal */}
              {showEditModal && editingCart && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Edit Gerobak</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Gerobak</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                          value={formData.status}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                          <option value="Tersedia">Tersedia</option>
                          <option value="Tersewa">Tersewa</option>
                          <option value="Maintenance">Maintenance</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Disewa oleh</label>
                        <input
                          type="text"
                          value={formData.rent}
                          onChange={(e) => setFormData({ ...formData, rent: e.target.value })}
                          placeholder="-"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => setShowEditModal(false)}
                        className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleSaveCart}
                        className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold transition-colors"
                      >
                        Simpan
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Add Modal */}
              {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Tambah Gerobak</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Gerobak</label>
                        <input
                          type="text"
                          value={newCartData.name}
                          onChange={(e) => setNewCartData({ ...newCartData, name: e.target.value })}
                          placeholder="Contoh: Gerobak Premium A"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
                        <input
                          type="text"
                          value={newCartData.location}
                          onChange={(e) => setNewCartData({ ...newCartData, location: e.target.value })}
                          placeholder="Contoh: Jakarta Pusat"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                          value={newCartData.status}
                          onChange={(e) => setNewCartData({ ...newCartData, status: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                          <option value="Tersedia">Tersedia</option>
                          <option value="Tersewa">Tersewa</option>
                          <option value="Maintenance">Maintenance</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Disewa oleh</label>
                        <input
                          type="text"
                          value={newCartData.rent}
                          onChange={(e) => setNewCartData({ ...newCartData, rent: e.target.value })}
                          placeholder="-"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Harga Sewa</label>
                        <input
                          type="text"
                          value={newCartData.price}
                          onChange={(e) => setNewCartData({ ...newCartData, price: e.target.value })}
                          placeholder="Contoh: Rp 350.000"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => setShowAddModal(false)}
                        className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleAddCart}
                        className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold transition-colors"
                      >
                        Tambah
                      </button>
                    </div>
                  </div>
                </div>
              )}
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
                <button 
                  onClick={() => setShowAddCustomerModal(true)}
                  className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                >
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
                            <button 
                              onClick={() => handleEditCustomer(customer)}
                              className="text-orange-600 hover:text-orange-700 font-semibold text-sm flex items-center gap-1"
                            >
                              <Edit2 size={16} />
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Edit Customer Modal */}
              {showEditCustomerModal && editingCustomer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Edit Pelanggan</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Pelanggan</label>
                        <input
                          type="text"
                          value={customerFormData.name}
                          onChange={(e) => setCustomerFormData({ ...customerFormData, name: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon</label>
                        <input
                          type="tel"
                          value={customerFormData.phone}
                          onChange={(e) => setCustomerFormData({ ...customerFormData, phone: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          value={customerFormData.email}
                          onChange={(e) => setCustomerFormData({ ...customerFormData, email: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                          value={customerFormData.status}
                          onChange={(e) => setCustomerFormData({ ...customerFormData, status: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                          <option value="Aktif">Aktif</option>
                          <option value="Nonaktif">Nonaktif</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => setShowEditCustomerModal(false)}
                        className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleSaveCustomer}
                        className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold transition-colors"
                      >
                        Simpan
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Add Customer Modal */}
              {showAddCustomerModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Tambah Pelanggan</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Pelanggan</label>
                        <input
                          type="text"
                          value={newCustomerData.name}
                          onChange={(e) => setNewCustomerData({ ...newCustomerData, name: e.target.value })}
                          placeholder="Contoh: Budi Santoso"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon</label>
                        <input
                          type="tel"
                          value={newCustomerData.phone}
                          onChange={(e) => setNewCustomerData({ ...newCustomerData, phone: e.target.value })}
                          placeholder="085791234567"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          value={newCustomerData.email}
                          onChange={(e) => setNewCustomerData({ ...newCustomerData, email: e.target.value })}
                          placeholder="budi@email.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                          value={newCustomerData.status}
                          onChange={(e) => setNewCustomerData({ ...newCustomerData, status: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                          <option value="Aktif">Aktif</option>
                          <option value="Nonaktif">Nonaktif</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => setShowAddCustomerModal(false)}
                        className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleAddCustomer}
                        className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold transition-colors"
                      >
                        Tambah
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Pengaturan</h2>
                <p className="text-gray-600 mt-1">Kelola pengaturan aplikasi Anda</p>
              </div>

              {/* Harga Penyewaan */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Harga Penyewaan Gerobak</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID Gerobak</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nama Gerobak</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Harga Sewa</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {carts.map((cart) => (
                        <tr key={cart.id} className="border-b hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-orange-600">{cart.id}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{cart.name}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-900">{cart.price}</td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleEditPricing(cart)}
                              className="text-orange-600 hover:text-orange-700 font-semibold text-sm flex items-center gap-1"
                            >
                              <Edit2 size={16} />
                              Ubah Harga
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Other Settings */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[
                  { title: 'Profil Bisnis', desc: 'Edit informasi bisnis Anda' },
                  { title: 'Keamanan', desc: 'Ubah password dan keamanan akun' },
                ].map((setting, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{setting.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{setting.desc}</p>
                    <button 
                      onClick={() => {
                        if (setting.title === 'Keamanan') {
                          setShowSecurityModal(true);
                        }
                      }}
                      className="text-orange-600 hover:text-orange-700 font-semibold text-sm"
                    >
                      {setting.title === 'Keamanan' ? 'Ubah Sekarang' : 'Atur Sekarang'} →
                    </button>
                  </div>
                ))}
              </div>

              {/* Notification Settings */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Kelola Notifikasi</h3>
                    <p className="text-gray-600 mt-1">Atur pengaturan notifikasi untuk penyewa baru dan pesanan</p>
                  </div>
                  <button
                    onClick={() => setShowNotificationSettings(!showNotificationSettings)}
                    className="text-orange-600 hover:text-orange-700 font-semibold text-sm"
                  >
                    {showNotificationSettings ? 'Sembunyikan' : 'Tampilkan'} Pengaturan
                  </button>
                </div>

                {showNotificationSettings && (
                  <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.orderNotifications}
                          onChange={(e) => setNotificationSettings({ ...notificationSettings, orderNotifications: e.target.checked })}
                          className="w-4 h-4 text-orange-600 rounded focus:ring-2 focus:ring-orange-500"
                        />
                        <span className="text-gray-900 font-medium">Notifikasi Pesanan Baru</span>
                      </label>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Aktif</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.customerNotifications}
                          onChange={(e) => setNotificationSettings({ ...notificationSettings, customerNotifications: e.target.checked })}
                          className="w-4 h-4 text-orange-600 rounded focus:ring-2 focus:ring-orange-500"
                        />
                        <span className="text-gray-900 font-medium">Notifikasi Pelanggan Baru</span>
                      </label>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Aktif</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.maintenanceNotifications}
                          onChange={(e) => setNotificationSettings({ ...notificationSettings, maintenanceNotifications: e.target.checked })}
                          className="w-4 h-4 text-orange-600 rounded focus:ring-2 focus:ring-orange-500"
                        />
                        <span className="text-gray-900 font-medium">Notifikasi Maintenance</span>
                      </label>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Aktif</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.emailNotifications}
                          onChange={(e) => setNotificationSettings({ ...notificationSettings, emailNotifications: e.target.checked })}
                          className="w-4 h-4 text-orange-600 rounded focus:ring-2 focus:ring-orange-500"
                        />
                        <span className="text-gray-900 font-medium">Kirim Email Notifikasi</span>
                      </label>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Aktif</span>
                    </div>
                  </div>
                )}

                {/* Notifications History */}
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Riwayat Notifikasi</h4>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <div key={notif.id} className={`p-4 rounded-lg border ${notif.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'}`}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className={`text-sm font-medium ${notif.read ? 'text-gray-600' : 'text-blue-900'}`}>
                                {notif.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                            </div>
                            {!notif.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 ml-2"></div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 py-6">Tidak ada notifikasi</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Pricing Modal */}
              {showPricingModal && editingPricingCart && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Ubah Harga Sewa</h2>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">ID Gerobak</p>
                        <p className="text-lg font-semibold text-gray-900">{editingPricingCart.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Nama Gerobak</p>
                        <p className="text-lg font-semibold text-gray-900">{editingPricingCart.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Harga Sewa Baru</label>
                        <input
                          type="text"
                          value={pricingFormData.price}
                          onChange={(e) => setPricingFormData({ price: e.target.value })}
                          placeholder="Contoh: Rp 500.000"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <p className="text-xs text-gray-500 mt-2">Format: Rp XXX.XXX atau Rp X.XXX.XXX</p>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => setShowPricingModal(false)}
                        className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleSavePricing}
                        className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold transition-colors"
                      >
                        Simpan
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Modal */}
              {showSecurityModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Keamanan Akun</h2>
                    
                    {/* Email Display */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-600">Email Akun</p>
                      <p className="text-lg font-semibold text-gray-900">{accountEmail}</p>
                    </div>

                    {/* Success/Error Message */}
                    {securityMessage.text && (
                      <div className={`mb-4 p-4 rounded-lg ${
                        securityMessage.type === 'error' 
                          ? 'bg-red-50 border border-red-200 text-red-800' 
                          : 'bg-green-50 border border-green-200 text-green-800'
                      }`}>
                        <p className="text-sm font-medium">{securityMessage.text}</p>
                      </div>
                    )}

                    {/* Tabs for Password and Email */}
                    <div className="space-y-6">
                      {/* Change Password Section */}
                      <div className="border-t pt-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Ubah Password</h3>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password Saat Ini</label>
                            <input
                              type="password"
                              value={securityForm.currentPassword}
                              onChange={(e) => setSecurityForm({ ...securityForm, currentPassword: e.target.value })}
                              placeholder="Masukkan password saat ini"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password Baru</label>
                            <input
                              type="password"
                              value={securityForm.newPassword}
                              onChange={(e) => setSecurityForm({ ...securityForm, newPassword: e.target.value })}
                              placeholder="Masukkan password baru"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">Minimal 6 karakter</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password Baru</label>
                            <input
                              type="password"
                              value={securityForm.confirmPassword}
                              onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                              placeholder="Ulangi password baru"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                          </div>
                          <button
                            onClick={handleChangePassword}
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors mt-2"
                          >
                            Ubah Password
                          </button>
                        </div>
                      </div>

                      {/* Change Email Section */}
                      <div className="border-t pt-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Ubah Email</h3>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Baru</label>
                            <input
                              type="email"
                              value={securityForm.newEmail}
                              onChange={(e) => setSecurityForm({ ...securityForm, newEmail: e.target.value })}
                              placeholder="Masukkan email baru"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">Contoh: admin@foudcourt.com</p>
                          </div>
                          <button
                            onClick={handleChangeEmail}
                            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-colors mt-2"
                          >
                            Ubah Email
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Close Button */}
                    <button
                      onClick={() => {
                        setShowSecurityModal(false);
                        setSecurityForm({ currentPassword: '', newPassword: '', confirmPassword: '', newEmail: '' });
                        setSecurityMessage({ type: '', text: '' });
                      }}
                      className="w-full mt-6 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
