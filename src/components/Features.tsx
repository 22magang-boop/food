import { Truck, DollarSign, Sparkles, Shield, Zap, Users } from 'lucide-react';

const features = [
  {
    icon: Sparkles,  
    title: 'Gerobak Modern & Bersih',
    description: 'Semua gerobak kami selalu dalam kondisi prima, bersih, dan terawat. Tampil profesional di depan pelanggan.'
  },
  {
    icon: DollarSign,
    title: 'Harga Sewa Terjangkau',
    description: 'Mulai usaha tanpa harus beli gerobak mahal. Hemat modal, fokus ke pengembangan bisnis Anda.'
  },
  {
    icon: Truck,
    title: 'Berbagai Model Tersedia',
    description: 'Gerobak kopi, snack, minuman, bakso, ayam geprek, dan lainnya. Pilih sesuai jenis usaha Anda.'
  },
  {
    icon: Shield,
    title: 'Free Branding Stiker',
    description: 'Dapatkan stiker branding GRATIS untuk gerobak Anda. Usaha jadi lebih kelihatan profesional dan menarik.'
  },
  { 
    icon: Zap,
    title: 'Siap Pakai Langsung Jualan',
    description: 'Gerobak sudah siap operasional. Tinggal isi produk dan mulai jualan. Tidak perlu repot modifikasi.'
  },
  {
    icon: Users,
    title: 'Cocok Untuk Pemula',
    description: 'Kami bantu Anda yang baru mau mulai usaha. Konsultasi gratis dan panduan lengkap dari kami.'
  }
];

export default function Features() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Kenapa Sewa Gerobak di Kami?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kami bukan sekadar sewa gerobak. Kami bantu Anda memulai bisnis kuliner dengan cara paling mudah dan hemat.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl hover:shadow-xl transition-all border border-orange-100 hover:border-orange-300 group"
            >
              <div className="w-14 h-14 bg-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
