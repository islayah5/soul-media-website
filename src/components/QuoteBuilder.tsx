import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Sliders, CheckSquare, User, Send, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { formatQuoteEmail, triggerMailto } from '../utils/emailService';

export const QuoteBuilder: React.FC = () => {
  const [step, setStep] = useState(1);
  const [volume, setVolume] = useState(16);
  const [management, setManagement] = useState<'full' | 'production'>('production');
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'On-Location Directing & Filming',
    'Post-Production & Visual Editing Pipeline',
  ]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const availableServices = [
    'On-Location Directing & Filming (Tampa Bay / Remote)',
    'Post-Production & Visual Editing Pipeline',
    '3D Modeling & WebGL Product Renders',
    'Graphic Design & Brand Assets Suite',
    'Intentional Social Media Management',
    'Ad Creative & Campaign Strategy Suite',
    'Modern Web & Tech Automation Solutions',
    'Talent Sourcing & Training Advisory (In-House SMM/Editor)',
  ];

  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  // Calculate live estimated monthly range
  const basePricePerAsset = management === 'full' ? 180 : 120;
  const serviceMultiplier = 1 + selectedServices.length * 0.12;
  const estimatedMin = Math.round(volume * basePricePerAsset * serviceMultiplier);
  const estimatedMax = Math.round(estimatedMin * 1.3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setToastMessage('Please enter your name and email address.');
      setTimeout(() => setToastMessage(null), 4000);
      return;
    }

    try {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFB6D9', '#E5D4FF', '#FFD4C2', '#C2FFE5'],
      });
    } catch (err) {
      console.log('Confetti triggered', err);
    }

    const { subject, body } = formatQuoteEmail({
      name: formData.name,
      email: formData.email,
      businessName: formData.businessName,
      deliverableVolume: volume,
      managementLevel: management === 'full' ? 'Full Retainer & Intentional Management' : 'Filming, 3D & Post-Production Only',
      servicesSelected: selectedServices,
      notes: formData.notes,
    });

    setSubmitted(true);
    setToastMessage('Opening your email client to send your custom proposal request...');

    setTimeout(() => {
      triggerMailto(subject, body);
    }, 600);
  };

  return (
    <section id="quote-builder" className="py-28 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-[#FFB6D9] mb-3 block"
          >
            Interactive Scope Engine
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold mb-4"
          >
            Build Your Custom <span className="gradient-text">Agency Scope</span>
          </motion.h2>

          <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto">
            Configure your deliverables, filming options, 3D assets, and custom modules to generate a real-time custom scope.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-[#FFB6D9]/30 relative shadow-2xl">
          {/* Progress Header */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FFB6D9]">
                Step 0{step} of 04
              </span>
              <span className="text-xs font-medium text-gray-400">
                Est. Monthly Scope: <strong className="text-white">${estimatedMin.toLocaleString()} – ${estimatedMax.toLocaleString()}</strong>
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#FFB6D9] via-[#E5D4FF] to-[#C2FFE5]"
                initial={{ width: '25%' }}
                animate={{ width: `${(step / 4) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Toast Notice */}
          {toastMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-[#FFB6D9]/15 border border-[#FFB6D9] text-[#FFB6D9] text-sm font-semibold flex items-center gap-3">
              <Sparkles className="w-5 h-5 shrink-0 animate-spin" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Step Contents */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-3 text-xl font-bold text-white">
                  <Sliders className="w-6 h-6 text-[#FFB6D9]" />
                  <h3>Select Monthly Deliverables Volume</h3>
                </div>

                {/* Range Slider */}
                <div className="glass-card p-6 rounded-2xl border border-white/10">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-gray-300">Deliverables Target</span>
                    <span className="text-3xl font-black text-[#FFB6D9]">{volume} Assets / mo</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="60"
                    step="2"
                    value={volume}
                    onChange={(e) => setVolume(parseInt(e.target.value))}
                    className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FFB6D9]"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono">
                    <span>4 (Boutique)</span>
                    <span>20 (Growth)</span>
                    <span>60+ (Enterprise)</span>
                  </div>
                </div>

                {/* Management Level Toggle */}
                <div>
                  <label className="text-sm font-semibold text-gray-300 block mb-3">Service Focus Model</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setManagement('production')}
                      className={`p-5 rounded-2xl border text-left transition-all ${
                        management === 'production'
                          ? 'border-[#FFB6D9] bg-[#FFB6D9]/15 shadow-lg'
                          : 'border-white/10 glass-card opacity-70 hover:opacity-100'
                      }`}
                    >
                      <h4 className="font-bold text-white mb-1">Filming, 3D & Post-Production Only</h4>
                      <p className="text-xs text-gray-300">We shoot, script, render 3D assets, and edit content for your team.</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setManagement('full')}
                      className={`p-5 rounded-2xl border text-left transition-all ${
                        management === 'full'
                          ? 'border-[#FFB6D9] bg-[#FFB6D9]/15 shadow-lg'
                          : 'border-white/10 glass-card opacity-70 hover:opacity-100'
                      }`}
                    >
                      <h4 className="font-bold text-white mb-1">Full Retainer & Intentional SMM</h4>
                      <p className="text-xs text-gray-300">We direct filming, edit content, manage social calendars, and build community.</p>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-xl font-bold text-white">
                  <CheckSquare className="w-6 h-6 text-[#E5D4FF]" />
                  <h3>Select Required Services & Modules</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {availableServices.map((service) => {
                    const isSelected = selectedServices.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService(service)}
                        className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-[#E5D4FF] bg-[#E5D4FF]/15 text-white font-semibold'
                            : 'border-white/10 glass-card text-gray-300 hover:text-white'
                        }`}
                      >
                        <span className="text-sm">{service}</span>
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                            isSelected ? 'border-[#E5D4FF] bg-[#E5D4FF] text-[#0D0B14]' : 'border-white/30'
                          }`}
                        >
                          {isSelected && <CheckCircle className="w-3.5 h-3.5" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-xl font-bold text-white">
                  <User className="w-6 h-6 text-[#FFD4C2]" />
                  <h3>Your Contact & Business Profile</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-300 mb-1 block">Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#FFB6D9] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-300 mb-1 block">Email Address *</label>
                    <input
                      type="email"
                      placeholder="sarah@yourbrand.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#FFB6D9] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 mb-1 block">Brand or Company Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Apparel Co."
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#FFB6D9] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 mb-1 block">Project Vision & Location Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Describe your current content goals, filming location (e.g. Tampa/Clearwater or Remote), 3D asset needs..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#FFB6D9] focus:outline-none"
                  />
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-xl font-bold text-white">
                  <Send className="w-6 h-6 text-[#C2FFE5]" />
                  <h3>Review & Submit Proposal Request</h3>
                </div>

                <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4 text-sm text-gray-200">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-gray-400">Client:</span>
                    <span className="font-semibold text-white">{formData.name || 'Not provided'} ({formData.email})</span>
                  </div>

                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-gray-400">Monthly Volume:</span>
                    <span className="font-semibold text-white">{volume} Assets / Month</span>
                  </div>

                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-gray-400">Service Focus:</span>
                    <span className="font-semibold text-white">
                      {management === 'full' ? 'Full Retainer & SMM' : 'Filming, 3D & Post-Production Only'}
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-400 block mb-1">Selected Services:</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedServices.map((s) => (
                        <span key={s} className="px-2.5 py-1 rounded-full bg-white/10 text-xs text-[#FFB6D9]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#C2FFE5]/10 border border-[#C2FFE5]/30 text-[#C2FFE5] text-center">
                    <span className="text-xs uppercase font-bold tracking-widest block mb-1">Estimated Monthly Scope</span>
                    <span className="text-3xl font-black">${estimatedMin.toLocaleString()} – ${estimatedMax.toLocaleString()} / mo</span>
                  </div>
                </div>

                {submitted && (
                  <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-center text-sm font-semibold">
                    ✨ Your request has been formatted! If your email app did not open automatically, please send your email directly to <strong>soulmediagroup.info@gmail.com</strong>.
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-10 pt-6 border-t border-white/10">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-card text-xs font-semibold text-gray-300 hover:text-white transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#FFB6D9] to-[#E5D4FF] text-[#0D0B14] font-bold text-sm hover:scale-105 transition-transform shadow-lg"
              >
                <span>Continue Step 0{step + 1}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FFB6D9] via-[#E5D4FF] to-[#C2FFE5] text-[#0D0B14] font-extrabold text-base hover:shadow-[0_0_30px_rgba(255,182,217,0.5)] transition-all shadow-xl"
              >
                <Sparkles className="w-5 h-5" />
                <span>Send Strategy Proposal Request</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
