import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';

export default function Events() {
  const events = [
    {
      id: 1,
      name: 'Pub Night',
      date: 'Friday March 27th',
      time: '6:00 PM',
      location: 'Clubhouse Bar',
      description: 'Join us for a relaxed evening at the clubhouse! Meet fellow members, enjoy some drinks, and celebrate the start of the weekend together.',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop',
      bookingUrl: 'https://buytickets.at/torquaypickleballclub/2073388',
    },
    {
      id: 2,
      name: 'DUPR Pickleball Event',
      date: 'Sunday March 22nd',
      time: '10:00 AM - 2:00 PM',
      location: 'Torquay Tennis Club',
      description: 'Test your skills in our upcoming official DUPR Pickleball event. Perfect for players looking to establish or improve their rating.',
      image: 'https://i.postimg.cc/MH9x3RS3/DUPR.jpg',
      bookingUrl: '#',
    },
    {
      id: 3,
      name: 'Spring Pickleball Festival',
      date: 'April 11th & 12th',
      time: '10:00 AM - 5:30 PM',
      location: 'Torquay Tennis Club',
      description: 'Welcome spring with a massive weekend Pickleball festival! Exciting matches, food, and fun for all skill levels.',
      image: 'https://i.postimg.cc/x8pD32vF/Pickleball-Festival-Palm-Shield.png',
      bookingUrl: '#',
    },
    {
      id: 4,
      name: 'The Bay Padel Tournament',
      date: 'June 22nd',
      time: '10:00 AM - 5:00 PM',
      location: 'Padel Courts',
      description: 'Get ready for our major summer Padel tournament. Compete against top local talent and enjoy the amazing atmosphere.',
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=2070&auto=format&fit=crop',
      bookingUrl: '#',
    },
    {
      id: 5,
      name: 'Torbay Open Tennis',
      date: 'August 9th - 15th',
      time: 'Various Times',
      location: 'Torquay Tennis Club',
      description: 'Our premier week-long tennis event is back. The Torbay Open attracts fantastic players for an unmissable week of high-quality tennis.',
      image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2070&auto=format&fit=crop',
      bookingUrl: '#',
    }
  ];

  return (
    <section id="events" className="py-24 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-emerald-600 font-semibold tracking-wide uppercase text-sm mb-3">Community & Social</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Upcoming Events
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Don't miss out on what's happening at the club.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col hover:shadow-xl transition-shadow"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{event.name}</h3>

                <div className="space-y-3 mb-6 border-b border-gray-100 pb-6">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-3 text-emerald-500" />
                    <span className="font-medium text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-3 text-emerald-500" />
                    <span className="font-medium text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3 text-emerald-500" />
                    <span className="font-medium text-sm">{event.location}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow">
                  {event.description}
                </p>

                <div className="mt-auto">
                  <a
                    href={event.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center gap-2 w-full bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
                  >
                    Book Now
                    <ArrowRight className="w-4 h-4" />
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
