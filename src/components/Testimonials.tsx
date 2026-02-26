import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getTestimonials } from '../lib/supabaseApi';

const testimonials = [
  {
    name: 'Budi Santoso',
    business: 'Pemilik Gerobak Kopi Keliling',
    avatar: '👨',
    rating: 5,
    text: 'Awalnya ragu mau mulai usaha kopi. Tapi setelah sewa gerobak di sini, semuanya jadi gampang. Gerobaknya bagus, bersih, dan harganya terjangkau banget. Sekarang sudah balik modal dan untung terus!'
  },
  {
    name: 'Siti Nurhaliza',
    business: 'Usaha Es Teh Manis',
    avatar: '👩',
    rating: 5,
    text: 'Pelayanannya ramah, gerobaknya sesuai ekspektasi bahkan lebih bagus. Yang paling suka itu dapet stiker branding gratis, jadi gerobak keliatan profesional. Omzet naik pesat, pelanggan suka sama tampilan gerobaknya!'
  },
  {
    name: 'Andi Wijaya',
    business: 'Bakso Bakar Keliling',
    avatar: '👨',
    rating: 5,
    text: 'Sewa gerobak di sini adalah keputusan terbaik. Modalnya jauh lebih kecil daripada beli gerobak sendiri. Kalau laku, bisa lanjut sewa atau beli. Kalau belum, gak rugi banyak. Pokoknya recommended deh!'
  }
];

export default function Testimonials() {
  const [items, setItems] = useState(testimonials);

  useEffect(() => {
    getTestimonials()
      .then((rows) => {
        if (!rows.length) return;
        setItems(
          rows.map((r) => ({
            name: r.name,
            business: r.business,
            avatar: r.avatar || '👤',
            rating: r.rating,
            text: r.text,
          }))
        );
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Cerita Sukses Penyewa Kami
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bergabunglah dengan ratusan pengusaha kuliner yang sudah membuktikan kesuksesan mereka bersama kami.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-orange-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center text-3xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.business}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed italic">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-orange-600 text-white p-8 rounded-2xl max-w-4xl mx-auto">
          <p className="text-2xl font-bold mb-2">Lebih dari 500+ Penyewa Sukses</p>
          <p className="text-orange-100">
            Mereka sudah membuktikan. Giliran Anda sekarang untuk sukses berbisnis kuliner!
          </p>
        </div>
      </div>
    </section>
  );
}
