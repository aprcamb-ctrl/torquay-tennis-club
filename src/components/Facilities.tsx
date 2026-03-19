import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export default function Facilities() {
  const facilities = [
    {
      title: 'Championship Courts',
      description: 'Play on our 8 meticulously maintained courts, including 4 artificial clay and 4 hard courts, all equipped with LED floodlights.',
      image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2070&auto=format&fit=crop',
      features: ['4 Artificial Clay Courts', '4 Hard Courts', 'LED Floodlights', '3 Indoor Tennis Courts']
    },
    {
      title: 'Modern Clubhouse',
      description: 'Relax after your match in our newly renovated clubhouse featuring a fully licensed bar, cafe, and comfortable viewing areas.',
      image: 'https://images.unsplash.com/photo-1542144612-1b3641ec3459?q=80&w=2070&auto=format&fit=crop',
      features: ['Licensed Bar & Cafe', 'Viewing Balcony', 'Pro Shop', 'Changing Rooms']
    }
  ];

  return (
    <section id="facilities" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-emerald-600 font-semibold tracking-wide uppercase text-sm mb-3">World-Class Facilities</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to play your best
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Our club offers premium amenities designed to enhance your tennis experience, both on and off the court.
          </p>
        </div>

        <div className="space-y-24">
          {facilities.map((facility, index) => (
            <div key={facility.title} className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full lg:w-1/2"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full lg:w-1/2"
              >
                <h3 className="text-3xl font-bold text-gray-900 mb-4">{facility.title}</h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {facility.description}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {facility.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-gray-700 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
