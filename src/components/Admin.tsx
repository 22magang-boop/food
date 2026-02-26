import { LogOut, Edit2, MessageCircle, ArrowLeft, Plus, Trash2, Coffee, IceCream, Sandwich, Soup, Drumstick, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { deleteCartById, getBusinessProfile, getCarts, getPricingPlans, upsertBusinessProfile, upsertCarts, upsertPricingPlans } from '../lib/supabaseApi';

export default function Admin() {
  const navigate = useNavigate();
  const [whatsappNumber, setWhatsappNumber] = useState('+6282223456206');

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
      whatsapp: '+6282223456206',
      address: 'Jl. Merdeka No. 123, Jakarta Pusat 12190',
      city: 'Jakarta',
      province: 'DKI Jakarta',
      description: 'Platform penyewaan gerobak makanan terpercaya dengan layanan terbaik',
    };
  });
  const [businessFormData, setBusinessFormData] = useState({ ...businessProfile });
  const [businessMessage, setBusinessMessage] = useState({ type: '', text: '' });
  const [showBusinessProfileModal, setShowBusinessProfileModal] = useState(false);

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
  const [showPricingModal, setShowPricingModal] = useState(false);

  // Icon mapping untuk gerobak
  const iconMap: { [key: string]: any } = {
    Coffee,
    IceCream,
    Sandwich,
    Soup,
    Drumstick,
    ShoppingCart
  };

  // Default carts data
  const defaultCartsData = [
    {
      id: 'GR-001',
      iconName: 'Coffee',
      name: 'Gerobak Kopi / Coffee Cart',
      description: 'Desain modern dan compact, cocok untuk jualan kopi, espresso, dan minuman kekinian. Dilengkapi tempat penyimpanan bahan dan display menarik.',
      features: ['Tempat mesin kopi', 'Storage untuk cup', 'Display topping', 'Lampu LED']
    },
    {
      id: 'GR-002',
      iconName: 'IceCream',
      name: 'Gerobak Es Teh / Minuman',
      description: 'Sempurna untuk bisnis minuman segar seperti es teh, jus, smoothies, dan minuman dingin lainnya. Ruang luas untuk ice box dan dispenser.',
      features: ['Ruang ice box besar', 'Tempat dispenser', 'Rak botol/cup', 'Parasol pelindung']
    },
    {
      id: 'GR-003',
      iconName: 'Sandwich',
      name: 'Gerobak Snack / Gorengan',
      description: 'Ideal untuk jualan gorengan, dimsum, risol, atau snack lainnya. Dilengkapi dengan etalase kaca untuk display produk yang higienis.',
      features: ['Etalase kaca', 'Kompor portable', 'Rak display', 'Laci penyimpanan']
    },
    {
      id: 'GR-004',
      iconName: 'Soup',
      name: 'Gerobak Bakso / Mie Ayam',
      description: 'Dirancang khusus untuk jualan makanan berkuah. Tempat rebus yang aman, storage bumbu lengkap, dan tatakan mangkuk yang rapi.',
      features: ['Kompor gas aman', 'Tempat rebus besar', 'Storage bumbu', 'Rak mangkuk']
    },
    {
      id: 'GR-005',
      iconName: 'Drumstick',
      name: 'Gerobak Ayam Geprek',
      description: 'Gerobak khusus untuk ayam geprek dan gorengan. Dilengkapi dengan fryer space, tempat cobek, dan display yang menggugah selera.',
      features: ['Ruang fryer', 'Display etalase', 'Tempat cobek', 'Storage matang']
    }
  ];

  // Initialize carts from localStorage or use defaults
  const [carts, setCarts] = useState(() => {
    const savedCartsData = localStorage.getItem('cartsData');
    if (savedCartsData) {
      try {
        return JSON.parse(savedCartsData);
      } catch (error) {
        console.error('Error loading saved carts data:', error);
        return defaultCartsData;
      }
    }
    return defaultCartsData;
  });

  // Cart form states
  const [showCartModal, setShowCartModal] = useState(false);
  const [editingCartId, setEditingCartId] = useState<string | null>(null);
  const [cartFormData, setCartFormData] = useState({
    id: '',
    iconName: 'ShoppingCart',
    name: '',
    description: ''
  });
  const [cartMessage, setCartMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const [bp, sbPlans, sbCarts] = await Promise.all([getBusinessProfile(), getPricingPlans(), getCarts()]);
        if (!mounted) return;

        if (bp) {
          setBusinessProfile(bp);
          setBusinessFormData({ ...bp });
          if ((bp as any).whatsapp) setWhatsappNumber((bp as any).whatsapp);
        }

        if (sbPlans.length) {
          setPricingPlans(
            sbPlans.map((p) => ({
              id: p.id,
              name: p.name,
              price: p.price,
              period: p.period,
            }))
          );
        }

        if (sbCarts.length) {
          setCarts(
            sbCarts.map((c: any) => ({
              id: c.id,
              iconName: c.icon_name,
              name: c.name,
              description: c.description,
              features: (c.features as any) || [],
            }))
          );
        }
      } catch (e) {
        // ignore; fallback stays on localStorage/default initial state
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  // Sync business profile to localStorage
  useEffect(() => {
    localStorage.setItem('businessProfile', JSON.stringify(businessProfile));
    if (businessProfile.whatsapp) {
      setWhatsappNumber(businessProfile.whatsapp);
    }
  }, [businessProfile]);

  // Sync pricing plans to localStorage
  useEffect(() => {
    localStorage.setItem('pricingPlans', JSON.stringify(pricingPlans));
  }, [pricingPlans]);

  // Initialize carts to localStorage on mount if not exists
  useEffect(() => {
    const savedCartsData = localStorage.getItem('cartsData');
    if (!savedCartsData) {
      localStorage.setItem('cartsData', JSON.stringify(defaultCartsData));
    }
  }, []);

  // Sync carts to localStorage
  useEffect(() => {
    localStorage.setItem('cartsData', JSON.stringify(carts));
    // Trigger custom event for same tab
    try {
      window.dispatchEvent(new CustomEvent('cartsDataUpdated'));
    } catch (e) {
      // ignore if dispatch fails
    }
    // Trigger storage event for other tabs/windows
    try {
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'cartsData',
        newValue: JSON.stringify(carts)
      }));
    } catch (e) {
      // ignore if dispatch fails
    }
  }, [carts]);

  const handleSaveBusinessProfile = async () => {
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

    try {
      const saved = await upsertBusinessProfile({
        name: businessFormData.name,
        phone: businessFormData.phone,
        email: businessFormData.email,
        whatsapp: businessFormData.whatsapp,
        address: businessFormData.address,
        city: businessFormData.city,
        province: businessFormData.province,
        description: businessFormData.description,
      });
      if (saved) {
        setBusinessProfile({ ...saved });
        setBusinessFormData({ ...saved });
      } else {
        setBusinessProfile({ ...businessFormData });
      }
    } catch (e) {
      setBusinessMessage({ type: 'error', text: 'Gagal menyimpan ke database. Pastikan sudah login admin.' });
      return;
    }
    // notify other parts of the app (same tab) that the business profile changed
    try {
      window.dispatchEvent(new CustomEvent('businessProfileUpdated', { detail: { ...businessFormData } }));
    } catch (e) {
      // ignore if dispatch fails
    }
    setBusinessMessage({ type: 'success', text: 'Profil bisnis berhasil diperbarui!' });
    setTimeout(() => {
      setBusinessMessage({ type: '', text: '' });
      setShowBusinessProfileModal(false);
    }, 1500);
  };

  const handleEditPricingPlan = (planId: string) => {
    const plan = pricingPlans.find((p: any) => p.id === planId);
    if (plan) {
      setEditingPlanId(planId);
      setEditingPlanData({ price: plan.price });
      setShowPricingModal(true);
    }
  };

  const handleSavePricingPlan = async () => {
    if (!editingPlanId || !editingPlanData.price) return;

    const nextPlans = pricingPlans.map((plan: any) =>
      plan.id === editingPlanId ? { ...plan, price: editingPlanData.price } : plan
    );
    setPricingPlans(nextPlans);

    try {
      await upsertPricingPlans(
        nextPlans.map((p: any) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          period: p.period,
          description: null,
          features: null,
          popular: false,
        }))
      );
    } catch (e) {
      // ignore
    }

    setShowPricingModal(false);
    setEditingPlanId(null);
  };

  // Cart management functions
  const handleAddCart = () => {
    setEditingCartId(null);
    setCartFormData({
      id: `GR-${String(carts.length + 1).padStart(3, '0')}`,
      iconName: 'ShoppingCart',
      name: '',
      description: ''
    });
    setCartMessage({ type: '', text: '' });
    setShowCartModal(true);
  };

  const handleEditCart = (cartId: string) => {
    const cart = carts.find((c: any) => c.id === cartId);
    if (cart) {
      setEditingCartId(cartId);
      setCartFormData({
        id: cart.id,
        iconName: cart.iconName || 'ShoppingCart',
        name: cart.name || '',
        description: cart.description || ''
      });
      setCartMessage({ type: '', text: '' });
      setShowCartModal(true);
    }
  };

  const handleDeleteCart = async (cartId: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus gerobak ini?')) {
      try {
        await deleteCartById(cartId);
      } catch (e) {
        // ignore
      }
      setCarts(carts.filter((c: any) => c.id !== cartId));
    }
  };

  const handleSaveCart = async () => {
    setCartMessage({ type: '', text: '' });

    // Validation
    if (!cartFormData.name.trim()) {
      setCartMessage({ type: 'error', text: 'Nama gerobak tidak boleh kosong' });
      return;
    }
    if (!cartFormData.description.trim()) {
      setCartMessage({ type: 'error', text: 'Deskripsi tidak boleh kosong' });
      return;
    }

    const existing = carts.find((c: any) => c.id === (editingCartId || cartFormData.id));
    const cartData = {
      id: cartFormData.id,
      iconName: cartFormData.iconName,
      name: cartFormData.name.trim(),
      description: cartFormData.description.trim(),
      features: existing?.features || []
    };

    if (editingCartId) {
      // Update existing cart
      const nextCarts = carts.map((c: any) => (c.id === editingCartId ? cartData : c));
      setCarts(nextCarts);
      try {
        await upsertCarts(
          nextCarts.map((c: any) => ({
            id: c.id,
            icon_name: c.iconName,
            name: c.name,
            description: c.description,
            features: c.features || [],
          }))
        );
      } catch (e) {
        // ignore
      }
      setCartMessage({ type: 'success', text: 'Gerobak berhasil diperbarui!' });
    } else {
      // Add new cart
      const nextCarts = [...carts, cartData];
      setCarts(nextCarts);
      try {
        await upsertCarts(
          nextCarts.map((c: any) => ({
            id: c.id,
            icon_name: c.iconName,
            name: c.name,
            description: c.description,
            features: c.features || [],
          }))
        );
      } catch (e) {
        // ignore
      }
      setCartMessage({ type: 'success', text: 'Gerobak berhasil ditambahkan!' });
    }

    setTimeout(() => {
      setCartMessage({ type: '', text: '' });
      setShowCartModal(false);
      setEditingCartId(null);
    }, 1500);
  };

  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin logout?')) {
      supabase.auth.signOut().finally(() => {
        localStorage.removeItem('adminAuth');
        navigate('/login');
      });
    }
  };

  const handleBackToWeb = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-orange-600">Admin Pengaturan</h1>
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
          <div className="flex items-center gap-4">
            <button 
              onClick={handleBackToWeb}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Kembali ke halaman web</span>
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="space-y-6">
          {/* Paket & Harga Sewa */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Paket & Harga Sewa</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {pricingPlans.map((plan: any) => (
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

          {/* Kelola Gerobak */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Kelola Gerobak</h3>
                <p className="text-gray-600 mt-1">Tambah, edit, atau hapus gerobak yang ditampilkan di landing page</p>
              </div>
              <button 
                onClick={handleAddCart}
                className="flex items-center gap-2 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold transition-colors"
              >
                <Plus size={20} />
                Tambah Gerobak
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {carts.map((cart: any) => {
                const IconComponent = iconMap[cart.iconName] || ShoppingCart;
                return (
                  <div key={cart.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <IconComponent className="text-orange-600" size={24} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{cart.name}</h4>
                          <p className="text-xs text-gray-500">{cart.id}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{cart.description}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditCart(cart.id)}
                        className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-semibold transition-colors flex items-center justify-center gap-1"
                      >
                        <Edit2 size={14} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCart(cart.id)}
                        className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-semibold transition-colors flex items-center justify-center"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Profil Bisnis */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Profil Bisnis</h3>
                <p className="text-gray-600 mt-1">Kelola informasi bisnis Anda</p>
              </div>
              <button 
                onClick={() => {
                  setBusinessFormData({ ...businessProfile });
                  setShowBusinessProfileModal(true);
                }}
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold transition-colors"
              >
                Edit Profil
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Nama Bisnis</p>
                <p className="text-lg font-semibold text-gray-900">{businessProfile.name}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-lg font-semibold text-gray-900">{businessProfile.email}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Nomor Telepon</p>
                <p className="text-lg font-semibold text-gray-900">{businessProfile.phone}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Nomor WhatsApp</p>
                <p className="text-lg font-semibold text-gray-900">{businessProfile.whatsapp}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Pricing Modal */}
      {showPricingModal && editingPlanId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ubah Harga Paket</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Paket</p>
                <p className="text-lg font-semibold text-gray-900">{pricingPlans.find((p: any) => p.id === editingPlanId)?.name}</p>
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

      {/* Cart Modal */}
      {showCartModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingCartId ? 'Edit Gerobak' : 'Tambah Gerobak Baru'}
            </h2>
            
            {cartMessage.text && (
              <div className={`mb-4 p-4 rounded-lg ${
                cartMessage.type === 'error' 
                  ? 'bg-red-50 border border-red-200 text-red-800' 
                  : 'bg-green-50 border border-green-200 text-green-800'
              }`}>
                <p className="text-sm font-medium">{cartMessage.text}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID Gerobak</label>
                <input
                  type="text"
                  value={cartFormData.id}
                  onChange={(e) => setCartFormData({ ...cartFormData, id: e.target.value })}
                  placeholder="GR-001"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  disabled={!!editingCartId}
                />
                <p className="text-xs text-gray-500 mt-1">ID tidak bisa diubah saat edit</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                <select
                  value={cartFormData.iconName}
                  onChange={(e) => setCartFormData({ ...cartFormData, iconName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="Coffee">☕ Coffee</option>
                  <option value="IceCream">🍦 Ice Cream</option>
                  <option value="Sandwich">🥪 Sandwich</option>
                  <option value="Soup">🍜 Soup</option>
                  <option value="Drumstick">🍗 Drumstick</option>
                  <option value="ShoppingCart">🛒 Shopping Cart</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Gerobak *</label>
                <input
                  type="text"
                  value={cartFormData.name}
                  onChange={(e) => setCartFormData({ ...cartFormData, name: e.target.value })}
                  placeholder="Contoh: Gerobak Kopi / Coffee Cart"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi *</label>
                <textarea
                  value={cartFormData.description}
                  onChange={(e) => setCartFormData({ ...cartFormData, description: e.target.value })}
                  placeholder="Deskripsi lengkap tentang gerobak..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowCartModal(false);
                  setCartMessage({ type: '', text: '' });
                  setEditingCartId(null);
                }}
                className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSaveCart}
                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold transition-colors"
              >
                {editingCartId ? 'Simpan Perubahan' : 'Tambah Gerobak'}
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
            
            {businessMessage.text && (
              <div className={`mb-4 p-4 rounded-lg ${
                businessMessage.type === 'error' 
                  ? 'bg-red-50 border border-red-200 text-red-800' 
                  : 'bg-green-50 border border-green-200 text-green-800'
              }`}>
                <p className="text-sm font-medium">{businessMessage.text}</p>
              </div>
            )}

            <div className="space-y-4">
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
  );
}
