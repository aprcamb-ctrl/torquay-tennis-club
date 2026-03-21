import React from 'react';
import { motion } from 'motion/react';
import { Shield, FileText, CheckCircle, AlertTriangle, Users, Heart, Download } from 'lucide-react';

const SAFEGUARDING_POLICIES = [
  {
    title: "Child Protection Policy",
    icon: Shield,
    description: "Torquay Tennis Club is committed to prioritizing the well-being of all children and young adults, safeguarding them from harm in all club activities.",
    details: ["Mandatory DBS checks for all coaching staff.", "Designated Welfare Officer available 24/7.", "Clear reporting and whistleblowing procedures."]
  },
  {
    title: "Diversity & Inclusion",
    icon: Heart,
    description: "Tennis is a sport for everyone. We foster an inclusive environment where all members, regardless of background, ability, or age, feel respected and valued.",
    details: ["Zero-tolerance policy for discrimination.", "Accessible facilities and adaptive tennis programs.", "Regular inclusivity training for staff."]
  },
  {
    title: "Code of Conduct",
    icon: Users,
    description: "All members, guests, and parents must adhere to our strict Code of Conduct to ensure a positive, safe, and competitive environment on and off the courts.",
    details: ["Respect for opponents and officials.", "Appropriate language and behavior.", "Fair play and sportsmanship at all times."]
  }
];

const CLUB_POLICIES = [
  {
    title: "Court Etiquette & Usage",
    icon: CheckCircle,
    content: "Members must wear appropriate tennis footwear (non-marking soles) and attire at all times. Please sweep clay courts after use and ensure gates are locked when leaving out of hours."
  },
  {
    title: "Health & Safety Procedures",
    icon: AlertTriangle,
    content: "First aid kits are located in the clubhouse reception and the indoor court arena. Defibrillators are accessible 24/7 on the exterior clubhouse wall. Any accidents must be reported immediately."
  },
  {
    title: "Data Protection (GDPR)",
    icon: FileText,
    content: "Your privacy is paramount. Torquay Tennis Club strictly adheres to GDPR guidelines regarding the collection, storage, and processing of member data. We will never sell your information to third parties."
  },
  {
    title: "Photography & Filming",
    icon: Shield,
    content: "Photography or video recording of children without explicit parental consent is strictly prohibited. The club may take general photos for promotional purposes, which members can opt out of via the registry."
  }
];

export default function Guidelines() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      {/* Hero Section */}
      <section className="bg-emerald-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-800/40 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl mb-6 shadow-inset border border-white/20">
              <Shield className="w-8 h-8 text-emerald-300" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Club <span className="text-emerald-400">Guidelines</span></h1>
            <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
              Torquay Tennis Club is dedicated to maintaining a safe, inclusive, and professional environment for all our members, guests, and staff.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Safeguarding Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-8 relative z-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Safeguarding</h2>
          <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Our priority is the safety and well-being of everyone at the club. We strictly enforce LTA safeguarding standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SAFEGUARDING_POLICIES.map((policy, idx) => (
            <motion.div
              key={policy.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col hover:border-emerald-200 transition-colors group"
            >
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors duration-300">
                <policy.icon className="w-7 h-7 text-emerald-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{policy.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6 flex-1">
                {policy.description}
              </p>
              <ul className="space-y-3">
                {policy.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Policies & Procedures Section */}
      <section className="bg-gray-900 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Policies & Procedures</h2>
            <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CLUB_POLICIES.map((policy, idx) => (
              <motion.div
                key={policy.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-emerald-500/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-900 rounded-xl shadow-inset border border-gray-700 mt-1">
                    <policy.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">{policy.title}</h3>
                    <p className="text-gray-400 leading-relaxed">
                      {policy.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Download Full Policies CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <button className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-emerald-900/50 hover:-translate-y-1">
              <Download className="w-5 h-5" />
              Download Full Policy Document (PDF)
            </button>
            <p className="text-gray-500 text-sm mt-4">Updated March 2026. Required reading for all new members.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
