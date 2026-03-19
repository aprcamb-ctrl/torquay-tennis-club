import { useState } from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };
  return (
    <footer id="contact" className="bg-gray-900 text-white pt-24 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center mb-6">
              <img 
                src="https://i.postimg.cc/50Jt9Ptj/TTC-Logo-New.jpg" 
                alt="Torquay Tennis Club Logo" 
                className="h-16 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your local hub for tennis excellence. Join our vibrant community of players today.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com/torquaytennis" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-500 transition-colors" aria-label="Facebook">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://instagram.com/torquaytennis" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-500 transition-colors" aria-label="Instagram">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-emerald-400 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#facilities" className="text-gray-400 hover:text-white transition-colors">Facilities</a></li>
              <li><a href="#other-sports" className="text-gray-400 hover:text-white transition-colors">Padel & Pickleball</a></li>
              <li><a href="#events" className="text-gray-400 hover:text-white transition-colors">Events</a></li>
              <li><a href="#programs" className="text-gray-400 hover:text-white transition-colors">Programs</a></li>
              <li><a href="#membership" className="text-gray-400 hover:text-white transition-colors">Membership</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-emerald-400 uppercase tracking-wider text-sm">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>123 Tennis Lane<br />Torquay, TQ1 1AB<br />United Kingdom</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <a href="tel:+441803123456" className="hover:text-white transition-colors">+44 1803 123456</a>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <a href="mailto:hello@torquaytennis.co.uk" className="hover:text-white transition-colors">hello@torquaytennis.co.uk</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-emerald-400 uppercase tracking-wider text-sm">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to get the latest news and updates from the club.</p>
            {subscribed ? (
              <p className="text-emerald-400 font-medium">Thanks for subscribing! We&apos;ll be in touch.</p>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  required
                  aria-label="Email address for newsletter"
                />
                <button
                  type="submit"
                  className="bg-emerald-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Torquay Tennis Club. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
