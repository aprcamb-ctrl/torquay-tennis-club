import React from 'react';
import { motion } from 'motion/react';

export default function Events() {
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8">Club Events</h1>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl">
          Discover our upcoming tournaments, social gatherings, and special events.
        </p>
        
        <div className="bg-emerald-50 rounded-2xl p-12 mt-8 text-center border border-emerald-100 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2026 Calendar Coming Soon</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            We are currently finalizing our events calendar for the upcoming season. Check back regularly for updates on tournaments and social events.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
