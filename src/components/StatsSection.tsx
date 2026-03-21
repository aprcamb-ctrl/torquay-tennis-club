import { useEffect, useRef, useState } from 'react';

interface StatProps {
  label: string;
  target: number;
  suffix?: string;
  key?: number | string;
}

const StatCard = ({ label, target, suffix = '' }: StatProps) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let current = 0;
          const speed = 200; // The lower the slower
          const inc = target / speed;

          const updateCount = () => {
            current += inc;
            if (current < target) {
              setCount(Math.ceil(current));
              setTimeout(updateCount, 15);
            } else {
              setCount(target);
            }
          };

          updateCount();
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={counterRef} className="stat-card">
      <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">
        <span className="counter">{count}</span>{suffix}
      </h2>
      <p className="text-sm uppercase tracking-wider font-semibold">{label}</p>
    </div>
  );
};

export default function StatsSection() {
  const stats = [
    { label: 'Tennis Courts', target: 11 },
    { label: 'Pro Padel Courts', target: 3 },
    { label: 'Pickleball Courts', target: 2 },
    { label: 'Active Members', target: 700, suffix: '+' },
    { label: 'Pro Coaches', target: 10, suffix: '+' },
  ];

  return (
    <section className="bg-emerald-900 py-12 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
          {stats.map((stat, idx) => (
            <StatCard key={idx} label={stat.label} target={stat.target} suffix={stat.suffix} />
          ))}
        </div>
      </div>
    </section>
  );
}
