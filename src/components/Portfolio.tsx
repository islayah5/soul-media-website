import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ExternalLink, X } from 'lucide-react';

export const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState<{ title: string; category: string; metric: string } | null>(null);

  // Prevent background page scrolling when video lightbox is open
  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedVideo]);

  const categories = ['All', 'Video Production', 'Brand Strategy', 'Social Campaigns', 'Web & Tech'];

  const projects = [
    {
      title: 'Aura Fitness Commercial',
      category: 'Video Production',
      metric: 'Featured Campaign',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
      description: 'Cinematic 4K brand film shot on location with custom sound design and dynamic speed ramping.',
    },
    {
      title: 'Velvet Horizon Rebrand',
      category: 'Brand Strategy',
      metric: 'Brand Identity',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      description: 'Complete brand positioning, visual design system, and executive marketing guidelines.',
    },
    {
      title: 'Luxe Lifestyle Campaign',
      category: 'Social Campaigns',
      metric: 'Social Series',
      image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1000&q=80',
      description: 'High-volume short-form content system with targeted ad creative testing.',
    },
    {
      title: 'Apex Tech Portal',
      category: 'Web & Tech',
      metric: '3D Web Build',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80',
      description: 'High-speed React web experience with interactive 3D modeling and smart lead pipelines.',
    },
    {
      title: 'Neon Pulse Documentary',
      category: 'Video Production',
      metric: 'Behind the Scenes',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1000&q=80',
      description: 'Behind-the-scenes studio production mini-doc with raw audio mastering and color grading.',
    },
    {
      title: 'Urban Kinetic Fashion',
      category: 'Social Campaigns',
      metric: 'Ad Creative Suite',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
      description: 'Multi-variant TikTok & Meta ad creative scaling campaign for streetwear brand.',
    },
  ];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="py-28 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-[#E5D4FF] mb-3 block"
          >
            Creative Showcase
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6"
          >
            Featured Client <br />
            <span className="gradient-text">Case Studies & Creative</span>
          </motion.h2>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeFilter === cat
                    ? 'bg-gradient-to-r from-[#FFB6D9] to-[#E5D4FF] text-[#0D0B14] shadow-lg scale-105'
                    : 'glass-card text-gray-300 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="glass-card glass-card-hover rounded-3xl overflow-hidden border border-white/10 group flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail Container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-black">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B14] via-transparent to-transparent opacity-60" />

                    {/* Play / Inspect Overlay */}
                    <button
                      onClick={() => setSelectedVideo(project)}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <div className="w-14 h-14 rounded-full bg-[#FFB6D9] text-[#0D0B14] flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                    </button>

                    {/* Category Tag */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-[#FFB6D9] uppercase tracking-wider border border-white/10">
                      {project.category}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <div className="text-xs font-bold text-[#C2FFE5] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#C2FFE5] animate-pulse" />
                      <span>{project.metric}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#FFB6D9] transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <button
                    onClick={() => setSelectedVideo(project)}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-200 flex items-center justify-center gap-2 transition-all"
                  >
                    <span>View Case Details</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card max-w-2xl w-full p-8 rounded-3xl border border-[#FFB6D9]/40 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:text-[#FFB6D9]"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-xs font-bold uppercase tracking-widest text-[#FFB6D9] mb-2 block">
                {selectedVideo.category}
              </span>

              <h3 className="text-3xl font-extrabold text-white mb-3">
                {selectedVideo.title}
              </h3>

              <div className="p-3 rounded-xl bg-[#C2FFE5]/15 border border-[#C2FFE5]/30 text-[#C2FFE5] text-xs font-bold mb-6 inline-block">
                Focus Area: {selectedVideo.metric}
              </div>

              <div className="aspect-video rounded-2xl bg-black/60 border border-white/10 flex items-center justify-center mb-6 relative overflow-hidden">
                <div className="text-center p-6">
                  <Play className="w-16 h-16 text-[#FFB6D9] mx-auto mb-3 opacity-80" />
                  <p className="text-xs text-gray-400">Cinematic Reel Showcase Active</p>
                </div>
              </div>

              <div className="flex justify-end">
                <a
                  href="#quote-builder"
                  onClick={() => setSelectedVideo(null)}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FFB6D9] to-[#E5D4FF] text-[#0D0B14] font-bold text-xs"
                >
                  Book Similar Campaign
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
