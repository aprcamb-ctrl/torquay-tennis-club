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
import Membership from './components/Membership';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import EventPopup from './components/EventPopup';
import WeatherWidget from './components/WeatherWidget';

export default function App() {
  return (
    <div className="min-h-screen bg-white selection:bg-emerald-200 selection:text-emerald-900">
      <Navbar />
      <main>
        <Hero />
        <Facilities />
        <OtherSports />
        <Events />
        <Programs />
        <Membership />
        <Testimonials />
      </main>
      <Footer />
      <WeatherWidget />
      <EventPopup />
      <ChatWidget />
    </div>
  );
}
