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
    <div ref={counterRef} className="flex flex-col items-center stat-card">
      <div className="text-3xl font-bold text-gray-900 mb-1">
        <span className="counter">{count}</span>{suffix}
      </div>
      <div className="text-sm text-gray-500 font-medium">{label}</div>
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
    <>
      {stats.map((stat, idx) => (
        <StatCard key={idx} label={stat.label} target={stat.target} suffix={stat.suffix} />
      ))}
    </>
  );
}
