import { Coffee, IceCream, Sandwich, Soup, Drumstick } from 'lucide-react';

const carts = [
  {
    icon: Coffee,
    name: 'Gerobak Kopi / Coffee Cart',
    description: 'Desain modern dan compact, cocok untuk jualan kopi, espresso, dan minuman kekinian. Dilengkapi tempat penyimpanan bahan dan display menarik.',
    features: ['Tempat mesin kopi', 'Storage untuk cup', 'Display topping', 'Lampu LED']
  },
  {
    icon: IceCream,
    name: 'Gerobak Es Teh / Minuman',
    description: 'Sempurna untuk bisnis minuman segar seperti es teh, jus, smoothies, dan minuman dingin lainnya. Ruang luas untuk ice box dan dispenser.',
    features: ['Ruang ice box besar', 'Tempat dispenser', 'Rak botol/cup', 'Parasol pelindung']
  },
  {
    icon: Sandwich,
    name: 'Gerobak Snack / Gorengan',
    description: 'Ideal untuk jualan gorengan, dimsum, risol, atau snack lainnya. Dilengkapi dengan etalase kaca untuk display produk yang higienis.',
    features: ['Etalase kaca', 'Kompor portable', 'Rak display', 'Laci penyimpanan']
  },
  {
    icon: Soup,
    name: 'Gerobak Bakso / Mie Ayam',
    description: 'Dirancang khusus untuk jualan makanan berkuah. Tempat rebus yang aman, storage bumbu lengkap, dan tatakan mangkuk yang rapi.',
    features: ['Kompor gas aman', 'Tempat rebus besar', 'Storage bumbu', 'Rak mangkuk']
  },
  {
    icon: Drumstick,
    name: 'Gerobak Ayam Geprek',
    description: 'Gerobak khusus untuk ayam geprek dan gorengan. Dilengkapi dengan fryer space, tempat cobek, dan display yang menggugah selera.',
    features: ['Ruang fryer', 'Display etalase', 'Tempat cobek', 'Storage matang']
  }
];

export default function Catalog() {
  return (
    <section id="catalog" className="py-20 px-6 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Model Gerobak yang Tersedia
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pilih gerobak sesuai jenis usaha kuliner Anda. Semua model sudah terbukti laris dan menguntungkan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {carts.map((cart, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group border border-gray-100"
            >
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 text-center">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <cart.icon className="text-orange-600" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {cart.name}
                </h3>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  {cart.description}
                </p>

                <div className="border-t border-gray-100 pt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Kelengkapan:</p>
                  <ul className="space-y-2">
                    {cart.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-600">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="https://wa.me/+6285792381511?text=Halo,%20saya%20tertarik%20dengan%20gerobak%20ini"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-all mt-4"
                >
                  Sewa Sekarang
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
