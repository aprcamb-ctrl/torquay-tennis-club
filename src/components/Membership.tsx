import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export default function Membership() {
  const tiers = [
    {
      name: 'Batz Membership',
      price: '£59',
      period: '/year',
      description: 'Perfect for Padel and Pickleball players.',
      features: [
        'Discounted court booking',
        'Unlimited Pay & Play Tennis',
        'Entry to leagues & tournaments',
        '10% off at the bar',
      ],
      buttonText: 'Join as Batz Member',
      popular: false,
    },
    {
      name: 'Adult Full',
      price: '£325',
      period: '/year',
      description: 'Full playing rights, 7 days a week. Best value for regular players.',
      features: [
        'Unlimited court booking (14 days advance)',
        'Free floodlight usage',
        'Eligible for club teams',
        'Access to Wimbledon ballot',
        '10% off at the bar',
      ],
      buttonText: 'Join as Adult',
      popular: true,
    },
    {
      name: 'Family',
      price: '£450',
      period: '/year',
      description: '2 Adults and up to 3 Juniors living at the same address.',
      features: [
        'All Adult Full benefits',
        'All Junior benefits',
        'Family social events',
        'Priority booking for holiday camps',
      ],
      buttonText: 'Join as Family',
      popular: false,
    },
  ];

  return (
    <section id="membership" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-emerald-400 font-semibold tracking-wide uppercase text-sm mb-3">Join the Club</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Simple, Transparent Pricing
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-400 mx-auto">
            Choose the membership that fits your lifestyle. No joining fees, no hidden costs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-gray-800 rounded-3xl p-8 border ${tier.popular ? 'border-emerald-500 shadow-2xl shadow-emerald-900/50' : 'border-gray-700'
                } flex flex-col`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-gray-400 text-sm h-10">{tier.description}</p>
              </div>
              <div className="mb-8 flex items-baseline text-white">
                <span className="text-5xl font-extrabold tracking-tight">{tier.price}</span>
                <span className="text-xl text-gray-400 ml-1 font-medium">{tier.period}</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-6 w-6 text-emerald-400 flex-shrink-0 mr-3" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`w-full py-4 px-6 rounded-xl font-bold text-center transition-all ${tier.popular
                  ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/30'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
              >
                {tier.buttonText}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
