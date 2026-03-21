import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Coaching from './pages/Coaching';
import Events from './pages/Events';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import EventPopup from './components/EventPopup';
import WeatherWidget from './components/WeatherWidget';
import { Analytics } from '@vercel/analytics/react';

import { useTina } from 'tinacms/dist/react';
import client from '../tina/__generated__/client';

function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      let retries = 0;
      const maxRetries = 10;
      
      const tryScroll = () => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else if (retries < maxRetries) {
          retries++;
          setTimeout(tryScroll, 200);
        }
      };

      setTimeout(tryScroll, 100);
    } else {
      // Scroll to top on any navigation without a hash
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash, key]);

  return null;
}

export default function App() {
  const [coachingData, setCoachingData] = useState<any>(null);

  useEffect(() => {
    client.queries.coaching({ relativePath: 'coaching.json' }).then((res) => {
      setCoachingData(res.data.coaching);
    });
  }, []);

  const featuredEvent = coachingData?.events?.[0];

  return (
    <Router>
      <ScrollManager />
      <div className="min-h-screen bg-white selection:bg-emerald-200 selection:text-emerald-900">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/coaching" element={<Coaching />} />
          </Routes>
        </main>
        <Footer />
        <WeatherWidget />
        <EventPopup event={featuredEvent} />
        <ChatWidget />
        <Analytics />
      </div>
    </Router>
  );
}
