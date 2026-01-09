import { Search, MessageCircle, Calendar, Truck, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: Search,
    number: '1',
    title: 'Pilih Model Gerobak',
    description: 'Lihat katalog kami dan pilih gerobak yang sesuai dengan jenis usaha kuliner Anda.'
  },
  {
    icon: MessageCircle,
    number: '2',
    title: 'Hubungi Admin Kami',
    description: 'Chat via WhatsApp untuk konsultasi gratis. Tim kami siap bantu Anda memilih yang terbaik.'
  },
  {
    icon: Calendar,
    number: '3',
    title: 'Tentukan Lama Sewa',
    description: 'Pilih paket harian, mingguan, atau bulanan. Semakin lama, semakin hemat!'
  },
  {
    icon: Truck,
    number: '4',
    title: 'Gerobak Diantar',
    description: 'Kami antar gerobak ke lokasi Anda (gratis untuk area kota). Atau bisa ambil sendiri di workshop kami.'
  },
  {
    icon: TrendingUp,
    number: '5',
    title: 'Mulai Jualan & Cuan!',
    description: 'Gerobak siap pakai. Langsung isi produk dan mulai berbisnis. Raih keuntungan dari hari pertama!'
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Cara Kerja Penyewaan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Proses sewa yang mudah dan cepat. Dalam 5 langkah sederhana, Anda sudah bisa mulai jualan!
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-orange-200 via-orange-400 to-orange-200 -translate-y-1/2 mx-24"></div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6 inline-block">
                  <div className="w-24 h-24 bg-white border-4 border-orange-600 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform relative z-10">
                    <step.icon className="text-orange-600" size={40} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-20">
                    {step.number}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-orange-100 border-2 border-orange-300 rounded-2xl p-8 max-w-2xl">
            <p className="text-lg text-gray-700 mb-4">
              <span className="font-bold text-orange-600">Proses cepat!</span> Dari konsultasi sampai gerobak siap dipakai bisa dalam waktu 1-2 hari saja.
            </p>
            <a
              href="https://wa.me/+6285792381511?text=Halo,%20saya%20mau%20mulai%20sewa%20gerobak"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-orange-700 transition-all shadow-lg hover:shadow-xl"
            >
              Mulai Sekarang
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
