import { Check, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description?: string;
  features?: string[];
  popular?: boolean;
}

const defaultPlans: PricingPlan[] = [
  {
    id: 'daily',
    name: 'Paket Harian',
    price: '50.000',
    period: '/hari',
    description: 'Cocok untuk testing market atau event singkat',
    features: [
      'Sewa gerobak 1 hari',
      'Gerobak siap pakai',
      'Gratis delivery (area kota)',
      'Support via WhatsApp'
    ],
    popular: false
  },
  {
    id: 'weekly',
    name: 'Paket Mingguan',
    price: '300.000',
    period: '/minggu',
    description: 'Hemat lebih banyak untuk usaha jangka pendek',
    features: [
      'Sewa gerobak 7 hari',
      'Gerobak siap pakai',
      'Free branding stiker sederhana',
      'Gratis delivery & pickup',
      'Support prioritas',
      'Hemat 14% vs harian'
    ],
    popular: false
  },
  {
    id: 'monthly',
    name: 'Paket Bulanan',
    price: '1.000.000',
    period: '/bulan',
    description: 'PALING LARIS! Paling hemat untuk usaha serius',
    features: [
      'Sewa gerobak 30 hari',
      'Gerobak premium quality',
      'Free branding stiker & print',
      'Gratis delivery & pickup',
      'Konsultasi bisnis gratis',
      'Support 24/7',
      'Bonus parasol/payung',
      'Hemat 33% vs harian'
    ],
    popular: true
  }
];

export default function Pricing() {
  const [plans, setPlans] = useState<PricingPlan[]>(defaultPlans);

  useEffect(() => {
    // Load pricing plans from localStorage
    const savedPricingPlans = localStorage.getItem('pricingPlans');
    if (savedPricingPlans) {
      try {
        const loadedPlans = JSON.parse(savedPricingPlans);
        // Merge with default plans to preserve structure and features
        setPlans(loadedPlans.map((plan: PricingPlan, index: number) => ({
          ...defaultPlans[index],
          ...plan
        })));
      } catch (error) {
        console.error('Error loading pricing plans:', error);
      }
    }

    // Listen for storage changes from admin page
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'pricingPlans' && e.newValue) {
        try {
          const loadedPlans = JSON.parse(e.newValue);
          setPlans(loadedPlans.map((plan: PricingPlan, index: number) => ({
            ...defaultPlans[index],
            ...plan
          })));
        } catch (error) {
          console.error('Error loading pricing plans:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);


  return (
    <section id="pricing" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Paket & Harga Sewa
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pilih paket sesuai kebutuhan bisnis Anda. Semakin lama sewa, semakin hemat!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl overflow-hidden transition-all ${
                plan.popular
                  ? 'bg-gradient-to-b from-orange-600 to-orange-700 shadow-2xl scale-105 relative'
                  : 'bg-white border-2 border-gray-200 hover:border-orange-300 hover:shadow-xl'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-yellow-400 text-gray-900 px-4 py-1 text-sm font-bold rounded-bl-xl flex items-center gap-1">
                  <Star size={14} fill="currentColor" />
                  TERLARIS
                </div>
              )}

              <div className={`p-8 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className={`text-sm mb-6 ${plan.popular ? 'text-orange-100' : 'text-gray-600'}`}>
                  {plan.description}
                </p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font -semibold">Rp</span>
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-lg">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features?.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check
                        size={20}
                        className={`flex-shrink-0 mt-0.5 ${plan.popular ? 'text-green-300' : 'text-green-600'}`}
                      />
                      <span className={`text-sm leading-relaxed ${plan.popular ? 'text-orange-50' : 'text-gray-700'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://wa.me/+6285792381511?text=Halo,%20saya%20mau%20sewa%20${plan.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center py-4 rounded-xl font-bold transition-all ${
                    plan.popular
                      ? 'bg-white text-orange-600 hover:bg-orange-50'
                      : 'bg-orange-600 text-white hover:bg-orange-700'
                  }`}
                >
                  Pilih Paket Ini
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Butuh paket custom atau sewa lebih dari 3 bulan?</p>
          <a
            href="https://wa.me/62812345678?text=Halo,%20saya%20mau%20tanya%20paket%20custom"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition-all"
          >
            Hubungi Admin untuk Penawaran Khusus →
          </a>
        </div>
      </div>
    </section>
  );
}
