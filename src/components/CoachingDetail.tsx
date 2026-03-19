import { motion } from 'motion/react';
import { Clock, Users, Zap, Target, GraduationCap, Medal, Dumbbell, HeartHandshake } from 'lucide-react';

export default function CoachingDetail() {
  const programDetails = [
    {
      title: 'Junior Coaching',
      subtitle: 'Ages 4–18 · LTA Accredited',
      description:
        'Our junior programme is designed to nurture young talent from their very first swing to competitive match play. Using the LTA progressive pathway (mini red, orange, green, and yellow ball), we ensure every child develops at the right pace.',
      highlights: [
        'Mini Tennis (ages 4–8): Saturday mornings, fun-first approach',
        'Development Squads (ages 9–14): Tuesdays & Thursdays after school',
        'Performance Squad (ages 14–18): intensive training 3× per week',
        'Holiday camps during every school break',
      ],
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgAccent: 'bg-blue-50',
      textAccent: 'text-blue-600',
    },
    {
      title: 'Adult Clinics',
      subtitle: 'All Levels · Social & Competitive',
      description:
        'Whether you want to pick up a racket for the first time or sharpen your competitive edge, our adult clinics offer something for everyone in a welcoming, social atmosphere.',
      highlights: [
        'Beginners Welcome: Monday & Wednesday evenings, 6–7 PM',
        'Cardio Tennis: high-energy fitness on court, Saturdays 9 AM',
        'Tactical Drills: intermediate & advanced, Tuesdays 7–8:30 PM',
        'Social Mix-In: Friday evenings, play with different partners',
      ],
      icon: Zap,
      color: 'from-emerald-500 to-emerald-600',
      bgAccent: 'bg-emerald-50',
      textAccent: 'text-emerald-600',
    },
    {
      title: 'Private Lessons',
      subtitle: '1-on-1 · Tailored to You',
      description:
        'Accelerate your improvement with personalised coaching from our certified professionals. Every session is customised to target your unique strengths and areas for growth.',
      highlights: [
        '30-minute or 60-minute sessions available',
        'Video analysis and technique review included',
        'Flexible scheduling, 7 days a week',
        'Package discounts: 5 lessons for the price of 4',
      ],
      icon: Target,
      color: 'from-purple-500 to-purple-600',
      bgAccent: 'bg-purple-50',
      textAccent: 'text-purple-600',
    },
    {
      title: 'Tournaments & Leagues',
      subtitle: 'Compete · Represent · Win',
      description:
        'Put your skills to the test in our regular tournaments and box leagues. From friendly internal events to representing Torquay in regional competitions, there is a competitive pathway for every ambition.',
      highlights: [
        'Monthly club box leagues (singles & doubles)',
        'Annual Club Championships with trophies and prizes',
        'Devon League teams across multiple divisions',
        'Junior inter-club matches and county trials',
      ],
      icon: Medal,
      color: 'from-orange-500 to-orange-600',
      bgAccent: 'bg-orange-50',
      textAccent: 'text-orange-600',
    },
  ];

  const coaches = [
    {
      name: 'James Hartley',
      role: 'Head Coach',
      specialty: 'Performance & Strategy',
      bio: 'LTA Level 5 coach with 20 years of experience. Former county player who has coached nationally ranked juniors.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
      icon: GraduationCap,
    },
    {
      name: 'Sophie Williams',
      role: 'Junior Development Lead',
      specialty: 'Mini Tennis & Youth',
      bio: 'Passionate about making tennis fun for kids. Runs our award-winning mini tennis programme and holiday camps.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop',
      icon: Users,
    },
    {
      name: 'Marcus Chen',
      role: 'Adult Programme Coach',
      specialty: 'Tactical Play & Fitness',
      bio: 'Combines fitness expertise with tennis coaching. Leads our popular Cardio Tennis and adult improvement clinics.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
      icon: Dumbbell,
    },
    {
      name: 'Elena Rodriguez',
      role: 'Performance Coach',
      specialty: 'Competitive & Match Play',
      bio: 'Former WTA touring professional. Specialises in match preparation and mental toughness training.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop',
      icon: Target,
    },
    {
      name: 'Tom Bradley',
      role: 'Padel Coach',
      specialty: 'Padel & Racket Sports',
      bio: 'One of the first certified padel coaches in Devon. Bringing the fastest-growing racket sport to Torquay.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop',
      icon: Zap,
    },
    {
      name: 'Rachel Adams',
      role: 'Community Coach',
      specialty: 'Inclusivity & Wellbeing',
      bio: 'Leads our walking tennis and disability tennis programmes. Believes everyone deserves access to the sport.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
      icon: HeartHandshake,
    },
    {
      name: 'Daniel Osei',
      role: 'Junior Performance Coach',
      specialty: 'County & Regional Players',
      bio: 'Works with our most talented juniors preparing them for county and national level competitions.',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop',
      icon: Medal,
    },
    {
      name: 'Katie Morrison',
      role: 'Pickleball Instructor',
      specialty: 'Pickleball & Social Play',
      bio: 'Certified pickleball instructor bringing infectious energy to every session. Leads our social play evenings.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop',
      icon: Zap,
    },
  ];

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
          {programDetails.map((program, index) => (
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
                    <program.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{program.title}</h3>
                    <p className="text-sm font-medium text-gray-400 mt-0.5">{program.subtitle}</p>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">{program.description}</p>

                <ul className="space-y-3">
                  {program.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3">
                      <Clock className={`w-5 h-5 flex-shrink-0 mt-0.5 ${program.textAccent}`} />
                      <span className="text-gray-700 text-sm leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
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
          {coaches.map((coach, index) => (
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
                  <coach.icon className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">{coach.specialty}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{coach.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
