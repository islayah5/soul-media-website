import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portfolioModalOpen, setPortfolioModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Observe if portfolio modal overlay is active
  useEffect(() => {
    const checkModalState = () => {
      setPortfolioModalOpen(document.body.hasAttribute('data-portfolio-modal-open'));
    };

    const observer = new MutationObserver(checkModalState);
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-portfolio-modal-open'] });

    return () => observer.disconnect();
  }, []);

  // Lock background scroll when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Packages', href: '#packages' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  // Completely hide main navbar if full-screen portfolio showcase is active
  if (portfolioModalOpen) {
    return null;
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 glass-nav shadow-2xl'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <Logo width={160} height={55} />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 glass-card px-6 py-2.5 rounded-full border border-white/10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-[#FFB6D9] transition-colors relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FFB6D9] to-[#E5D4FF] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#quote-builder"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-semibold rounded-full group bg-gradient-to-br from-[#FFB6D9] via-[#E5D4FF] to-[#C2FFE5] group-hover:from-[#FFB6D9] group-hover:to-[#FF80BF] text-white shadow-lg shadow-[#FFB6D9]/20 transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-[#0D0B14] rounded-full group-hover:bg-opacity-0 text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FFB6D9] group-hover:text-white" />
                <span>Build Custom Scope</span>
                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl glass-card text-white hover:text-[#FFB6D9] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#0D0B14]/95 backdrop-blur-2xl lg:hidden pt-28 px-6 pb-12 flex flex-col justify-between"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-bold text-gray-200 hover:text-[#FFB6D9] transition-colors border-b border-white/10 pb-3 flex justify-between items-center"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-5 h-5 text-gray-500" />
                </motion.a>
              ))}
            </div>

            <div className="pt-6">
              <a
                href="#quote-builder"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FFB6D9] to-[#E5D4FF] text-[#0D0B14] font-bold text-center block shadow-xl shadow-[#FFB6D9]/20"
              >
                Build Custom Scope
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
