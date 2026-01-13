import { MessageCircle, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from './components/Hero';
import Features from './components/Features';
import Catalog from './components/Catalog';
import Pricing from './components/Pricing';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTA from './components/CTA';

function App() {
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
        to="/login"
        className="fixed bottom-6 right-24 bg-gray-800 text-white p-4 rounded-full shadow-2xl hover:bg-gray-900 transition-all hover:scale-110 z-50 flex items-center gap-2 group"
        title="Admin Login"
      >
        <Settings size={28} />
        <span className="absolute bottom-full right-0 mb-2 bg-gray-800 text-white px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Admin Login
        </span>
      </Link>

      <a 
        href="https://wa.me/+6285792381511?text=Halo,%20saya%20ingin%20sewa%20gerobak%20jualan"
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
