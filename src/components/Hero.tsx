import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Play, ArrowDown, Film, MapPin, Box } from 'lucide-react';

export const Hero: React.FC = () => {
  const highlights = [
    { label: 'Cinematic Production', value: '4K On-Location & Studio', icon: Film },
    { label: 'Regional & Remote', value: 'Tampa Bay HQ + Nationwide', icon: MapPin },
    { label: 'Modern Tech Engine', value: '3D Renders & Smart Pipelines', icon: Box },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Top Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-[#FFB6D9]/30 mb-8 shadow-xl shadow-[#FFB6D9]/10"
        >
          <span className="w-2 h-2 rounded-full bg-[#FFB6D9] animate-pulse" />
          <span className="text-xs md:text-sm font-semibold tracking-wider uppercase text-gray-200">
            Next-Gen Media Production & Strategy
          </span>
          <Sparkles className="w-4 h-4 text-[#FFB6D9]" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.08] mb-8"
        >
          High-Impact Creatives <br />
          <span className="gradient-text">That Scale Your Brand</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-normal leading-relaxed mb-12"
        >
          We combine cinematic storytelling, 3D web modeling, and automated media pipelines to amplify your brand presence.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20"
        >
          <a
            href="#quote-builder"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#FFB6D9] via-[#E5D4FF] to-[#C2FFE5] text-[#0D0B14] font-bold text-lg hover:shadow-[0_0_30px_rgba(255,182,217,0.5)] transition-all transform hover:-translate-y-1 active:translate-y-0 shadow-xl"
          >
            Build Custom Scope
          </a>

          <a
            href="#portfolio"
            className="w-full sm:w-auto px-8 py-4 rounded-full glass-card border border-white/20 text-white font-semibold text-lg flex items-center justify-center gap-3 hover:bg-white/10 transition-all transform hover:-translate-y-1 active:translate-y-0"
          >
            <div className="w-8 h-8 rounded-full bg-[#FFB6D9]/20 flex items-center justify-center text-[#FFB6D9]">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
            <span>Explore Our Work</span>
          </a>
        </motion.div>

        {/* Authentic Pillars Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {highlights.map((item, i) => (
            <div
              key={i}
              className="glass-card glass-card-hover p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3 text-[#FFB6D9]">
                <item.icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-[#FFB6D9] uppercase tracking-wider mb-1">
                {item.label}
              </span>
              <span className="text-base sm:text-lg font-extrabold text-white">
                {item.value}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-400 animate-bounce">
        <a href="#about" aria-label="Scroll to About">
          <ArrowDown className="w-6 h-6 text-[#FFB6D9]" />
        </a>
      </div>
    </section>
  );
};
