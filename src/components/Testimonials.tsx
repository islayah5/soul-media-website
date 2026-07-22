import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "Soul Media transformed our entire content strategy. Joe's video production quality is Hollywood-grade, and Isaiah's pipeline delivered 24 videos a month without us lifting a finger.",
      clientName: "Marcus Vance",
      company: "CEO, Vanguard Fitness",
      result: "+4.8M Organic Views in 60 Days",
      rating: 5,
    },
    {
      quote: "Jada and her team understood our brand core better than we did. Their positioning and campaign execution brought us $380k in trackable new revenue within our first quarter.",
      clientName: "Elena Rostova",
      company: "Founder, Luxe Skincare Co.",
      result: "3.8x ROAS on Meta & TikTok",
      rating: 5,
    },
    {
      quote: "Working with Soul Media felt like having an elite $50k/month in-house media team. They set up our remote SMM and handled all video shoots flawlessly.",
      clientName: "David Sterling",
      company: "Managing Director, Sterling Capital",
      result: "Retainer Extended 2 Years",
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-28 px-6 relative z-10 bg-[#0A0810]/40">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-[#FFB6D9] mb-3 block"
          >
            Client Endorsements
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold mb-4"
          >
            Trusted by Brands That <br />
            <span className="gradient-text">Demand Perfection</span>
          </motion.h2>
        </div>

        {/* Testimonial Card Slider */}
        <div className="glass-card rounded-3xl p-8 sm:p-14 border border-[#FFB6D9]/30 relative shadow-2xl overflow-hidden">
          <Quote className="w-20 h-20 text-[#FFB6D9]/10 absolute -top-4 -left-4 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 flex flex-col justify-between min-h-[220px]"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex gap-1 mb-6 text-[#FFB6D9]">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>

                {/* Quote Body */}
                <p className="text-xl sm:text-2xl text-gray-100 font-medium leading-relaxed mb-8 italic">
                  "{testimonials[currentIndex].quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-white/10 pt-6 gap-4">
                <div>
                  <h4 className="text-lg font-extrabold text-white">
                    {testimonials[currentIndex].clientName}
                  </h4>
                  <span className="text-xs text-gray-400">
                    {testimonials[currentIndex].company}
                  </span>
                </div>

                <div className="px-3.5 py-1.5 rounded-full bg-[#C2FFE5]/15 border border-[#C2FFE5]/30 text-[#C2FFE5] text-xs font-bold">
                  {testimonials[currentIndex].result}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav Buttons */}
          <div className="flex items-center gap-3 absolute bottom-6 right-6 z-20">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full glass-card text-white hover:text-[#FFB6D9] border border-white/20 transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full glass-card text-white hover:text-[#FFB6D9] border border-white/20 transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
