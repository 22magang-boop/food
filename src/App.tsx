import { MessageCircle } from 'lucide-react';
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
