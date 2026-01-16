import { MessageCircle, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import Catalog from './components/Catalog';
import Pricing from './components/Pricing';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTA from './components/CTA';

function App() {
  const [whatsappNumber, setWhatsappNumber] = useState(() => {
    try {
      const bp = localStorage.getItem('businessProfile');
      if (bp) {
        const parsed = JSON.parse(bp);
        return parsed.whatsapp || '+6285792381511';
      }
    } catch (e) {
      // ignore
    }
    return '+6285792381511';
  });

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'businessProfile') {
        try {
          const bp = JSON.parse(e.newValue || 'null');
          if (bp && bp.whatsapp) setWhatsappNumber(bp.whatsapp);
        } catch (err) {}
      }
    };

    const onCustom = (ev: Event) => {
      try {
        const detail = (ev as CustomEvent).detail;
        if (detail && detail.whatsapp) setWhatsappNumber(detail.whatsapp);
      } catch (err) {}
    };

    window.addEventListener('storage', onStorage);
    window.addEventListener('businessProfileUpdated', onCustom as EventListener);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('businessProfileUpdated', onCustom as EventListener);
    };
  }, []);
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
      <Catalog />
      <Pricing />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTA />

      {/* Admin Button */}
      <Link
        to="/admin"
        className="fixed bottom-6 right-24 bg-gray-800 text-white p-4 rounded-full shadow-2xl hover:bg-gray-900 transition-all hover:scale-110 z-50 flex items-center gap-2 group"
        title="Admin"
      >
        <Settings size={28} />
        <span className="absolute bottom-full right-0 mb-2 bg-gray-800 text-white px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Admin Login
        </span>
      </Link>

      <a 
        href={`https://wa.me/${whatsappNumber.replace(/[^0-9+]/g, '')}?text=Halo,%20saya%20ingin%20sewa%20gerobak%20jualan`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-110 z-50 flex items-center gap-2"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
}

export default App;
