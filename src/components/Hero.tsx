import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-orange-50 via-white to-orange-50 pt-20 pb-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
              🚀 Mulai Usaha Tanpa Ribet
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Mulai Bisnis Kuliner <span className="text-orange-600">Tanpa Modal Besar</span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Wujudkan impian jadi pengusaha dengan menyewa gerobak modern kami.
              Siap pakai, harga terjangkau, dan cocok untuk pemula. Langsung jualan, langsung cuan!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Sewa Gerobak Sekarang
                <ArrowRight size={20} />
              </a>

              <a
                href="#catalog"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-gray-200 hover:border-orange-600 hover:text-orange-600 transition-all"
              >      
                Lihat Katalog
              </a>
            </div>

            <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-4">
              <div className="flex items-center gap-2 text-gray-700">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="font-medium">Gerobak Modern & Bersih</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="font-medium">Harga Terjangkau</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="font-medium">Siap Pakai</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-orange-200 to-orange-300 rounded-3xl shadow-2xl overflow-hidden">
              <img 
                src="/gerobak-modern.jfif"
                alt="Gerobak Modern"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl">
              <div className="text-3xl font-bold text-orange-600">500+</div>
              <div className="text-sm text-gray-600">Penyewa Sukses</div>
            </div>

            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl">
              <div className="text-3xl font-bold text-orange-600">⭐ 4.9</div>
              <div className="text-sm text-gray-600">Rating Pelanggan</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
