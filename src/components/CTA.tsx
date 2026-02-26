import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getBusinessProfile } from '../lib/supabaseApi';

export default function CTA() {
  const [whatsappNumber, setWhatsappNumber] = useState('+6282223456206');

  useEffect(() => {
    const loadFromLocal = () => {
      const businessProfile = localStorage.getItem('businessProfile');
      if (businessProfile) {
        try {
          const profile = JSON.parse(businessProfile);
          if (profile.whatsapp) setWhatsappNumber(profile.whatsapp);
        } catch (error) {
          console.error('Error loading business profile:', error);
        }
      }
    };

    getBusinessProfile()
      .then((profile) => {
        if (profile?.whatsapp) setWhatsappNumber(profile.whatsapp);
        else loadFromLocal();
      })
      .catch(() => loadFromLocal());

    // Listen for storage changes from admin page
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'businessProfile' && e.newValue) {
        try {
          const profile = JSON.parse(e.newValue);
          if (profile.whatsapp) {
            setWhatsappNumber(profile.whatsapp);
          }
        } catch (error) {
          console.error('Error loading business profile:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-orange-400/30 text-white px-4 py-2 rounded-full mb-6">
          <Sparkles size={20} />
          <span className="font-semibold">Jangan Tunda Lagi!</span>
        </div>

        <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Mulai Bisnis Kuliner <br />
          <span className="text-orange-100">Tanpa Modal Besar</span>
        </h2>

        <p className="text-xl lg:text-2xl text-orange-50 mb-8 max-w-3xl mx-auto leading-relaxed">
          Ribuan orang sudah membuktikan kesuksesan mereka. Sekarang giliran Anda untuk mewujudkan impian jadi pengusaha!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a
            href={`https://wa.me/${whatsappNumber.replace(/[^0-9+]/g, '')}?text=Halo,%20saya%20siap%20mulai%20bisnis%20dengan%20sewa%20gerobak!`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-orange-600 px-10 py-5 rounded-xl text-xl font-bold hover:bg-orange-50 transition-all shadow-2xl hover:shadow-3xl hover:scale-105 group"
          >
            <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
            Sewa Gerobak Sekarang
            <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </a>

          <a
            href="#catalog"
            className="inline-flex items-center gap-2 bg-orange-700 text-white px-10 py-5 rounded-xl text-xl font-bold hover:bg-orange-800 transition-all border-2 border-orange-400"
          >
            Lihat Katalog Lengkap
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-4xl font-bold text-white mb-2">500+</div>
            <div className="text-orange-100 text-sm">Penyewa Sukses</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-4xl font-bold text-white mb-2">50+</div>
            <div className="text-orange-100 text-sm">Gerobak Ready</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-4xl font-bold text-white mb-2">⭐ 4.9</div>
            <div className="text-orange-100 text-sm">Rating Google</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-4xl font-bold text-white mb-2">24/7</div>
            <div className="text-orange-100 text-sm">Support Ready</div>
          </div>
        </div>
      </div>

      <footer className="mt-16 pt-8 border-t border-orange-400/30 text-center text-orange-100">
        <p className="mb-2">© SewaContainer. Semua hak cipta dilindungi.</p>
        <p className="text-sm text-orange-200">Solusi Tepat untuk Memulai Bisnis Kuliner Anda</p>
      </footer>
    </section>
  );
} 