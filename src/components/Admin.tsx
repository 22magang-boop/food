import { BarChart3, Users, Package, ShoppingCart, Settings, LogOut, Menu, X, Edit2, Trash2, Eye, Bell, CheckCircle, AlertCircle, Trash, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Initialize carts from localStorage or use defaults
  const [carts, setCarts] = useState(() => {
    const savedCartsData = localStorage.getItem('cartsData');
    if (savedCartsData) {
      try {
        return JSON.parse(savedCartsData);
      } catch (error) {
        console.error('Error loading saved carts data:', error);
      }
    }
    return [
      { id: 'GR-001', name: 'Gerobak Kopi / Coffee Cart', location: 'Jakarta Pusat', status: 'Tersewa', rent: 'Budi Santoso', price: 'Rp 500.000' },
      { id: 'GR-002', name: 'Gerobak Es Teh / Minuman', location: 'Jakarta Selatan', status: 'Tersewa', rent: 'Siti Nurhaliza', price: 'Rp 500.000' },
      { id: 'GR-003', name: 'Gerobak Snack / Gorengan', location: 'Jakarta Barat', status: 'Tersedia', rent: '-', price: 'Rp 350.000' },
      { id: 'GR-004', name: 'Gerobak Bakso / Mie Ayam', location: 'Jakarta Timur', status: 'Maintenance', rent: '-', price: 'Rp 350.000' },
      { id: 'GR-005', name: 'Gerobak Ayam Geprek', location: 'Tangerang', status: 'Tersewa', rent: 'Ahmad Wijaya', price: 'Rp 500.000' },
    ];
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCart, setEditingCart] = useState<typeof carts[0] | null>(null);
  const [formData, setFormData] = useState({ name: '', location: '', status: '', rent: '' });
  const [newCartData, setNewCartData] = useState({ name: '', location: '', status: 'Tersedia', rent: '-', description: '', features: '' });
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
  
  // Initialize customers from localStorage or use defaults
  const [customers, setCustomers] = useState(() => {
    const savedCustomersData = localStorage.getItem('customersData');
    if (savedCustomersData) {
      try {
        return JSON.parse(savedCustomersData);
      } catch (error) {
        console.error('Error loading saved customers data:', error);
      }
    }
    return [
      { id: 'CST-001', name: 'Budi Santoso', phone: '085791234567', email: 'budi@email.com', join: '2025-12-15', status: 'Aktif' },
      { id: 'CST-002', name: 'Siti Nurhaliza', phone: '085792134567', email: 'siti@email.com', join: '2025-12-10', status: 'Aktif' },
      { id: 'CST-003', name: 'Ahmad Wijaya', phone: '085793214567', email: 'ahmad@email.com', join: '2025-12-05', status: 'Aktif' },
      { id: 'CST-004', name: 'Diana Kusuma', phone: '085794314567', email: 'diana@email.com', join: '2025-11-28', status: 'Nonaktif' },
    ];
  });
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [showEditCustomerModal, setShowEditCustomerModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<typeof customers[0] | null>(null);
  const [customerFormData, setCustomerFormData] = useState({ name: '', phone: '', email: '', status: 'Aktif' });
  const [newCustomerData, setNewCustomerData] = useState({ name: '', phone: '', email: '', status: 'Aktif' });
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [notifications, setNotifications] = useState(() => {
    const savedNotifications = localStorage.getItem('adminNotifications');
    if (savedNotifications) {
      try {
        return JSON.parse(savedNotifications);
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    }
    return [
      { id: 1, type: 'order', message: 'Pesanan baru dari Budi Santoso untuk Gerobak Kopi', time: '2026-01-13 10:30', read: false },
      { id: 2, type: 'customer', message: 'Pelanggan baru: Rudi Hartono', time: '2026-01-12 15:45', read: false },
      { id: 3, type: 'maintenance', message: 'Gerobak Bakso / Mie Ayam masuk maintenance', time: '2026-01-11 08:00', read: true },
    ];
  });
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
  const [showBusinessProfileModal, setShowBusinessProfileModal] = useState(false);
  
  // Initialize business profile from localStorage or use defaults
  const [businessProfile, setBusinessProfile] = useState(() => {
    const savedProfileData = localStorage.getItem('businessProfile');
    if (savedProfileData) {
      try {
        return JSON.parse(savedProfileData);
      } catch (error) {
        console.error('Error loading saved business profile:', error);
      }
    }
    return {
      name: 'Foud Court',
      phone: '+62 821 1234 5678',
      email: 'info@foudcourt.com',
      whatsapp: '+6285792381511',
      address: 'Jl. Merdeka No. 123, Jakarta Pusat 12190',
      city: 'Jakarta',
      province: 'DKI Jakarta',
      description: 'Platform penyewaan gerobak makanan terpercaya dengan layanan terbaik',
    };
  });
  const [businessFormData, setBusinessFormData] = useState({ ...businessProfile });
  const [businessMessage, setBusinessMessage] = useState({ type: '', text: '' });
  const [whatsappNumber, setWhatsappNumber] = useState(businessProfile.whatsapp || '+6285792381511');

  // Initialize pricing plans from localStorage or use defaults
  const [pricingPlans, setPricingPlans] = useState(() => {
    const savedPricingPlans = localStorage.getItem('pricingPlans');
    if (savedPricingPlans) {
      try {
        return JSON.parse(savedPricingPlans);
      } catch (error) {
        console.error('Error loading pricing plans:', error);
      }
    }
    return [
      { id: 'daily', name: 'Paket Harian', price: '50.000', period: '/hari' },
      { id: 'weekly', name: 'Paket Mingguan', price: '300.000', period: '/minggu' },
      { id: 'monthly', name: 'Paket Bulanan', price: '1.000.000', period: '/bulan' },
    ];
  });
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [editingPlanData, setEditingPlanData] = useState({ price: '' });

  const stats = [
    { label: 'Total Pesanan', value: '1,234', icon: ShoppingCart, color: 'bg-blue-500' },
    { label: 'Pelanggan', value: '456', icon: Users, color: 'bg-green-500' },
    { label: 'Gerobak Aktif', value: '28', icon: Package, color: 'bg-orange-500' },
    { label: 'Pendapatan', value: 'Rp 45.2M', icon: BarChart3, color: 'bg-purple-500' },
  ];

  // Sync carts data to localStorage
  useEffect(() => {
    localStorage.setItem('cartsData', JSON.stringify(carts));
  }, [carts]);

  // Sync customers data to localStorage
  useEffect(() => {
    localStorage.setItem('customersData', JSON.stringify(customers));
  }, [customers]);

  // Sync notifications to localStorage
  useEffect(() => {
    localStorage.setItem('adminNotifications', JSON.stringify(notifications));
  }, [notifications]);

  // Sync business profile to localStorage
  // Sync business profile to localStorage
  useEffect(() => {
    localStorage.setItem('businessProfile', JSON.stringify(businessProfile));
    // Update whatsapp number when business profile changes
    if (businessProfile.whatsapp) {
      setWhatsappNumber(businessProfile.whatsapp);
    }
  }, [businessProfile]);

  // Sync pricing plans to localStorage
  useEffect(() => {
    localStorage.setItem('pricingPlans', JSON.stringify(pricingPlans));
  }, [pricingPlans]);
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
      setCarts(carts.map((cart: typeof carts[0]) => 
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
      setCarts(carts.filter((cart: typeof carts[0]) => cart.id !== cartId));
    }
  };

  const handleAddCart = () => {
    if (newCartData.name && newCartData.location && newCartData.description && newCartData.features) {
      const newId = `GR-${String(carts.length + 1).padStart(3, '0')}`;
      // Parse features string to array
      const featuresArray = newCartData.features.split(',').map(f => f.trim()).filter(f => f);
      const newCart = { 
        id: newId, 
        ...newCartData, 
        features: featuresArray 
      };
      setCarts([...carts, newCart]);
      setNewCartData({ name: '', location: '', status: 'Tersedia', rent: '-', description: '', features: '' });
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
      setCustomers(customers.map((customer: typeof customers[0]) => 
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

      // Add notification for new customer
      if (notificationSettings.customerNotifications) {
        const currentTime = new Date().toLocaleString('id-ID');
        setNotifications([
          { id: notifications.length + 1, type: 'customer', message: `Pelanggan baru: ${newCustomerData.name}`, time: currentTime, read: false },
          ...notifications
        ]);
      }
    }
  };

  const handleMarkNotificationRead = (notificationId: number) => {
    setNotifications(notifications.map((notif: any) => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const handleDeleteNotification = (notificationId: number) => {
    setNotifications(notifications.filter((notif: any) => notif.id !== notificationId));
  };

  const handleClearAllNotifications = () => {
    if (window.confirm('Hapus semua notifikasi?')) {
      setNotifications([]);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingCart size={18} className="text-orange-600" />;
      case 'customer':
        return <Users size={18} className="text-green-600" />;
      case 'maintenance':
        return <AlertCircle size={18} className="text-red-600" />;
      default:
        return <Bell size={18} className="text-blue-600" />;
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

    // Save new password to localStorage
    const adminCredentials = {
      email: accountEmail,
      password: securityForm.newPassword
    };
    localStorage.setItem('adminCredentials', JSON.stringify(adminCredentials));
    
    setSecurityMessage({ type: 'success', text: 'Password berhasil diubah! Password baru akan berlaku saat login berikutnya.' });
    setTimeout(() => {
      setSecurityForm({ currentPassword: '', newPassword: '', confirmPassword: '', newEmail: '' });
      setSecurityMessage({ type: '', text: '' });
      setShowSecurityModal(false);
    }, 2000);
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

    // Update email in localStorage credentials
    const storedCredentials = localStorage.getItem('adminCredentials');
    let adminCredentials = { email: 'admin@foudcourt.com', password: 'admin123' };
    
    if (storedCredentials) {
      try {
        adminCredentials = JSON.parse(storedCredentials);
      } catch (error) {
        console.error('Error loading credentials:', error);
      }
    }
    
    // Update with new email and save
    adminCredentials.email = securityForm.newEmail;
    localStorage.setItem('adminCredentials', JSON.stringify(adminCredentials));
    
    // Update displayed email
    setAccountEmail(securityForm.newEmail);
    setSecurityMessage({ type: 'success', text: 'Email berhasil diubah! Email baru akan berlaku saat login berikutnya.' });
    setTimeout(() => {
      setSecurityForm({ currentPassword: '', newPassword: '', confirmPassword: '', newEmail: '' });
      setSecurityMessage({ type: '', text: '' });
      setShowSecurityModal(false);
    }, 2000);
  };

  const handleEditBusinessProfile = () => {
    setBusinessFormData({ ...businessProfile });
    setShowBusinessProfileModal(true);
  };

  const handleSaveBusinessProfile = () => {
    setBusinessMessage({ type: '', text: '' });
    
    if (!businessFormData.name) {
      setBusinessMessage({ type: 'error', text: 'Nama bisnis tidak boleh kosong' });
      return;
    }
    if (!businessFormData.phone) {
      setBusinessMessage({ type: 'error', text: 'Nomor telepon tidak boleh kosong' });
      return;
    }
    if (!businessFormData.email) {
      setBusinessMessage({ type: 'error', text: 'Email tidak boleh kosong' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(businessFormData.email)) {
      setBusinessMessage({ type: 'error', text: 'Format email tidak valid' });
      return;
    }
    if (!businessFormData.whatsapp) {
      setBusinessMessage({ type: 'error', text: 'Nomor WhatsApp tidak boleh kosong' });
      return;
    }
    if (!/^(\+62|62|0)[0-9]{9,12}$/.test(businessFormData.whatsapp.replace(/[-\s]/g, ''))) {
      setBusinessMessage({ type: 'error', text: 'Format nomor WhatsApp tidak valid' });
      return;
    }
    if (!businessFormData.address) {
      setBusinessMessage({ type: 'error', text: 'Alamat tidak boleh kosong' });
      return;
    }

    // Save business profile
    setBusinessProfile({ ...businessFormData });
    setBusinessMessage({ type: 'success', text: 'Profil bisnis berhasil diperbarui!' });
    setTimeout(() => {
      setBusinessMessage({ type: '', text: '' });
      setShowBusinessProfileModal(false);
    }, 1500);
  };

  const handleEditPricingPlan = (planId: string) => {
    const plan = pricingPlans.find((p: typeof pricingPlans[0]) => p.id === planId);
    if (plan) {
      setEditingPlanId(planId);
      setEditingPlanData({ price: plan.price });
      setShowPricingModal(true);
    }
  };

  const handleSavePricingPlan = () => {
    if (editingPlanId && editingPlanData.price) {
      setPricingPlans(pricingPlans.map((plan: typeof pricingPlans[0]) => 
        plan.id === editingPlanId 
          ? { ...plan, price: editingPlanData.price }
          : plan
      ));
      setShowPricingModal(false);
      setEditingPlanId(null);
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
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-orange-600">Admin Panel</h1>
              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9+]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                title={`Chat WhatsApp: ${whatsappNumber}`}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              >
                <MessageCircle size={24} />
              </a>
            </div>
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
                {carts.map((cart: typeof carts[0]) => (
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
                  <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto flex flex-col">
                    <div className="p-6 flex-1 overflow-y-auto">
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
                          <label className="block text-sm font-medium text-gray-700 mb-1">Penjelasan/Deskripsi</label>
                          <textarea
                            value={newCartData.description}
                            onChange={(e) => setNewCartData({ ...newCartData, description: e.target.value })}
                            placeholder="Contoh: Desain modern dan compact, cocok untuk jualan kopi..."
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                          <p className="text-xs text-gray-500 mt-1">Deskripsi singkat tentang gerobak</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Kelengkapan (Fitur)</label>
                          <textarea
                            value={newCartData.features}
                            onChange={(e) => setNewCartData({ ...newCartData, features: e.target.value })}
                            placeholder="Contoh: Tempat mesin kopi, Storage untuk cup, Display topping, Lampu LED"
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                          <p className="text-xs text-gray-500 mt-1">Pisahkan dengan koma (,) untuk setiap fitur</p>
                        </div>
                      </div>
                    </div>
                    <div className="border-t p-6">
                      <div className="flex gap-3">
                        <button
                          onClick={() => setShowAddModal(false)}
                          className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
                        >
                          Batal
                        </button>
                        <button
                          onClick={handleAddCart}
                          className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={!newCartData.name || !newCartData.location || !newCartData.description || !newCartData.features}
                        >
                          Tambah
                        </button>
                      </div>
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
                      {customers.map((customer: typeof customers[0]) => (
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

              {/* Paket & Harga Sewa */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Paket & Harga Sewa</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {pricingPlans.map((plan: typeof pricingPlans[0]) => (
                    <div key={plan.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{plan.name}</h4>
                      <div className="flex items-baseline gap-1 mb-4">
                        <span className="text-sm text-gray-600">Rp</span>
                        <span className="text-3xl font-bold text-orange-600">{plan.price}</span>
                        <span className="text-gray-600 ml-2">{plan.period}</span>
                      </div>
                      <button
                        onClick={() => handleEditPricingPlan(plan.id)}
                        className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <Edit2 size={16} />
                        Ubah Harga
                      </button>
                    </div>
                  ))}
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
                        } else if (setting.title === 'Profil Bisnis') {
                          handleEditBusinessProfile();
                        }
                      }}
                      className="text-orange-600 hover:text-orange-700 font-semibold text-sm"
                    >
                      Atur Sekarang →
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
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">Riwayat Notifikasi</h4>
                    {notifications.length > 0 && (
                      <button
                        onClick={handleClearAllNotifications}
                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        Hapus Semua
                      </button>
                    )}
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notif: any) => (
                        <div key={notif.id} className={`p-4 rounded-lg border flex items-start justify-between ${notif.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'}`}>
                          <div className="flex items-start gap-3 flex-1">
                            <div className="mt-0.5 flex-shrink-0">
                              {getNotificationIcon(notif.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium break-words ${notif.read ? 'text-gray-600' : 'text-gray-900'}`}>
                                {notif.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                            {!notif.read && (
                              <button
                                onClick={() => handleMarkNotificationRead(notif.id)}
                                title="Tandai sebagai dibaca"
                                className="p-1.5 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                              >
                                <CheckCircle size={16} />
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteNotification(notif.id)}
                              title="Hapus notifikasi"
                              className="p-1.5 text-red-600 hover:bg-red-100 rounded transition-colors"
                            >
                              <Trash size={16} />
                            </button>
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
              {showPricingModal && editingPlanId && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Ubah Harga Paket</h2>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Paket</p>
                        <p className="text-lg font-semibold text-gray-900">{pricingPlans.find((p: typeof pricingPlans[0]) => p.id === editingPlanId)?.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Harga Baru</label>
                        <input
                          type="text"
                          value={editingPlanData.price}
                          onChange={(e) => setEditingPlanData({ price: e.target.value })}
                          placeholder="Contoh: 50.000"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <p className="text-xs text-gray-500 mt-2">Format: XXX.XXX atau X.XXX.XXX (tanpa Rp)</p>
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
                        onClick={handleSavePricingPlan}
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
                  <div className="bg-white rounded-lg shadow-xl max-w-md w-full flex flex-col max-h-[90vh]">
                    <div className="p-6 overflow-y-auto flex-1">
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
                              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
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
                              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-colors"
                            >
                              Ubah Email
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Close Button - Fixed at bottom */}
                    <div className="border-t p-6">
                      <button
                        onClick={() => {
                          setShowSecurityModal(false);
                          setSecurityForm({ currentPassword: '', newPassword: '', confirmPassword: '', newEmail: '' });
                          setSecurityMessage({ type: '', text: '' });
                        }}
                        className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
                      >
                        Tutup
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Business Profile Modal */}
              {showBusinessProfileModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Profil Bisnis</h2>
                    
                    {/* Success/Error Message */}
                    {businessMessage.text && (
                      <div className={`mb-4 p-4 rounded-lg ${
                        businessMessage.type === 'error' 
                          ? 'bg-red-50 border border-red-200 text-red-800' 
                          : 'bg-green-50 border border-green-200 text-green-800'
                      }`}>
                        <p className="text-sm font-medium">{businessMessage.text}</p>
                      </div>
                    )}

                    {/* Form Fields */}
                    <div className="space-y-4">
                      {/* Nama Bisnis */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Bisnis</label>
                        <input
                          type="text"
                          value={businessFormData.name}
                          onChange={(e) => setBusinessFormData({ ...businessFormData, name: e.target.value })}
                          placeholder="Masukkan nama bisnis"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>

                      {/* Nomor Telepon */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
                        <input
                          type="tel"
                          value={businessFormData.phone}
                          onChange={(e) => setBusinessFormData({ ...businessFormData, phone: e.target.value })}
                          placeholder="Contoh: +62 821 1234 5678"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          value={businessFormData.email}
                          onChange={(e) => setBusinessFormData({ ...businessFormData, email: e.target.value })}
                          placeholder="Contoh: info@bisnis.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>

                      {/* Nomor WhatsApp */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nomor WhatsApp</label>
                        <input
                          type="tel"
                          value={businessFormData.whatsapp}
                          onChange={(e) => setBusinessFormData({ ...businessFormData, whatsapp: e.target.value })}
                          placeholder="Contoh: +6285792381511 atau 085792381511"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">Gunakan format internasional (+62) atau lokal (08)</p>
                      </div>

                      {/* Alamat */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                        <textarea
                          value={businessFormData.address}
                          onChange={(e) => setBusinessFormData({ ...businessFormData, address: e.target.value })}
                          placeholder="Masukkan alamat lengkap bisnis"
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>

                      {/* Kota */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Kota</label>
                        <input
                          type="text"
                          value={businessFormData.city}
                          onChange={(e) => setBusinessFormData({ ...businessFormData, city: e.target.value })}
                          placeholder="Masukkan nama kota"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>

                      {/* Provinsi */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Provinsi</label>
                        <input
                          type="text"
                          value={businessFormData.province}
                          onChange={(e) => setBusinessFormData({ ...businessFormData, province: e.target.value })}
                          placeholder="Masukkan nama provinsi"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>

                      {/* Deskripsi */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Bisnis</label>
                        <textarea
                          value={businessFormData.description}
                          onChange={(e) => setBusinessFormData({ ...businessFormData, description: e.target.value })}
                          placeholder="Masukkan deskripsi singkat tentang bisnis Anda"
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => {
                          setShowBusinessProfileModal(false);
                          setBusinessMessage({ type: '', text: '' });
                        }}
                        className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleSaveBusinessProfile}
                        className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold transition-colors"
                      >
                        Simpan
                      </button>
                    </div>
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
