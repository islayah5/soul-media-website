import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Cpu, Users, Zap } from 'lucide-react';

export const About: React.FC = () => {
  const pillars = [
    {
      title: 'High-Impact Cinematic Shoots',
      description: 'We capture your brand at its highest visual standard. Directed by seasoned cinematographers and photographers, every shot is engineered to command attention.',
      icon: Camera,
      badge: 'Production Excellence',
      color: 'from-[#FFB6D9] to-[#FF80BF]',
    },
    {
      title: 'Automated Post-Production Pipelines',
      description: 'We turn master film footage into high-volume content engines using custom editing setups and modern tools—ensuring fast turnaround without compromising quality.',
      icon: Cpu,
      badge: 'Scalable Systems',
      color: 'from-[#E5D4FF] to-[#B892FF]',
    },
    {
      title: 'Hybrid Scale & Sourcing Engine',
      description: 'We eliminate overpriced agency overhead. Get dedicated offshore social media managers and video editors vetted by us, directly integrated into your business.',
      icon: Users,
      badge: 'Enterprise Efficiency',
      color: 'from-[#FFD4C2] to-[#C2FFE5]',
    },
  ];

  return (
    <section id="about" className="py-28 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-[#FFB6D9] mb-3 block"
          >
            The Soul Media Advantage
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6"
          >
            Built Differently for <br />
            <span className="gradient-text">Modern Agency Scale</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-lg sm:text-xl font-normal leading-relaxed"
          >
            Traditional agencies charge exorbitant fees for slow turnaround and outsourced junior labor. We deliver executive strategy, top-tier production, and scalable systems built for real ROI.
          </motion.p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="glass-card glass-card-hover rounded-3xl p-8 border border-white/10 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <pillar.icon className="w-24 h-24 text-white" />
              </div>

              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#FFB6D9] mb-6">
                  <Zap className="w-3.5 h-3.5" />
                  <span>{pillar.badge}</span>
                </div>

                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.color} p-0.5 mb-6 shadow-lg`}>
                  <div className="w-full h-full bg-[#0D0B14] rounded-[14px] flex items-center justify-center text-white">
                    <pillar.icon className="w-7 h-7 text-[#FFB6D9]" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#FFB6D9] transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-gray-300 text-base leading-relaxed mb-6">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
