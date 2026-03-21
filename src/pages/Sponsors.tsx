import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Star } from 'lucide-react';

const PREMIER_SPONSORS = [
  {
    name: "Pro-Direct Tennis",
    logo: "https://i.postimg.cc/FFbg12wZ/Pro-Direct.png",
    description: "The official equipment provider and premium sponsor of Torquay Tennis Club. Pro-Direct Tennis ensures our members have access to the highest quality gear, rackets, and apparel at exclusive club rates.",
    link: "https://www.prodirecttennis.com",
    bgGradient: "from-gray-900 to-black",
    highlight: "from-yellow-400 to-yellow-600",
    textClass: "text-white"
  },
  {
    name: "Ocean View Motors",
    logo: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=800",
    description: "Torquay's leading luxury car dealership. Proudly supporting local sports and maintaining the heartbeat of our tennis community through generous annual sponsorships and tournament backing.",
    link: "https://example.com/ocean-view",
    bgGradient: "from-emerald-900 to-emerald-950",
    highlight: "from-emerald-400 to-emerald-300",
    textClass: "text-white"
  }
];

const GOLD_SPONSORS = [
  {
    name: "Devonshire Estates",
    logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=400",
    description: "Premium real estate agency in the English Riviera.",
    link: "https://example.com/devonshire"
  },
  {
    name: "Riviera Wealth Management",
    logo: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400",
    description: "Expert financial planning for families and businesses.",
    link: "https://example.com/riviera-wealth"
  },
  {
    name: "Harbour View Cafe",
    logo: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&q=80&w=400",
    description: "The perfect post-match coffee and dining spot on the seafront.",
    link: "https://example.com/harbour-view"
  },
  {
    name: "Active Health Physio",
    logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400",
    description: "Keeping our athletes in top condition year-round.",
    link: "https://example.com/active-health"
  }
];

export default function Sponsors() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      {/* Hero Section */}
      <section className="bg-emerald-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-b from-emerald-500/20 to-transparent rounded-full blur-3xl transform rotate-45"></div>
          <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-t from-emerald-800/40 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Club <span className="text-yellow-400">Sponsors</span></h1>
            <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
              We are incredibly grateful to the local businesses and national brands that help make Torquay Tennis Club a premier sporting destination.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Premier Sponsors Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-10 relative z-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-1.5 rounded-full font-bold text-sm uppercase tracking-widest shadow-sm mb-4">
            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            Premier Partners
            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PREMIER_SPONSORS.map((sponsor, idx) => (
            <motion.div
              key={sponsor.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: idx * 0.2 }}
              className={`bg-gradient-to-br ${sponsor.bgGradient} rounded-3xl p-1 shadow-2xl overflow-hidden group`}
            >
              <div className="h-full bg-gray-900/40 backdrop-blur-xl rounded-[1.4rem] p-8 sm:p-12 flex flex-col items-center text-center relative overflow-hidden border border-white/10">
                {/* Decorative background glow */}
                <div className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${sponsor.highlight} opacity-20 blur-3xl rounded-full group-hover:opacity-30 transition-opacity duration-700`}></div>
                
                {/* Logo Container */}
                <div className="w-full max-w-sm h-48 bg-white/5 rounded-2xl flex items-center justify-center mb-8 p-6 shadow-inset border border-white/5 group-hover:bg-white/10 transition-colors duration-500">
                  <img 
                    src={sponsor.logo} 
                    alt={`${sponsor.name} Logo`} 
                    className="max-w-full max-h-full object-contain filter drop-shadow-lg"
                  />
                </div>

                <h2 className={`text-3xl font-bold mb-4 ${sponsor.textClass}`}>{sponsor.name}</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-8 flex-1">
                  {sponsor.description}
                </p>

                <a 
                  href={sponsor.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all duration-300 bg-gradient-to-r ${sponsor.highlight} text-gray-900 hover:shadow-lg hover:shadow-yellow-500/20 transform hover:-translate-y-1`}
                >
                  Visit Website
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gold Sponsors Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Official Club Sponsors</h2>
           <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {GOLD_SPONSORS.map((sponsor, idx) => (
            <motion.div
              key={sponsor.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100 flex flex-col group"
            >
              <div className="h-48 bg-gray-50 p-6 flex items-center justify-center border-b border-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img 
                  src={sponsor.logo} 
                  alt={`${sponsor.name} Logo`} 
                  className="max-w-full max-h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{sponsor.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                  {sponsor.description}
                </p>
                
                <a 
                  href={sponsor.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors group/link mt-auto"
                >
                  Visit Website
                  <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-emerald-50 rounded-3xl p-8 md:p-12 text-center border border-emerald-100 shadow-xl shadow-emerald-900/5"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Want to become a sponsor?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our network of prestigious local and national businesses. We offer tiered sponsorship packages with excellent exposure to our active membership base.
          </p>
          <a 
            href="/#contact"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full text-white bg-emerald-600 hover:bg-emerald-700 transition-all duration-300 shadow-lg shadow-emerald-600/30 hover:-translate-y-1"
          >
            Contact Sponsorship Team
          </a>
        </motion.div>
      </section>
    </div>
  );
}
