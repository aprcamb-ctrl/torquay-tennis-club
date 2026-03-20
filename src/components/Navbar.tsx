import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [visitedLinks, setVisitedLinks] = useState<string[]>(['Home']);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Facilities', href: '#facilities' },
    { name: 'Tennis', href: '#tennis' },
    { name: 'Padel', href: '#padel' },
    { name: 'Pickleball', href: '#pickleball' },
    { name: 'Events', href: '#events' },
    { name: 'Programs', href: '#programs' },
    { name: 'Membership', href: '#membership' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (name: string) => {
    if (!visitedLinks.includes(name)) {
      setVisitedLinks(prev => [...prev, name]);
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center">
              <img 
                src="https://i.postimg.cc/50Jt9Ptj/TTC-Logo-New.jpg" 
                alt="Torquay Tennis Club Logo" 
                className="h-16 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </a>

            {/* Desktop Menu Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleLinkClick(link.name)}
                  className={`${visitedLinks.includes(link.name) ? 'text-emerald-600' : 'text-gray-600'} hover:text-emerald-600 font-medium transition-colors whitespace-nowrap`}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#membership"
                className="bg-emerald-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-emerald-700 transition-colors shadow-sm whitespace-nowrap"
              >
                Join Now
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-lg p-1"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleLinkClick(link.name)}
                  className={`block px-3 py-3 text-base font-medium rounded-lg ${
                    visitedLinks.includes(link.name) 
                      ? 'text-emerald-600 bg-emerald-50/50' 
                      : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4">
                <a
                  href="#membership"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-emerald-600 text-white px-6 py-3 rounded-full font-medium hover:bg-emerald-700"
                >
                  Join Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
