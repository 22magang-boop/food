import { Coffee, IceCream, Sandwich, Soup, Drumstick, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';

// Icon mapping
const iconMap: { [key: string]: any } = {
  Coffee,
  IceCream,
  Sandwich,
  Soup,
  Drumstick,
  ShoppingCart
};

const defaultCarts = [
  {
    id: 'GR-001',
    iconName: 'Coffee',
    icon: Coffee,
    name: 'Gerobak Kopi / Coffee Cart',
    description: 'Desain modern dan compact, cocok untuk jualan kopi, espresso, dan minuman kekinian. Dilengkapi tempat penyimpanan bahan dan display menarik.',
    features: ['Tempat mesin kopi', 'Storage untuk cup', 'Display topping', 'Lampu LED']
  },
  {
    id: 'GR-002',
    iconName: 'IceCream',
    icon: IceCream,
    name: 'Gerobak Es Teh / Minuman',
    description: 'Sempurna untuk bisnis minuman segar seperti es teh, jus, smoothies, dan minuman dingin lainnya. Ruang luas untuk ice box dan dispenser.',
    features: ['Ruang ice box besar', 'Tempat dispenser', 'Rak botol/cup', 'Parasol pelindung']
  },
  {
    id: 'GR-003',
    iconName: 'Sandwich',
    icon: Sandwich,
    name: 'Gerobak Snack / Gorengan',
    description: 'Ideal untuk jualan gorengan, dimsum, risol, atau snack lainnya. Dilengkapi dengan etalase kaca untuk display produk yang higienis.',
    features: ['Etalase kaca', 'Kompor portable', 'Rak display', 'Laci penyimpanan']
  },
  {
    id: 'GR-004',
    iconName: 'Soup',
    icon: Soup,
    name: 'Gerobak Bakso / Mie Ayam',
    description: 'Dirancang khusus untuk jualan makanan berkuah. Tempat rebus yang aman, storage bumbu lengkap, dan tatakan mangkuk yang rapi.',
    features: ['Kompor gas aman', 'Tempat rebus besar', 'Storage bumbu', 'Rak mangkuk']
  },
  {
    id: 'GR-005',
    iconName: 'Drumstick',
    icon: Drumstick,
    name: 'Gerobak Ayam Geprek',
    description: 'Gerobak khusus untuk ayam geprek dan gorengan. Dilengkapi dengan fryer space, tempat cobek, dan display yang menggugah selera.',
    features: ['Ruang fryer', 'Display etalase', 'Tempat cobek', 'Storage matang']
  }
];

export default function Catalog() {
  const [carts, setCarts] = useState(defaultCarts);

  useEffect(() => {
    // Load carts data from localStorage
    const loadCartsData = () => {
      const savedCartsData = localStorage.getItem('cartsData');
      if (savedCartsData) {
        try {
          const parsedCarts = JSON.parse(savedCartsData);
          // Map the saved data with icons, prioritize saved description/features
          const cartsWithIcons = parsedCarts.map((cart: any) => {
            const defaultCart = defaultCarts.find(dc => dc.id === cart.id);
            // Get icon from iconName string or use default
            const iconName = cart.iconName || defaultCart?.iconName || 'ShoppingCart';
            const icon = iconMap[iconName] || ShoppingCart;
            
            return {
              ...cart,
              icon: icon,
              iconName: iconName,
              // Use saved description first, fallback to default
              description: cart.description || defaultCart?.description || '',
              // Use saved features first, fallback to default
              features: cart.features || defaultCart?.features || []
            };
          });
          setCarts(cartsWithIcons);
        } catch (error) {
          console.error('Error parsing saved carts data:', error);
          setCarts(defaultCarts);
        }
      } else {
        // If no saved data, use defaults
        setCarts(defaultCarts);
      }
    };

    // Load initially
    loadCartsData();

    // Listen for changes from other tabs/windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cartsData') {
        loadCartsData();
      }
    };

    // Also listen for custom events from same tab
    const handleCustomStorage = () => {
      loadCartsData();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartsDataUpdated', handleCustomStorage);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartsDataUpdated', handleCustomStorage);
    };
  }, []);

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

                <a
                  href="#pricing"
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
