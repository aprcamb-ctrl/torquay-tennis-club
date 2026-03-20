/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Coaching from './pages/Coaching';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import EventPopup from './components/EventPopup';
import WeatherWidget from './components/WeatherWidget';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white selection:bg-emerald-200 selection:text-emerald-900">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coaching" element={<Coaching />} />
          </Routes>
        </main>
        <Footer />
        <WeatherWidget />
        <EventPopup />
        <ChatWidget />
        <Analytics />
      </div>
    </Router>
  );
}
