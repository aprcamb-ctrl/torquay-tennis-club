import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white pt-24 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <img 
              src="https://i.postimg.cc/50Jt9Ptj/TTC-Logo-New.jpg" 
              alt="Torquay Tennis Club Logo" 
              className="h-16 w-auto brightness-0 invert"
            />
            <p className="text-gray-400 leading-relaxed">
              Experience world-class tennis and social facilities in the heart of Torquay. Join our vibrant community today.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-400 hover:text-emerald-400 transition-colors">Home</Link></li>
              <li><Link to="/#facilities" className="text-gray-400 hover:text-emerald-400 transition-colors">Facilities</Link></li>
              <li><Link to="/#tennis" className="text-gray-400 hover:text-emerald-400 transition-colors">Tennis</Link></li>
              <li><Link to="/#padel" className="text-gray-400 hover:text-emerald-400 transition-colors">Padel</Link></li>
              <li><Link to="/#pickleball" className="text-gray-400 hover:text-emerald-400 transition-colors">Pickleball</Link></li>
              <li><Link to="/coaching" className="text-gray-400 hover:text-emerald-400 transition-colors">Coaching</Link></li>
              <li><Link to="/#membership" className="text-gray-400 hover:text-emerald-400 transition-colors">Membership</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-wider text-sm">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-gray-400">Belgrave Road, Torquay, TQ2 5HP</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                <a href="tel:01803209500" className="text-gray-400 hover:text-emerald-400 transition-colors">01803 209500</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
                <a href="mailto:info@torquaytennis.com" className="text-gray-400 hover:text-emerald-400 transition-colors">info@torquaytennis.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-emerald-400 uppercase tracking-wider text-sm">Official Club Sponsor</h3>
            <div className="bg-white/5 rounded-xl p-6 border border-gray-800 backdrop-blur-sm group hover:border-emerald-500/30 transition-all duration-300">
              <img
                src="https://i.postimg.cc/FFbg12wZ/Pro-Direct.png"
                alt="Pro-Direct - Official Club Sponsor"
                className="w-full h-auto object-contain brightness-90 group-hover:brightness-100 transition-all p-2"
              />
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Torquay Tennis Club. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
