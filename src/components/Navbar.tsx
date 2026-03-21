import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('Home');

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Facilities', href: '/#facilities' },
    { 
      name: 'Sport', 
      isDropdown: true,
      items: [
        { name: 'Tennis', href: '/#tennis' },
        { name: 'Padel', href: '/#padel' },
        { name: 'Pickleball', href: '/#pickleball' },
      ]
    },
    { name: 'Events', href: '/events' },
    { name: 'Coaching', href: '/coaching' },
    { name: 'Membership', href: '/#membership' },
    { name: 'Sponsors', href: '/sponsors' },
    { name: 'Guidelines', href: '/guidelines' },
    { name: 'Contact', href: '/#contact' },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const currentHash = location.hash;

    if (currentPath === '/coaching') {
      setActiveLink('Coaching');
    } else if (currentPath === '/' && !currentHash) {
      setActiveLink('Home');
    } else {
      // Prioritize hash matches if a hash exists
      const allLinks = navLinks.flatMap(link => link.isDropdown ? link.items || [] : [link as any]);
      const hashMatch = currentHash ? allLinks.find(link => 
        link.href && link.href.includes('#') && currentHash === link.href.substring(link.href.indexOf('#'))
      ) : null;
      
      const pathMatch = allLinks.find(link => link.href && currentPath === link.href);
      
      const match = hashMatch || pathMatch;
      if (match) setActiveLink(match.name);
    }
  }, [location]);

  // Handle clicking outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = (name: string) => {
    setActiveLink(name);
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  const isSportActive = ['Tennis', 'Padel', 'Pickleball'].includes(activeLink);

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center">
              <img 
                src="https://i.postimg.cc/50Jt9Ptj/TTC-Logo-New.jpg" 
                alt="Torquay Tennis Club Logo" 
                className="h-16 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </Link>

            {/* Desktop Menu Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                link.isDropdown ? (
                  <div key={link.name} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`${isSportActive ? 'text-emerald-600' : 'text-gray-600'} hover:text-emerald-600 font-medium transition-colors whitespace-nowrap flex items-center gap-1`}
                    >
                      {link.name}
                      <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-4 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 overflow-hidden"
                        >
                          {link.items?.map(sub => (
                            <Link
                              key={sub.name}
                              to={sub.href}
                              onClick={() => handleLinkClick(sub.name)}
                              className={`block px-5 py-3 text-sm font-medium ${activeLink === sub.name ? 'text-emerald-600 bg-emerald-50/50' : 'text-gray-600'} hover:text-emerald-600 hover:bg-emerald-50 transition-colors`}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href!}
                    onClick={() => handleLinkClick(link.name)}
                    className={`${activeLink === link.name ? 'text-emerald-600' : 'text-gray-600'} hover:text-emerald-600 font-medium transition-colors whitespace-nowrap`}
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <a
                href="/#membership"
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
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                link.isDropdown ? (
                  <div key={link.name} className="space-y-1 bg-gray-50/50 rounded-lg p-1">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`w-full flex justify-between items-center px-3 py-3 text-base font-medium rounded-lg ${isSportActive ? 'text-emerald-600' : 'text-gray-700'} hover:text-emerald-600 hover:bg-emerald-50`}
                    >
                      {link.name}
                      <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 pr-2 pb-2 space-y-1">
                            {link.items?.map(sub => (
                              <Link
                                key={sub.name}
                                to={sub.href}
                                onClick={() => handleLinkClick(sub.name)}
                                className={`block px-3 py-2 text-sm font-medium rounded-lg ${
                                  activeLink === sub.name 
                                    ? 'text-emerald-600 bg-emerald-50/80 shadow-sm border border-emerald-100/50' 
                                    : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                                }`}
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href!}
                    onClick={() => handleLinkClick(link.name)}
                    className={`block px-3 py-3 text-base font-medium rounded-lg ${
                      activeLink === link.name 
                        ? 'text-emerald-600 bg-emerald-50/50' 
                        : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              ))}
                <div className="pt-4">
                  <a
                    href="/#membership"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center bg-emerald-600 text-white px-6 py-3 rounded-full font-medium hover:bg-emerald-700 shadow-md transition-all"
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
