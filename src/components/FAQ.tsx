import { HelpCircle, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

const faqs = [
  {
    question: 'Berapa lama minimal sewa gerobak?',
    answer: 'Minimal sewa adalah 1 hari. Kami menyediakan paket harian, mingguan, dan bulanan. Untuk sewa jangka panjang, kami juga bisa berikan harga spesial. Hubungi admin untuk detail lebih lanjut.'
  },
  {
    question: 'Apakah bisa custom branding di gerobak?',
    answer: 'Bisa banget! Untuk paket mingguan ke atas, kami berikan free stiker branding. Untuk paket bulanan, Anda dapat stiker dan print custom sesuai brand Anda. Gerobak jadi lebih eksklusif dan profesional.'
  },
  {
    question: 'Apakah ada deposit atau jaminan?',
    answer: 'Ya, ada deposit yang bersifat refundable (bisa dikembalikan). Deposit digunakan sebagai jaminan kondisi gerobak. Setelah masa sewa selesai dan gerobak dikembalikan dalam kondisi baik, deposit langsung dikembalikan 100%.'
  },
  { 
    question: 'Bagaimana cara pembayaran?',
    answer: 'Pembayaran sangat mudah! Bisa transfer bank, e-wallet, atau cash. Pembayaran dilakukan di awal masa sewa. Untuk paket bulanan, tersedia opsi cicilan 2x. Fleksibel sesuai kemampuan Anda.'
  },
  {
    question: 'Apakah gerobak sudah lengkap dengan peralatan?',
    answer: 'Gerobak sudah dilengkapi dengan struktur dasar dan rak-rak penyimpanan. Untuk peralatan memasak dan display tambahan bisa disesuaikan. Kami bantu konsultasikan kebutuhan alat sesuai jenis usaha Anda.'
  },
  {
    question: 'Bagaimana jika gerobak rusak saat disewa?',
    answer: 'Kerusakan normal pemakaian wajar itu kami maklumi. Tapi kalau ada kerusakan berat karena kelalaian, akan diperbaiki dengan biaya ditanggung penyewa. Makanya kami ada deposit untuk jaga-jaga. Rawat dengan baik, gerobak awet!'
  },
  {
    question: 'Apakah pengiriman gerobak gratis?',
    answer: 'Untuk area dalam kota, pengiriman dan pickup GRATIS! Untuk luar kota, ada biaya tambahan tergantung jarak. Tim kami akan bantu setup gerobak di lokasi Anda agar langsung siap pakai.'
  },
  {
    question: 'Bisa perpanjang sewa atau ganti model gerobak?',
    answer: 'Tentu bisa! Kalau mau perpanjang, tinggal konfirmasi ke admin sebelum masa sewa habis. Mau ganti model gerobak juga bisa, kami bantu tukar dengan model lain sesuai kebutuhan bisnis Anda yang berkembang.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [whatsappNumber, setWhatsappNumber] = useState('+6285792381511');

  useEffect(() => {
    // Load WhatsApp number from localStorage
    const businessProfile = localStorage.getItem('businessProfile');
    if (businessProfile) {
      try {
        const profile = JSON.parse(businessProfile);
        if (profile.whatsapp) {
          setWhatsappNumber(profile.whatsapp);
        }
      } catch (error) {
        console.error('Error loading business profile:', error);
      }
    }

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
    <section className="py-20 px-6 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full mb-4">
            <HelpCircle size={20} />
            <span className="font-semibold">FAQ</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Pertanyaan yang Sering Ditanyakan
          </h2>
          <p className="text-xl text-gray-600">
            Punya pertanyaan lain? Langsung chat admin kami di WhatsApp!
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden border border-gray-100"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-orange-50 transition-colors"
              >
                <span className="font-bold text-gray-900 text-lg pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  size={24}
                  className={`text-orange-600 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-5 text-gray-700 leading-relaxed border-t border-gray-100 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-white p-8 rounded-2xl shadow-lg border-2 border-orange-200">
          <p className="text-lg text-gray-700 mb-4">
            Masih ada pertanyaan atau butuh penjelasan lebih detail?
          </p>
          <a
            href={`https://wa.me/${whatsappNumber.replace(/[^0-9+]/g, '')}?text=Halo,%20saya%20mau%20tanya%20seputar%20sewa%20gerobak`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-green-600 transition-all shadow-lg hover:shadow-xl"
          >
            <HelpCircle size={20} />
            Tanya Admin Sekarang
          </a>
        </div>
      </div>
    </section>
  );
}
