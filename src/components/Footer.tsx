import React, { useState } from 'react';
import { Logo } from './Logo';
import { Sparkles, ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="pt-20 pb-12 px-6 relative z-10 border-t border-white/10 bg-[#0A0810]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          {/* Col 1: Brand & Status */}
          <div className="md:col-span-1 space-y-4">
            <a href="#home" className="inline-block">
              <Logo width={170} height={60} />
            </a>
            <p className="text-xs text-gray-400 leading-relaxed">
              High-impact media production, intentional community engagement, and smart operational systems built to make your brand undeniable.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C2FFE5]/10 border border-[#C2FFE5]/30 text-[#C2FFE5] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#C2FFE5] animate-ping" />
              <span>Accepting Select Clients Q4</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><a href="#home" className="hover:text-[#FFB6D9] transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-[#FFB6D9] transition-colors">About Agency</a></li>
              <li><a href="#services" className="hover:text-[#FFB6D9] transition-colors">Capabilities & Services</a></li>
              <li><a href="#packages" className="hover:text-[#FFB6D9] transition-colors">Packages & Retainers</a></li>
              <li><a href="#portfolio" className="hover:text-[#FFB6D9] transition-colors">Case Studies</a></li>
              <li><a href="#team" className="hover:text-[#FFB6D9] transition-colors">Leadership Core</a></li>
            </ul>
          </div>

          {/* Col 3: Capabilities */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Capabilities</h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><span className="hover:text-white transition-colors">On-Location Directing & Filming</span></li>
              <li><span className="hover:text-white transition-colors">Post-Production & Visual Editing</span></li>
              <li><span className="hover:text-white transition-colors">Intentional Social Management</span></li>
              <li><span className="hover:text-white transition-colors">Ad Creative & Campaign Strategy</span></li>
              <li><span className="hover:text-white transition-colors">Talent Sourcing & Training Advisory</span></li>
              <li><span className="hover:text-white transition-colors">Modern Web & Tech Solutions</span></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Executive Briefing</h4>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              Subscribe to our monthly breakdown of high-performing media strategies, video hooks, and automation setups.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-[#C2FFE5]/15 border border-[#C2FFE5] text-[#C2FFE5] text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Subscribed! Welcome aboard.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter work email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:border-[#FFB6D9] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FFB6D9] to-[#E5D4FF] text-[#0D0B14] font-bold text-xs flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Soul Media Group. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="mailto:soulmediagroup.info@gmail.com" className="hover:text-gray-300 transition-colors">soulmediagroup.info@gmail.com</a>
            <a href="#home" className="hover:text-[#FFB6D9] transition-colors flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#FFB6D9]" />
              <span>Back to top</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
