/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Facilities from './components/Facilities';
import OtherSports from './components/OtherSports';
import Programs from './components/Programs';
import Membership from './components/Membership';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

export default function App() {
  return (
    <div className="min-h-screen bg-white selection:bg-emerald-200 selection:text-emerald-900">
      <Navbar />
      <main>
        <Hero />
        <Facilities />
        <OtherSports />
        <Programs />
        <Membership />
        <Testimonials />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
