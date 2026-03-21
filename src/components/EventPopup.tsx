import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar } from 'lucide-react';

export default function EventPopup({ event }: { event?: any }) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasClosed, setHasClosed] = useState(false);

  useEffect(() => {
    // Show popup after 5 seconds if it hasn't been closed manually and we have an event
    if (event) {
      const timer = setTimeout(() => {
        if (!hasClosed) {
          setIsVisible(true);
        }
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [hasClosed, event]);

  const handleClose = () => {
    setIsVisible(false);
    setHasClosed(true);
  };

  if (!event) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, type: 'spring', bounce: 0.4 }}
          className="fixed bottom-6 left-6 z-50 w-[340px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-emerald-600 px-5 py-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-100" />
              <h3 className="font-bold text-lg tracking-wide">Upcoming Events</h3>
            </div>
            <button
              onClick={handleClose}
              className="text-emerald-100 hover:text-white hover:bg-emerald-700/50 p-1.5 rounded-lg transition-colors"
              aria-label="Close popup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
              <h4 className="font-bold text-gray-900 text-xl mb-1">{event.name}</h4>
              <p className="text-emerald-600 font-medium text-sm mb-3">{event.date}</p>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-emerald-200">
                <span className="text-gray-500 font-medium text-sm">Start Time:</span>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded-md">{event.time}</span>
              </div>
            </div>
            
            <button 
              className="w-full mt-5 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 rounded-xl transition-colors shadow-sm"
              onClick={handleClose}
            >
              Got it
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
