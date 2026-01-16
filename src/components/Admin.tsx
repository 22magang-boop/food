import { LogOut, Edit2, MessageCircle, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const navigate = useNavigate();
  const [whatsappNumber, setWhatsappNumber] = useState('+6285792381511');

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

    setBusinessProfile({ ...businessFormData });
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

  const handleSavePricingPlan = () => {
    if (editingPlanId && editingPlanData.price) {
      setPricingPlans(pricingPlans.map((plan: any) => 
        plan.id === editingPlanId 
          ? { ...plan, price: editingPlanData.price }
          : plan
      ));
      setShowPricingModal(false);
      setEditingPlanId(null);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin logout?')) {
      localStorage.removeItem('adminAuth');
      navigate('/login');
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
