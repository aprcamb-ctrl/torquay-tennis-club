import { motion } from 'motion/react';
import * as LucideIcons from 'lucide-react';

export default function Programs({ programs }: { programs?: any[] }) {
  if (!programs) return null;

  return (
    <section id="programs" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-emerald-600 font-semibold tracking-wide uppercase text-sm mb-3">Coaching & Play</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Programs for Every Player
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Whether you're picking up a racket for the first time or competing at a high level, we have a program for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => {
            const IconComponent = (LucideIcons as any)[program.icon] || LucideIcons.HelpCircle;
            return (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${program.color} group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{program.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {program.description}
                </p>
                <a href="#coaching-detail" className="inline-flex items-center text-emerald-600 font-semibold mt-6 hover:text-emerald-700">
                  Learn more <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
