import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';

export default function Events({ events }: { events?: any[] }) {
  if (!events) return null;

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
              key={event.name || index}
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
