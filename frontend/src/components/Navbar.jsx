import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Home', 'How It Works', 'Predict', 'Results', 'About'];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0F1E]/80 backdrop-blur-md border-b border-[#1E2A45]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="relative">
              <Heart
                size={28}
                className="text-[#E53E3E] animate-pulse"
                fill="currentColor"
              />
            </div>
            <div className="text-xl font-bold text-gradient">CardioSense AI</div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                whileHover={{ color: '#06B6D4' }}
                className="text-[#94A3B8] hover:text-[#06B6D4] transition-colors"
              >
                {link}
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 border-2 border-[#3B82F6] text-[#3B82F6] rounded-lg font-semibold hover:bg-[#3B82F6]/10 transition-colors glow-blue"
            >
              Try Now →
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-4 pb-4 border-t border-[#1E2A45] pt-4"
          >
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="block py-2 text-[#94A3B8] hover:text-[#06B6D4]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="w-full mt-4 px-6 py-2 border-2 border-[#3B82F6] text-[#3B82F6] rounded-lg font-semibold"
            >
              Try Now →
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
