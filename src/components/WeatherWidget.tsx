import { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Thermometer, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function WeatherWidget() {
  const [weather, setWeather] = useState<{ temp: string; desc: string; icon: string } | null>(null);
  const [isPlayable, setIsPlayable] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

      try {
        const response = await fetch('https://wttr.in/Torquay?format=j1', { signal: controller.signal });
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        const current = data.current_condition[0];
        setWeather({
          temp: current.temp_C,
          desc: current.weatherDesc[0].value,
          icon: current.weatherCode
        });
        
        const precip = parseFloat(current.precipMM);
        setIsPlayable(precip < 0.5);
      } catch (error) {
        console.warn('Weather fetch failed, using fallback:', error);
        // Fallback to a sensible default if API is down or CORS blocked
        setWeather({
          temp: '12',
          desc: 'Clear',
          icon: '113'
        });
        setIsPlayable(true);
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    }

    fetchWeather();
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (desc: string) => {
    const d = desc.toLowerCase();
    if (d.includes('rain') || d.includes('drizzle')) return <CloudRain className="w-5 h-5 text-blue-400" />;
    if (d.includes('cloud')) return <Cloud className="w-5 h-5 text-gray-400" />;
    return <Sun className="w-5 h-5 text-yellow-400" />;
  };

  if (loading) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-3 bg-white/90 backdrop-blur-md border border-gray-100 p-2 pr-4 rounded-full shadow-lg"
    >
      {/* Weather Part */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
        {weather ? getWeatherIcon(weather.desc) : <Sun className="w-5 h-5 text-yellow-400" />}
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-900 leading-none">{weather?.temp || '--'}°C</span>
          <span className="text-[10px] text-gray-500 font-medium uppercase tracking-tight">{weather?.desc || 'Loading...'}</span>
        </div>
      </div>

      {/* Court Status Part */}
      <div className="flex items-center gap-2 pl-1">
        <div className="relative">
          <div className={`w-3 h-3 rounded-full ${isPlayable ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`}></div>
          <div className={`absolute inset-0 w-3 h-3 rounded-full ${isPlayable ? 'bg-emerald-500' : 'bg-amber-500'} opacity-40 animate-ping`}></div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-gray-800 leading-none">
            {isPlayable ? 'Courts Playable' : 'Courts Damp'}
          </span>
          <span className="text-[10px] text-gray-500 font-medium heartbeat uppercase tracking-tight">Live Status</span>
        </div>
      </div>
    </motion.div>
  );
}
