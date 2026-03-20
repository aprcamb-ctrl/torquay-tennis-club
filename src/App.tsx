/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Facilities from './components/Facilities';
import OtherSports from './components/OtherSports';
import Events from './components/Events';
import Programs from './components/Programs';
import CoachingDetail from './components/CoachingDetail';
import Membership from './components/Membership';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import EventPopup from './components/EventPopup';
import WeatherWidget from './components/WeatherWidget';
import SportSelector from './components/SportSelector';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  return (
    <div className="min-h-screen bg-white selection:bg-emerald-200 selection:text-emerald-900">
      <Navbar />
      <main>
        <Hero />
        <SportSelector />
        <Facilities />
        <OtherSports />
        <Events />
        <Programs />
        <CoachingDetail />
        <Membership />
        <Testimonials />
      </main>
      <Footer />
      <WeatherWidget />
      <EventPopup />
      <ChatWidget />
      <Analytics />
    </div>
  );
}
