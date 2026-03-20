import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import ClubhouseBookingModal from './ClubhouseBookingModal';

export default function Facilities() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const facilities = [
    {
      title: 'Championship Courts',
      description: 'Play on our 8 meticulously maintained courts, including 4 artificial clay and 4 hard courts, all equipped with LED floodlights.',
      image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2070&auto=format&fit=crop',
      features: ['4 Artificial Clay Courts', '4 Hard Courts', 'LED Floodlights', '3 Indoor Tennis Courts'],
      link: 'https://auth.clubspark.uk/account/signin?ReturnUrl=%2fissue%2fwsfed%3fwa%3dwsignin1.0%26wtrealm%3dhttps%253a%252f%252fclubspark.lta.org.uk%252f%26wctx%3drm%253d0%2526id%253d0%2526ru%253dhttps%25253a%25252f%25252fclubspark.lta.org.uk%25252fTorquayTennisClubLtd%25252fBooking%25252fBookByDate%26wct%3d2020-06-02T16%253a58%253a45Z%26prealm%3dhttps%253a%252f%252fclubspark.lta.org.uk%252f%26proot%3dhttps%253a%252f%252fclubspark.lta.org.uk%252f%26paroot%3dhttps%253a%252f%252fclubspark.lta.org.uk%252fTorquayTennisClubLtd%26source%3dTorquayTennisClubLtd%26name%3dTorquay%2bTennis%2bClub%2bLimited%26nologo%3d0&wa=wsignin1.0&wtrealm=https%3a%2f%2fclubspark.lta.org.uk%2f&wctx=rm%3d0%26id%3d0%26ru%3dhttps%253a%252f%252fclubspark.lta.org.uk%252fTorquayTennisClubLtd%252fBooking%252fBookByDate&wct=2020-06-02T16%3a58%3a45Z&prealm=https%3a%2f%2fclubspark.lta.org.uk%2f&proot=https%3a%2f%2fclubspark.lta.org.uk%2f&paroot=https%3a%2f%2fclubspark.lta.org.uk%2fTorquayTennisClubLtd&source=TorquayTennisClubLtd&name=Torquay+Tennis+Club+Limited&nologo=0',
      buttonText: 'Book a Tennis Court'
    },
    {
      title: 'Modern Clubhouse',
      description: 'Relax after your match in our newly renovated clubhouse featuring a fully licensed bar, cafe, and comfortable viewing areas.',
      image: 'https://images.unsplash.com/photo-1542144612-1b3641ec3459?q=80&w=2070&auto=format&fit=crop',
      features: ['Licensed Bar & Cafe', 'Viewing Balcony', 'Pro Shop', 'Private Function Hire', 'Changing Rooms'],
      link: '#contact',
      buttonText: 'Book Now'
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
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {facility.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-gray-700 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {facility.link && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    {facility.title === 'Modern Clubhouse' ? (
                      <button
                        onClick={() => setIsBookingModalOpen(true)}
                        className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 group"
                      >
                        {facility.buttonText}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    ) : (
                      <a
                        href={facility.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 group"
                      >
                        {facility.buttonText}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      <ClubhouseBookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </section>
  );
}
