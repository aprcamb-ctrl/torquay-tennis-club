import { motion } from 'motion/react';

const SportSelector = () => {
  const sports = [
    {
      title: 'Tennis',
      desc: '12 Courts (9 Outdoor, 3 Indoor)',
      image: 'https://images.unsplash.com/photo-1595435063823-ff48c4a03421?q=80&w=2000&auto=format&fit=crop',
      link: '#facilities',
      color: 'bg-emerald-600'
    },
    {
      title: 'Padel',
      desc: 'Experience the fastest growing sport',
      image: 'https://i.postimg.cc/bNLDfLbL/Padel-Player.jpg', 
      link: '#other-sports',
      color: 'bg-emerald-500',
      featured: true // Highlighting Padel
    },
    {
      title: 'Pickleball',
      desc: 'Social, fast-paced, and fun',
      image: 'https://i.postimg.cc/15Mn1M6c/Pickleball-Padel.jpg',
      link: '#other-sports',
      color: 'bg-teal-500'
    }
  ];

  return (
    <section className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-emerald-600 font-semibold tracking-wide uppercase text-sm mb-3">Your Journey Starts Here</h2>
          <p className="text-4xl font-extrabold text-gray-900 tracking-tight">Choose Your Game</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sports.map((sport, index) => (
            <motion.a 
              key={sport.title} 
              href={sport.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl shadow-xl cursor-pointer transition-all duration-500 hover:-translate-y-2 block aspect-[4/5]"
            >
              {/* Background Image with Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${sport.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:via-black/10 transition-colors" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 p-8 text-white w-full">
                {sport.featured && (
                  <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full mb-3 inline-block uppercase tracking-wider shadow-lg">
                    Most Popular
                  </span>
                )}
                <h3 className="text-3xl font-bold mb-2">{sport.title}</h3>
                <p className="text-sm opacity-90 font-medium leading-relaxed">{sport.desc}</p>
                <div className={`mt-6 h-1.5 w-0 group-hover:w-full transition-all duration-500 ease-out rounded-full ${sport.color}`} />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SportSelector;
