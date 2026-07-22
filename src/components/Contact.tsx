import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, Calendar, CheckCircle2 } from 'lucide-react';
import { formatContactEmail, triggerMailto } from '../utils/emailService';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceInterest: 'Cinematic Video Production',
    message: '',
  });
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setStatus('Please provide your name and email address.');
      return;
    }

    const { subject, body } = formatContactEmail(formData);
    setStatus('Opening email client...');
    triggerMailto(subject, body);
  };

  return (
    <section id="contact" className="py-28 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column Info */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-bold uppercase tracking-widest text-[#FFB6D9] mb-3 block"
            >
              Direct Consultation
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-extrabold mb-6"
            >
              Let’s Build Something <br />
              <span className="gradient-text">Undeniable Together</span>
            </motion.h2>

            <p className="text-gray-300 text-base sm:text-lg mb-8 leading-relaxed">
              Have a custom project, upcoming brand shoot, or executive inquiry? Connect directly with our leadership team.
            </p>

            {/* Channel Cards */}
            <div className="space-y-4">
              <div className="glass-card p-5 rounded-2xl border border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#FFB6D9]/15 border border-[#FFB6D9]/30 flex items-center justify-center text-[#FFB6D9]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block font-medium">Direct Executive Email</span>
                  <a href="mailto:soulmediagroup.info@gmail.com" className="text-base font-bold text-white hover:text-[#FFB6D9] transition-colors">
                    soulmediagroup.info@gmail.com
                  </a>
                </div>
              </div>

              <div className="glass-card p-5 rounded-2xl border border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#E5D4FF]/15 border border-[#E5D4FF]/30 flex items-center justify-center text-[#E5D4FF]">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block font-medium">Strategy Consultation</span>
                  <span className="text-base font-bold text-white">Direct 1-on-1 Session with Founders</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 border border-white/15 relative shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#FFB6D9]" />
              <span>Send Executive Inquiry</span>
            </h3>

            {status && (
              <div className="mb-6 p-4 rounded-xl bg-[#FFB6D9]/15 border border-[#FFB6D9] text-[#FFB6D9] text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{status}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs font-semibold text-gray-300 mb-1 block">Your Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#FFB6D9] focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 mb-1 block">Your Email Address *</label>
                <input
                  type="email"
                  placeholder="alex@brand.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#FFB6D9] focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 mb-1 block">Primary Interest</label>
                <select
                  value={formData.serviceInterest}
                  onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#161224] border border-white/10 text-white focus:border-[#FFB6D9] focus:outline-none text-sm"
                >
                  <option value="Cinematic Video Production">Cinematic Video Production</option>
                  <option value="Social Media Retainer">Social Media Retainer</option>
                  <option value="Paid Ad Growth Campaign">Paid Ad Growth Campaign</option>
                  <option value="Brand Identity & Strategy">Brand Identity & Strategy</option>
                  <option value="Dedicated SMM / Editor Sourcing">Dedicated SMM / Editor Sourcing</option>
                  <option value="Custom Scope / Other">Custom Scope / Other</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 mb-1 block">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your brand, current challenges, and project vision..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#FFB6D9] focus:outline-none text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FFB6D9] via-[#E5D4FF] to-[#C2FFE5] text-[#0D0B14] font-extrabold text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(255,182,217,0.4)] transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Submit Direct Inquiry</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
