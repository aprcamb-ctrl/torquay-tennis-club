import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function OtherSports() {
  interface Sport {
    name: string;
    description: string;
    image: string;
    fallbackImage: string;
    features: string[];
    dotColor: string;
    textColor: string;
    hoverTextColor: string;
    link?: string;
  }

  const sports: Sport[] = [
    {
      name: 'Padel',
      description: 'Experience the fastest growing sport in the world. Padel is a fun, highly addictive doubles game played on an enclosed court. It is easy to learn and perfect for all ages and abilities.',
      image: 'https://i.postimg.cc/8JjS3fmj/how-to-serve-in-padel-jpg.webp',
      fallbackImage: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=2070&auto=format&fit=crop',
      features: ['3 Panoramic Courts', 'Equipment Hire', 'Introductory Sessions', 'Social Mixers'],
      dotColor: 'bg-emerald-500',
      textColor: 'text-emerald-600',
      hoverTextColor: 'hover:text-emerald-700',
      link: 'https://playtomic.com/clubs/torquay-tennis-club'
    },
    {
      name: 'Pickleball',
      description: 'Join the Pickleball craze! Combining elements of tennis, badminton, and ping-pong, it is a fast-paced, beginner-friendly game that is taking the world by storm.',
      image: 'https://i.postimg.cc/dkpYKQ59/Adobe-Stock-667173382-scaled-jpeg.webp',
      fallbackImage: 'https://images.unsplash.com/photo-1613918108466-292b78a8ef95?q=80&w=2070&auto=format&fit=crop',
      features: ['6 Dedicated Courts', 'Beginner Friendly', 'Weekly Social Sessions', 'All Ages Welcome'],
      dotColor: 'bg-teal-500',
      textColor: 'text-teal-600',
      hoverTextColor: 'hover:text-teal-700',
      link: 'https://www.globalpickleball.network'
    }
  ];

  return (
    <section id="other-sports" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-emerald-600 font-semibold tracking-wide uppercase text-sm mb-3">More Than Just Tennis</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Discover Padel & Pickleball
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Expand your racquet skills with our dedicated facilities for the world's fastest-growing sports.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {sports.map((sport, index) => (
            <motion.div
              key={sport.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group rounded-3xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white flex flex-col"
            >
              <div className="relative h-64 sm:h-80 overflow-hidden bg-gray-100">
                <img
                  src={sport.image}
                  alt={sport.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = sport.fallbackImage;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-3xl font-bold text-white">{sport.name}</h3>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  {sport.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {sport.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${sport.dotColor}`}></div>
                      <span className="text-gray-700 font-medium text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-6 border-t border-gray-100">
                  <a
                    href={sport.link || "#contact"}
                    target={sport.link ? "_blank" : "_self"}
                    rel={sport.link ? "noopener noreferrer" : ""}
                    className={`inline-flex items-center gap-2 ${sport.textColor} font-semibold ${sport.hoverTextColor} transition-colors`}
                  >
                    Book a {sport.name} Court
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
