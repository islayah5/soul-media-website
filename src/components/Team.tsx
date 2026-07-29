import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Sparkles, Cpu, ExternalLink, X, Globe, Award, ArrowLeft, Play, Film } from 'lucide-react';

import jadaHeadshot from '../assets/Jada_Brown-Headshot-Master.jpg';
import isaiahHeadshot from '../assets/Isaiah_Chandler-Headshot-Master.jpg';
import joeHeadshot from '../assets/Joe_Irizarry-Headshot-Master.jpg';
import joePortfolioAvatar from '../assets/joe-portfolio-avatar.jpg';

import glassCamera from '../assets/glass-3d-camera.png';
import glassPlayer from '../assets/glass-3d-videoplayer.png';
import glassKeyboard from '../assets/glass-3d-keyboard.png';
import glassStars from '../assets/glass-3d-stars.png';
import glassStylus from '../assets/glass-3d-stylus.png';
import glassFilmstrip from '../assets/glass-3d-filmstrip.png';

import thumbValentino from '../assets/thumb-valentino.png';
import thumbErin from '../assets/thumb-erin-riley.png';
import thumbWedding from '../assets/thumb-wedding.png';

const JOE_FILMS = [
  {
    id: 'aGWfZi0ZzJM',
    title: 'Valentino Ristorante Italiano',
    category: 'Brand Film & Website Banner',
    description: 'A luxurious website video banner created for Valentino’s, blending high fashion with cinematic storytelling to elevate the brand’s digital presence.',
    thumbnail: thumbValentino,
  },
  {
    id: 'c4R-nmzX5e4',
    title: 'Erin & Riley Testimonial (Dragonfly)',
    category: 'Documentary Storytelling',
    description: 'An emotional testimonial video capturing Erin & Riley’s story through heartfelt narrative and cinematic visuals.',
    thumbnail: thumbErin,
  },
  {
    id: 'A1OlQdrAYIY',
    title: 'Cinematic Wedding Teaser',
    category: 'Cinematic Short Film',
    description: 'A cinematic wedding teaser that weaves together intimate moments and grand emotions in a visually striking short film.',
    thumbnail: thumbWedding,
  },
];

export const Team: React.FC = () => {
  const [activePortfolio, setActivePortfolio] = useState<{
    name: string;
    role: string;
    subRole?: string;
    url: string;
    image?: string;
  } | null>(null);

  const [activeJoeFilm, setActiveJoeFilm] = useState(JOE_FILMS[0]);

  // Lock background page scroll and set modal open attribute on body
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
      glassElement: glassPlayer,
      secondaryGlassElement: glassStars,
      glassPosition: 'top-[-18px] right-[-18px] w-36 h-36 sm:w-40 sm:h-40',
      secondaryGlassPosition: 'left-[-8px] bottom-[12px] w-32 h-32',
      bgGradient: 'radial-gradient(ellipse at 50% 30%, #4D183B 0%, #240C1B 55%, #12050E 100%)',
      icon: Sparkles,
      color: 'from-[#FF94C7] to-[#D83685]',
      glowColor: 'rgba(255, 148, 199, 0.45)',
      badge: 'Agency Founder',
      portfolioUrl: '', // Ready for Jada's portfolio URL
    },
    {
      name: 'Isaiah Chandler',
      role: 'Systems & Operations Director',
      subRole: 'Growth & Automation Strategist',
      bio: 'Operations mastermind architecting scalable post-production workflows, 3D web modeling, automated editing pipelines, and cost-effective remote talent integration for seamless client growth.',
      image: isaiahHeadshot,
      glassElement: glassKeyboard,
      secondaryGlassElement: glassStylus,
      glassPosition: 'top-[-22px] right-[-22px] w-32 h-32 sm:w-36 sm:h-36',
      secondaryGlassPosition: 'left-[-18px] bottom-[26px] w-36 h-36',
      bgGradient: 'radial-gradient(ellipse at 50% 30%, #381A5E 0%, #1A0A2F 55%, #0B0415 100%)',
      icon: Cpu,
      color: 'from-[#D4B8FF] to-[#7C3AED]',
      glowColor: 'rgba(212, 184, 255, 0.45)',
      badge: 'Ops & Tech Lead',
      portfolioUrl: 'https://isaiah-chandler.netlify.app/',
    },
    {
      name: 'Joe Irizarry',
      role: 'Director of Photography & Videography',
      subRole: 'Lead Visual Editor',
      bio: 'Master lensman and editor orchestrating high-impact commercial video shoots, studio photography, cinematic cuts, and the signature visual styling that sets Soul Media apart.',
      image: joeHeadshot,
      glassElement: glassCamera,
      secondaryGlassElement: glassFilmstrip,
      glassPosition: 'top-[-26px] right-[-26px] w-36 h-36 sm:w-40 sm:h-40',
      secondaryGlassPosition: 'left-[-18px] bottom-[26px] w-36 h-36',
      bgGradient: 'radial-gradient(ellipse at 50% 30%, #164652 0%, #0A2228 55%, #040E11 100%)',
      icon: Camera,
      color: 'from-[#99FFE0] to-[#059669]',
      glowColor: 'rgba(153, 255, 224, 0.45)',
      badge: 'Production Engine',
      portfolioUrl: 'https://framesbyirizarry.com/',
    },
  ];

  // Modal Portal Element rendered at top-level document.body
  const renderModalPortal = () => {
    if (!activePortfolio) return null;

    return ReactDOM.createPortal(
      <AnimatePresence>
        <motion.div
          key="portfolio-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[99999] bg-[#0D0B14] w-screen h-screen flex flex-col overflow-hidden"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {/* Top Control Header Bar (High Visibility & Zero Clipping) */}
          <div className="h-16 px-4 sm:px-8 bg-[#0D0B14] border-b border-[#FFB6D9]/30 flex items-center justify-between shrink-0 relative z-[100000] shadow-2xl">
            {/* Left Action: Return to Soul Media */}
            <button
              onClick={() => setActivePortfolio(null)}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FF94C7] via-[#D4B8FF] to-[#99FFE0] text-[#0D0B14] font-black text-xs sm:text-sm flex items-center gap-2 hover:shadow-[0_0_25px_rgba(255,182,217,0.8)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 stroke-[3]" />
              <span>Return to Soul Media</span>
            </button>

            {/* Center Title Indicator */}
            <div className="hidden md:flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#99FFE0] animate-pulse" />
              <h4 className="text-sm font-bold text-white tracking-wide">
                {activePortfolio.name} <span className="text-[#FF94C7]">— {activePortfolio.role}</span>
              </h4>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {activePortfolio.url && (
                <a
                  href={activePortfolio.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-card border border-white/25 text-xs font-bold text-gray-200 hover:text-white hover:border-[#FF94C7] transition-all cursor-pointer"
                  title={`Open ${activePortfolio.name.split(' ')[0]}'s site in a new tab`}
                >
                  <span className="hidden sm:inline">Open {activePortfolio.name.split(' ')[0]}'s Portfolio in New Tab</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#FF94C7]" />
                </a>
              )}
              <button
                onClick={() => setActivePortfolio(null)}
                className="p-2 sm:px-4 sm:py-2 rounded-full bg-white/10 hover:bg-red-500/20 border border-white/20 text-gray-200 hover:text-red-400 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                aria-label="Close Showcase"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Close</span>
              </button>
            </div>
          </div>

          {/* Viewport Container: Handles CSP-blocked external sites gracefully with Native Cinema Theatre Showcase */}
          <div className="flex-grow w-full h-[calc(100vh-64px)] relative bg-[#0D0B14] overflow-y-auto">
            {activePortfolio.url && !activePortfolio.url.includes('framesbyirizarry.com') ? (
              <iframe
                src={activePortfolio.url}
                title={`${activePortfolio.name} Portfolio`}
                className="w-full h-full border-0 block bg-[#0D0B14]"
                loading="eager"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            ) : (
              <div className="w-full min-h-full flex flex-col items-center justify-center p-4 sm:p-8 text-center bg-[#10080F] overflow-y-auto">
                <div className="max-w-5xl mx-auto glass-card rounded-3xl p-6 sm:p-10 border border-[#059669]/40 shadow-2xl relative overflow-hidden my-auto bg-[#1A0C18]/90 text-white">
                  {/* Background ambient glow halos */}
                  <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#059669]/20 blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#99FFE0]/15 blur-3xl pointer-events-none" />

                  {/* Header Bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10 text-left">
                    <div className="flex items-center gap-4">
                      {activePortfolio.image && (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#99FFE0] shadow-xl flex-shrink-0 bg-black">
                          <img
                            src={activePortfolio.name.includes('Joe') ? joePortfolioAvatar : activePortfolio.image}
                            alt={activePortfolio.name}
                            className={`w-full h-full object-cover ${activePortfolio.name.includes('Joe') ? 'object-center scale-100' : 'scale-[1.57] origin-[center_41%]'}`}
                          />
                        </div>
                      )}
                      <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#059669]/20 border border-[#059669]/40 text-[10px] sm:text-xs font-black text-[#99FFE0] mb-1">
                          <Film className="w-3 h-3 text-[#99FFE0]" />
                          <span>Executive Director Showcase</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                          {activePortfolio.name}
                        </h3>
                        <p className="text-xs font-bold text-[#99FFE0]/90 uppercase tracking-widest">
                          {activePortfolio.role}
                        </p>
                      </div>
                    </div>

                    {/* External Site Button */}
                    {activePortfolio.url && (
                      <a
                        href={activePortfolio.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 rounded-full bg-[#059669] hover:bg-[#047857] text-white font-black text-xs flex items-center gap-2 transition-all shadow-lg hover:scale-105 cursor-pointer"
                      >
                        <span>Launch framesbyirizarry.com</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  {/* Featured Cinema Player Viewport */}
                  <div className="mb-8">
                    <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-black relative">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${activeJoeFilm.id}?autoplay=1&rel=0`}
                        title={activeJoeFilm.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-left">
                      <div>
                        <span className="text-[10px] font-black text-[#99FFE0] uppercase tracking-widest">{activeJoeFilm.category}</span>
                        <h4 className="text-lg font-black text-white">{activeJoeFilm.title}</h4>
                      </div>
                      <p className="text-xs text-white/70 font-medium max-w-md">{activeJoeFilm.description}</p>
                    </div>
                  </div>

                  {/* Film Selection Gallery (Interactive High-Res Thumbnails) */}
                  <div className="text-left mb-8">
                    <h5 className="text-xs font-black uppercase tracking-widest text-white/60 mb-3 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#99FFE0]" />
                      <span>Select Featured Film to Play</span>
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {JOE_FILMS.map((film) => {
                        const isSelected = activeJoeFilm.id === film.id;
                        return (
                          <button
                            key={film.id}
                            onClick={() => setActiveJoeFilm(film)}
                            className={`group relative rounded-2xl overflow-hidden border transition-all text-left cursor-pointer ${
                              isSelected
                                ? 'border-[#99FFE0] ring-2 ring-[#99FFE0]/50 scale-[1.02]'
                                : 'border-white/10 hover:border-white/30 opacity-80 hover:opacity-100'
                            }`}
                          >
                            <div className="aspect-video w-full relative overflow-hidden bg-black">
                              <img
                                src={film.thumbnail}
                                alt={film.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                              
                              {/* Play Badge */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                                  isSelected ? 'bg-[#99FFE0] text-black shadow-lg scale-110' : 'bg-black/60 text-white group-hover:bg-[#99FFE0] group-hover:text-black'
                                }`}>
                                  <Play className="w-4 h-4 fill-current ml-0.5" />
                                </div>
                              </div>

                              <div className="absolute bottom-2 left-2 right-2">
                                <span className="text-[9px] font-black text-[#99FFE0] uppercase tracking-wider block mb-0.5">{film.category}</span>
                                <p className="text-xs font-bold text-white line-clamp-1">{film.title}</p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                    <p className="text-xs font-medium text-white/60 italic">
                      "Stories that move people. Films that move brands." — Joe Irizarry
                    </p>
                    <button
                      onClick={() => setActivePortfolio(null)}
                      className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4 text-[#99FFE0]" />
                      <span>Return to Soul Media</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>,
      document.body
    );
  };

  return (
    <section id="team" className="py-28 px-6 relative z-10 bg-[#0A0810]/60">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-[#FF94C7] mb-3 block"
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
              className="glass-card glass-card-hover rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-between group relative"
            >
              <div>
                {/* 3D Glass Master Card Image Container */}
                <div
                  className="relative aspect-[4/5] overflow-hidden rounded-t-3xl"
                  style={{ background: member.bgGradient }}
                >
                  {/* Subtle Glow Halo on Hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none`}
                    style={{ filter: 'blur(30px)', transform: 'scale(1.1)' }}
                  />

                  {/* Master Pre-Framed Headshot Asset */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover relative z-10 transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Top-Right Primary 3D Glass Branded Object (Corner Positioned — Zero Face Overlap) */}
                  {member.glassElement && (
                    <motion.div
                      className={`absolute ${member.glassPosition || 'top-[-20px] right-[-20px] w-36 h-36'} opacity-85 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 pointer-events-none z-20 mix-blend-screen`}
                      animate={{ y: [0, -8, 0], rotate: [0, 3, -3, 0] }}
                      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <img
                        src={member.glassElement}
                        alt="Primary 3D Glass Element"
                        className="w-full h-full object-contain filter drop-shadow-[0_12px_28px_rgba(255,255,255,0.6)]"
                      />
                    </motion.div>
                  )}

                  {/* Bottom-Left Secondary 3D Glass Branded Object (Corner Positioned — Zero Face Overlap) */}
                  {member.secondaryGlassElement && (
                    <motion.div
                      className={`absolute ${member.secondaryGlassPosition || 'left-[-8px] bottom-[10px] w-32 h-32'} opacity-75 group-hover:opacity-100 group-hover:scale-115 transition-all duration-700 pointer-events-none z-20 mix-blend-screen`}
                      animate={{ y: [0, 8, 0], rotate: [0, -4, 4, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    >
                      <img
                        src={member.secondaryGlassElement}
                        alt="Secondary 3D Glass Element"
                        className="w-full h-full object-contain filter drop-shadow-[0_8px_20px_rgba(255,255,255,0.5)]"
                      />
                    </motion.div>
                  )}

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass-card border border-white/20 text-xs font-bold text-white flex items-center gap-1.5 shadow-lg z-30">
                    <member.icon className="w-3.5 h-3.5 text-[#99FFE0]" />
                    <span>{member.badge}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
                    {member.name}
                  </h3>
                  <span className="text-xs font-bold text-[#FF94C7] uppercase tracking-wider block mb-1">
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
                          subRole: member.subRole,
                          url: member.portfolioUrl,
                          image: member.image,
                        })
                      }
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FF94C7] via-[#D4B8FF] to-[#99FFE0] text-[#0D0B14] font-extrabold text-xs flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-xl shadow-[#FF94C7]/20 cursor-pointer"
                    >
                      <Globe className="w-4 h-4" />
                      <span>Preview Interactive Portfolio</span>
                    </button>

                    <a
                      href={member.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl glass-card border border-white/15 text-gray-300 hover:text-white hover:border-[#FF94C7] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <span>Open {member.name.split(' ')[0]}'s Portfolio in New Tab</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#FF94C7]" />
                    </a>
                  </>
                ) : (
                  <button
                    onClick={() =>
                      setActivePortfolio({
                        name: member.name,
                        role: member.role,
                        subRole: member.subRole,
                        url: '',
                        image: member.image,
                      })
                    }
                    className="w-full py-3.5 rounded-2xl glass-card border border-white/10 text-xs font-bold text-gray-300 flex items-center justify-center gap-2 hover:text-white hover:border-[#FF94C7] transition-all cursor-pointer"
                  >
                    <Award className="w-4 h-4 text-[#99FFE0]" />
                    <span>Executive Showcase</span>
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Render Modal via React Portal directly onto document.body */}
      {renderModalPortal()}
    </section>
  );
};
