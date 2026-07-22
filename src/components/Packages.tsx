import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, ShieldCheck, Film, Share2, Box } from 'lucide-react';

export const Packages: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'production' | 'full' | 'tech'>('production');

  const categories = [
    { id: 'production', label: 'Filming & Post-Production Only', icon: Film },
    { id: 'full', label: 'Full Retainer & Social Management', icon: Share2 },
    { id: 'tech', label: 'Web, 3D & Tech Automations', icon: Box },
  ];

  const packagesData = {
    production: [
      {
        name: 'Post-Production Core',
        tagline: 'Ideal for brands providing raw footage needing master editing and sound design.',
        price: '2,200',
        badge: 'Editing Suite',
        features: [
          '12 High-Impact Edited Short-Form Videos / Reels',
          'Master Sound Design, Color Grading & Hook Graphics',
          'Script & Framing Guidance for Internal Shoots',
          'Multi-Platform Delivery (IG Reels, TikTok, YouTube Shorts)',
          'Graphic Design Asset Add-ons Available',
        ],
        popular: false,
      },
      {
        name: 'Filming & Edit Engine',
        tagline: 'Our premier production tier pairing cinematic filming with high-volume editing.',
        price: '4,500',
        badge: 'Most Popular',
        features: [
          'On-Location Cinematic Shoot (Free within 3h of Tampa Bay)',
          '24 Short-Form Videos + Commercial Cut',
          'Lifestyle, People & Studio Product Photography',
          '3D Modeling & Product Render Integration',
          'Graphic Design Package for Campaign Collateral',
          'Raw & Edited File Delivery with Commercial License',
        ],
        popular: true,
      },
      {
        name: 'Commercial Production Takeover',
        tagline: 'Multi-day filming, studio product shoots, 3D modeling, and unlimited edits.',
        price: '8,500',
        badge: 'Full Production Suite',
        features: [
          'Multi-Day On-Location Filming & Studio Product Shoots',
          'Unlimited Post-Production & Color Grading Suite',
          'Full 3D Product Modeling & Interactive Renders',
          'Complete Brand Graphic Design Package & Banners',
          'Priority Expedited Turnaround & Raw Footage Archive',
          'Direct Access to Founders & Directors',
        ],
        popular: false,
      },
    ],
    full: [
      {
        name: 'Starter Retainer',
        tagline: 'High-quality edited content paired with intentional social calendar management.',
        price: '3,200',
        badge: 'Social & Edit',
        features: [
          '12 High-Impact Edited Reels & Videos',
          'Intentional Social Calendar Scheduling & Publishing',
          'Community Voice Engagement & DM Management',
          'Monthly Performance & Growth Review',
          'Brand Graphic Design Templates',
        ],
        popular: false,
      },
      {
        name: 'Scale Growth Retainer',
        tagline: 'Complete media coverage: Filming, 3D assets, Editing, and Social Strategy.',
        price: '6,200',
        badge: 'Flagship Retainer',
        features: [
          'On-Location Filming (3h Tampa Bay Radius / Remote)',
          '24 Short-Form Videos + Commercial Cuts',
          'Ad Creative Production & Strategy Suite',
          'Full Social Calendar Scheduling & Community Voice',
          'Talent Sourcing & Training Advisory (In-House Employee)',
          'Graphic Design & Marketing Collateral Suite',
        ],
        popular: true,
      },
      {
        name: 'Enterprise Media Takeover',
        tagline: 'Full media department replacement with custom tech setup and talent sourcing.',
        price: '11,500',
        badge: 'Executive Retainer',
        features: [
          'Unlimited Filming, 3D Modeling & Post-Production',
          'Full Social Media Takeover & Community Management',
          'In-House SMM / Editor Recruiting & Training Setup',
          'Custom Web Experience & Smart Automation Engine',
          'Event Marketing Coverage & Specialist Network',
          'Executive Board-Level Strategy & Advisory',
        ],
        popular: false,
      },
    ],
    tech: [
      {
        name: 'Modern Web Experience',
        tagline: 'High-speed bespoke web build tailored to reflect your brand identity.',
        price: '3,500',
        badge: 'Web Build',
        features: [
          'Custom Responsive Web Design & Development',
          'High-Speed Asset Optimization & Fast Load Times',
          'SEO & Open-Graph Social Share Setup',
          'Contact & Lead Capture Form Integration',
          'Cost-Effective Modern Tooling (No Overpriced Software)',
        ],
        popular: false,
      },
      {
        name: 'Interactive 3D & Automation Suite',
        tagline: 'Custom website featuring 3D model renders and smart workflow pipelines.',
        price: '6,800',
        badge: 'Most Popular',
        features: [
          'Interactive 3D Model Canvas & Product Render Integration',
          'Custom Interactive Scope / Calculator Widget Build',
          'Smart Lead & Workflow Automation Pipelines',
          'Brand Graphic Design & Custom Iconography Kit',
          'CRM, Email Marketing & Analytics Integration',
          'Ongoing Tech Support & Maintenance Option',
        ],
        popular: true,
      },
      {
        name: 'Custom Digital Architecture',
        tagline: 'Full web portal, 3D asset pipeline, and automated operational ecosystem.',
        price: '12,000+',
        badge: 'Custom Architecture',
        features: [
          'Full Digital Web Ecosystem & Custom Portals',
          'Multi-Asset 3D Render Pipelines & Canvas Shaders',
          'Automated Internal Business Operations Setup',
          'Employee & AI Operational Flow Pipelines',
          'Dedicated Tech Lead & Priority SLAs',
          'Turnkey Handoff & Team Training Session',
        ],
        popular: false,
      },
    ],
  };

  return (
    <section id="packages" className="py-28 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-[#FFB6D9] mb-3 block"
          >
            Transparent Investment
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6"
          >
            Flexible Service <br />
            <span className="gradient-text">Packages & Retainers</span>
          </motion.h2>

          <p className="text-gray-300 text-base sm:text-lg mb-10">
            Choose between Filming & Production Only, Full Social Management, or Custom 3D Web & Tech Solutions.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 glass-card p-2 rounded-full border border-white/10 max-w-2xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-5 py-3 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-[#FFB6D9] to-[#E5D4FF] text-[#0D0B14] shadow-lg scale-105'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <cat.icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
          >
            {packagesData[activeCategory].map((tier, index) => (
              <div
                key={index}
                className={`glass-card rounded-3xl p-8 border flex flex-col justify-between relative transition-all duration-300 ${
                  tier.popular
                    ? 'border-[#FFB6D9] bg-[#1A142D]/80 shadow-2xl shadow-[#FFB6D9]/20 lg:-translate-y-2'
                    : 'border-white/10 hover:border-white/25'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#FFB6D9] to-[#E5D4FF] text-[#0D0B14] text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-lg">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{tier.badge}</span>
                  </div>
                )}

                <div>
                  <div className="mb-6">
                    <span className="text-xs font-bold text-[#FFB6D9] uppercase tracking-wider block mb-1">
                      {tier.badge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                      {tier.name}
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm min-h-[40px]">
                      {tier.tagline}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-8 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-white">
                      ${tier.price}
                    </span>
                    <span className="text-gray-400 text-xs sm:text-sm">
                      {activeCategory === 'tech' ? 'one-time / project' : '/ month'}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    {tier.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-200">
                        <Check className="w-4 h-4 text-[#FFB6D9] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <a
                    href="#quote-builder"
                    className={`w-full py-4 rounded-2xl font-bold text-center block transition-all ${
                      tier.popular
                        ? 'bg-gradient-to-r from-[#FFB6D9] to-[#E5D4FF] text-[#0D0B14] shadow-xl hover:shadow-[#FFB6D9]/30 hover:scale-[1.02]'
                        : 'glass-card border border-white/20 text-white hover:bg-white/10 hover:border-[#FFB6D9]'
                    }`}
                  >
                    Select {tier.name}
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Custom Scope Note */}
        <div className="mt-16 text-center glass-card p-6 rounded-2xl max-w-3xl mx-auto border border-white/10 flex items-center justify-center gap-3">
          <ShieldCheck className="w-6 h-6 text-[#C2FFE5] shrink-0" />
          <p className="text-xs sm:text-sm text-gray-300">
            Need a custom combination of filming, 3D modeling, or tech automation? Use our{' '}
            <a href="#quote-builder" className="text-[#FFB6D9] underline font-semibold">
              Interactive Scope Engine below
            </a>{' '}
            to build a custom scope.
          </p>
        </div>
      </div>
    </section>
  );
};
