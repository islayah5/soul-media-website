import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Video, Film, Code2, Users, MapPin, CheckCircle2, Box, Palette } from 'lucide-react';

export const Services: React.FC = () => {
  const services = [
    {
      title: 'Cinematic Filming & Photography',
      icon: Film,
      badge: 'Production Core',
      description: 'On-location directing, scripting, 4K video shoots, and photography tailored for people, lifestyle, and high-end physical products.',
      features: [
        'On-Site Directing & Creative Scripting',
        'People, Lifestyle & Commercial Video',
        'High-Resolution Product & Studio Photography',
        'Local Filming within 3 Hours of Tampa/Clearwater',
      ],
    },
    {
      title: 'Post-Production & Visual Editing',
      icon: Video,
      badge: 'Creative Engine',
      description: 'Master editing, color grading, sound design, and multi-platform formatting that turns raw footage into captivating social content.',
      features: [
        'High-Impact Short-Form Reel Editing',
        'Master Sound Design & Color Grading',
        'Custom Motion Graphics & Hook Styling',
        'High-Volume Multi-Platform Delivery',
      ],
    },
    {
      title: 'Graphic Design & Brand Assets',
      icon: Palette,
      badge: 'Visual Design',
      description: 'Custom commercial graphic design, social media assets, marketing collateral, pitch decks, merch graphics, and brand design packages.',
      features: [
        'Social Media Graphic Templates & Banners',
        'Pitch Decks & Investor Presentation Design',
        'Product Packaging & Merch Graphics',
        'Brand Style Guidelines & Visual Kits',
      ],
    },
    {
      title: 'Modern Web, 3D & Tech Solutions',
      icon: Box,
      badge: '3D & Automation',
      description: 'Bespoke web experiences featuring interactive 3D modeling, WebGL canvas elements, and smart workflow automation that bypass overpriced software.',
      features: [
        'Interactive 3D Web Models & Render Integration',
        'Custom High-Speed Web Experiences',
        'Smart Business & Workflow Automation Pipelines',
        'Cost-Effective Modern Tooling (No Overpriced Bloat)',
      ],
    },
    {
      title: 'Intentional Social Media Management',
      icon: Share2,
      badge: 'Community & Purpose',
      description: 'Purposeful content calendar planning and community engagement. We focus on authentic brand connection rather than posting just to post.',
      features: [
        'Strategic Content Scheduling & Publishing',
        'Audience Engagement & Community Voice',
        'Monthly Performance & Analytics Review',
        'Purpose-Driven Brand Messaging Strategy',
      ],
    },
    {
      title: 'Talent Sourcing & Training Advisory',
      icon: Users,
      badge: 'In-House Empowerment',
      description: 'We help you recruit, vet, and train dedicated in-house or remote SMMs and editors—empowering your team without agency markup.',
      features: [
        'Candidate Vetting & Skills Assessment',
        'Custom SOP & Best-Practices Training',
        'Direct Client Hiring (No Employer Liability)',
        'Ongoing Advisory & Secondary Training Options',
      ],
    },
  ];

  return (
    <section id="services" className="py-28 px-6 relative z-10 bg-[#0A0810]/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-[#E5D4FF] mb-3 block"
          >
            Capabilities & Solutions
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6"
          >
            Crafted for <br />
            <span className="gradient-text">Unrivaled Quality & Efficiency</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-lg sm:text-xl font-normal leading-relaxed"
          >
            We combine cinematic filming, master editing, interactive 3D web experiences, and graphic design to elevate your brand.
          </motion.p>
        </div>

        {/* Local Presence Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 glass-card p-6 rounded-3xl border border-[#FFB6D9]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFB6D9]/15 border border-[#FFB6D9]/30 flex items-center justify-center text-[#FFB6D9] shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-0.5">Tampa Bay & Clearwater Regional Coverage</h4>
              <p className="text-xs sm:text-sm text-gray-300">
                Located within a 3-hour radius of Tampa / Clearwater / St. Pete? We provide hands-on in-person consultation, on-site directing, and location shoots.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FFB6D9] to-[#E5D4FF] text-[#0D0B14] text-xs font-bold shrink-0 hover:scale-105 transition-transform"
          >
            Request Local Shoot
          </a>
        </motion.div>

        {/* Services Grid with Uniform Height Alignment */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card glass-card-hover rounded-3xl p-8 border border-white/10 flex flex-col justify-between h-full"
            >
              <div className="flex flex-col flex-grow">
                {/* Icon & Badge Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFB6D9]/15 border border-[#FFB6D9]/30 flex items-center justify-center text-[#FFB6D9] shadow-md shrink-0">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#FFB6D9]">
                    {service.badge}
                  </span>
                </div>

                {/* Title Container - Fixed Height for Uniform Alignment */}
                <div className="min-h-[64px] flex items-center mb-3">
                  <h3 className="text-2xl font-bold text-white leading-snug">
                    {service.title}
                  </h3>
                </div>

                {/* Description Container - Fixed Height for Uniform Alignment */}
                <div className="min-h-[72px] mb-6">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Features Checklist */}
                <div className="space-y-3 pt-5 border-t border-white/10 mt-auto">
                  {service.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5 text-xs text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-[#C2FFE5] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA Button - Pinned uniformly */}
              <div className="mt-8 pt-2">
                <a
                  href="#quote-builder"
                  className="w-full py-3 rounded-xl glass-card border border-white/10 text-xs font-bold text-center block text-gray-200 hover:text-white hover:border-[#FFB6D9] transition-all"
                >
                  Include in Custom Scope
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
