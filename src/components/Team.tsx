import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Sparkles, Cpu, ExternalLink, X, Globe, Award, ArrowLeft } from 'lucide-react';

import jadaHeadshot from '../assets/Jada_Brown-Headshot.jpg';
import isaiahHeadshot from '../assets/Isaiah_Chandler-Headshot.PNG';
import joeHeadshot from '../assets/Joe_Irizarry_Dominicci-Headshot.jpeg';

export const Team: React.FC = () => {
  const [activePortfolio, setActivePortfolio] = useState<{
    name: string;
    role: string;
    url: string;
  } | null>(null);

  // Lock background page scroll and set attribute to hide main site navbar when modal is open
  useEffect(() => {
    if (activePortfolio) {
      document.body.style.overflow = 'hidden';
      document.body.setAttribute('data-portfolio-modal-open', 'true');
    } else {
      document.body.style.overflow = '';
      document.body.removeAttribute('data-portfolio-modal-open');
    }

    return () => {
      document.body.style.overflow = '';
      document.body.removeAttribute('data-portfolio-modal-open');
    };
  }, [activePortfolio]);

  const teamMembers = [
    {
      name: 'Jada Brown',
      role: 'Founder & Executive Producer',
      subRole: 'Brand & Client Experience Director',
      bio: 'Visionary brand architect leading creative direction, brand core definition, and client partnership. Jada works directly with clients to translate their identity into high-converting visual media.',
      image: jadaHeadshot,
      icon: Sparkles,
      color: 'from-[#FFB6D9] to-[#FF80BF]',
      badge: 'Agency Founder',
      portfolioUrl: '', // Ready for Jada's portfolio URL
    },
    {
      name: 'Isaiah Chandler',
      role: 'Systems & Operations Director',
      subRole: 'Growth & Automation Strategist',
      bio: 'Operations mastermind architecting scalable post-production workflows, 3D web modeling, automated editing pipelines, and cost-effective remote talent integration for seamless client growth.',
      image: isaiahHeadshot,
      icon: Cpu,
      color: 'from-[#E5D4FF] to-[#B892FF]',
      badge: 'Ops & Tech Lead',
      portfolioUrl: 'https://isaiah-chandler.netlify.app/',
    },
    {
      name: 'Joe Irizarry',
      role: 'Director of Photography & Videography',
      subRole: 'Lead Visual Editor',
      bio: 'Master lensman and editor orchestrating high-impact commercial video shoots, studio photography, cinematic cuts, and the signature visual styling that sets Soul Media apart.',
      image: joeHeadshot,
      icon: Camera,
      color: 'from-[#FFD4C2] to-[#C2FFE5]',
      badge: 'Production Engine',
      portfolioUrl: '', // Ready for Joe's portfolio URL
    },
  ];

  return (
    <section id="team" className="py-28 px-6 relative z-10 bg-[#0A0810]/60">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-[#FFB6D9] mb-3 block"
          >
            Leadership Spotlight
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6"
          >
            The Minds Behind <br />
            <span className="gradient-text">Soul Media</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-lg sm:text-xl font-normal leading-relaxed"
          >
            A high-velocity 3-person executive core pairing cinematic artistry, operational technology, and personable brand direction.
          </motion.p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="glass-card glass-card-hover rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-between group"
            >
              <div>
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#161224]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B14] via-transparent to-transparent opacity-80" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass-card border border-white/20 text-xs font-bold text-[#FFB6D9] flex items-center gap-1.5 shadow-lg">
                    <member.icon className="w-3.5 h-3.5" />
                    <span>{member.badge}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FFB6D9] mb-1">
                    {member.name}
                  </h3>
                  <span className="text-xs font-bold text-[#FFB6D9] uppercase tracking-wider block mb-1">
                    {member.role}
                  </span>
                  <span className="text-xs font-medium text-gray-400 block mb-4 italic">
                    {member.subRole}
                  </span>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Individual Portfolio Buttons */}
              <div className="px-8 pb-8 space-y-3">
                {member.portfolioUrl ? (
                  <>
                    <button
                      onClick={() =>
                        setActivePortfolio({
                          name: member.name,
                          role: member.role,
                          url: member.portfolioUrl,
                        })
                      }
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FFB6D9] via-[#E5D4FF] to-[#C2FFE5] text-[#0D0B14] font-extrabold text-xs flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-xl shadow-[#FFB6D9]/20"
                    >
                      <Globe className="w-4 h-4" />
                      <span>Preview Interactive Portfolio</span>
                    </button>

                    <a
                      href={member.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl glass-card border border-white/15 text-gray-300 hover:text-white hover:border-[#FFB6D9] text-xs font-bold flex items-center justify-center gap-2 transition-all"
                    >
                      <span>Open {member.name.split(' ')[0]}'s Portfolio in New Tab</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#FFB6D9]" />
                    </a>
                  </>
                ) : (
                  <button
                    onClick={() =>
                      setActivePortfolio({
                        name: member.name,
                        role: member.role,
                        url: '',
                      })
                    }
                    className="w-full py-3.5 rounded-2xl glass-card border border-white/10 text-xs font-bold text-gray-300 flex items-center justify-center gap-2 hover:text-white hover:border-[#FFB6D9] transition-all"
                  >
                    <Award className="w-4 h-4 text-[#C2FFE5]" />
                    <span>Executive Showcase</span>
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Ultra High Z-Index Full-Screen Portfolio Showcase Overlay (z-[9999] covers Soul Media Navbar) */}
      <AnimatePresence>
        {activePortfolio && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] bg-[#0D0B14] w-screen h-screen overflow-hidden"
          >
            {/* 100% Full Unobstructed Viewport iFrame */}
            <div className="w-full h-full relative bg-[#0D0B14]">
              {activePortfolio.url ? (
                <iframe
                  src={activePortfolio.url}
                  title={`${activePortfolio.name} Portfolio`}
                  className="w-full h-full border-0 block"
                  loading="eager"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#0D0B14]">
                  <Sparkles className="w-20 h-20 text-[#FFB6D9] mb-6 opacity-80 animate-pulse" />
                  <h3 className="text-3xl font-black text-white mb-3">
                    {activePortfolio.name}'s Executive Portfolio Showcase
                  </h3>
                  <p className="text-base text-gray-300 max-w-lg mb-8 leading-relaxed">
                    Direct showcase portfolio link will be active here shortly. Connect directly with the executive team for custom presentation decks.
                  </p>
                  <button
                    onClick={() => setActivePortfolio(null)}
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-[#FFB6D9] to-[#E5D4FF] text-[#0D0B14] font-extrabold text-sm hover:scale-105 transition-all"
                  >
                    Return to Soul Media Website
                  </button>
                </div>
              )}
            </div>

            {/* Floating Island Navigation Control Bar (Anchored at Bottom-Center - Completely Free of Soul Media Navbar) */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[10000] flex items-center gap-3 p-2.5 rounded-full glass-card border border-[#FFB6D9]/40 bg-[#0D0B14]/95 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.9)]">
              {/* Primary Action Button: Return to Soul Media */}
              <button
                onClick={() => setActivePortfolio(null)}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FFB6D9] via-[#E5D4FF] to-[#C2FFE5] text-[#0D0B14] font-black text-xs sm:text-sm flex items-center gap-2.5 hover:shadow-[0_0_30px_rgba(255,182,217,0.7)] transition-all transform hover:scale-105 active:scale-95"
              >
                <ArrowLeft className="w-4 h-4 stroke-[3]" />
                <span>Return to Soul Media</span>
              </button>

              {/* Title Indicator */}
              <div className="hidden sm:flex items-center gap-2 px-3 border-l border-white/20 text-xs font-bold text-gray-200">
                <span className="w-2 h-2 rounded-full bg-[#C2FFE5] animate-pulse" />
                <span>{activePortfolio.name}</span>
              </div>

              {/* External Tab Launch Button */}
              {activePortfolio.url && (
                <a
                  href={activePortfolio.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-full glass-card border border-white/20 text-xs font-bold text-gray-200 hover:text-white hover:border-[#FFB6D9] flex items-center gap-1.5 transition-all"
                  title={`Open ${activePortfolio.name.split(' ')[0]}'s site in a new tab`}
                >
                  <span className="hidden md:inline">Open {activePortfolio.name.split(' ')[0]}'s Portfolio in New Tab</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#FFB6D9]" />
                </a>
              )}

              {/* Exit Button */}
              <button
                onClick={() => setActivePortfolio(null)}
                className="p-3 rounded-full bg-white/10 hover:bg-red-500/20 text-gray-300 hover:text-red-400 border border-white/15 transition-all"
                title="Close overlay"
                aria-label="Close Portfolio"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
