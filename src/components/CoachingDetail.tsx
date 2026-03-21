import { motion } from 'motion/react';
import { Clock } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

export default function CoachingDetail({ 
  programDetails, 
  coaches 
}: { 
  programDetails?: any[], 
  coaches?: any[] 
}) {
  if (!programDetails || !coaches) return null;

  return (
    <section id="coaching-detail" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-emerald-600 font-semibold tracking-wide uppercase text-sm mb-3">Coaching & Clinics</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything You Need to Know
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Explore our programmes in detail — from junior pathways to adult leagues, private tuition, and more.
          </p>
        </div>

        {/* Programme Detail Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          {programDetails.map((program, index) => {
            const IconComponent = (LucideIcons as any)[program.icon] || LucideIcons.HelpCircle;
            return (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Color accent bar */}
                <div className={`h-2 bg-gradient-to-r ${program.color}`} />

                <div className="p-8">
                  <div className="flex items-start gap-4 mb-5">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${program.bgAccent} ${program.textAccent}`}>
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{program.title}</h3>
                      <p className="text-sm font-medium text-gray-400 mt-0.5">{program.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-6">{program.description}</p>

                  <ul className="space-y-3">
                    {program.highlights?.map((highlight: string) => (
                      <li key={highlight} className="flex items-start gap-3">
                        <Clock className={`w-5 h-5 flex-shrink-0 mt-0.5 ${program.textAccent}`} />
                        <span className="text-gray-700 text-sm leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Meet the Coaches Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-emerald-600 font-semibold tracking-wide uppercase text-sm mb-3">Meet the Coaches</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Learn from the Best
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Our team of qualified, passionate coaches are here to help you reach your potential.
          </p>
        </div>

        {/* Coach Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {coaches.map((coach, index) => {
            const IconComponent = (LucideIcons as any)[coach.icon] || LucideIcons.HelpCircle;
            return (
              <motion.div
                key={coach.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                {/* Coach photo */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={coach.image}
                    alt={coach.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-white font-bold text-lg drop-shadow-lg">{coach.name}</h4>
                    <p className="text-emerald-300 text-sm font-semibold drop-shadow-lg">{coach.role}</p>
                  </div>
                </div>

                {/* Coach info */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <IconComponent className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">{coach.specialty}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{coach.bio}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
