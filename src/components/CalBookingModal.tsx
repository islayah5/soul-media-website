import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Sparkles, ExternalLink } from 'lucide-react';

interface CalBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillName?: string;
  prefillEmail?: string;
  scopeSummary?: string;
}

export const CalBookingModal: React.FC<CalBookingModalProps> = ({
  isOpen,
  onClose,
  prefillName = '',
  prefillEmail = '',
  scopeSummary = '',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Build pre-filled Cal.com booking URL
  const baseUrl = 'https://cal.com/soul-media/30min';
  const queryParams = new URLSearchParams();
  if (prefillName) queryParams.set('name', prefillName);
  if (prefillEmail) queryParams.set('email', prefillEmail);
  if (scopeSummary) queryParams.set('notes', scopeSummary);
  
  const bookingUrl = `${baseUrl}?${queryParams.toString()}`;

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        key="cal-booking-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[999999] bg-[#0D0B14]/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden"
      >
        {/* Main Modal Card */}
        <div className="w-full max-w-4xl h-[90vh] glass-card rounded-3xl border border-[#FF94C7]/40 shadow-2xl flex flex-col bg-[#1A0C18]/95 relative overflow-hidden text-white">
          {/* Background Ambient Glow Halos */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#FF94C7]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#99FFE0]/15 blur-3xl pointer-events-none" />

          {/* Modal Header Bar */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between shrink-0 relative z-10 bg-[#10080F]/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FF94C7]/20 border border-[#FF94C7]/40 flex items-center justify-center text-[#FF94C7]">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-black text-[#99FFE0] uppercase tracking-widest">
                  <Sparkles className="w-3 h-3 text-[#99FFE0]" />
                  <span>Executive Calendar — Cal.com Sync</span>
                </div>
                <h3 className="text-lg font-black text-white">Book Your 30-Min Strategy Call</h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full glass-card border border-white/20 text-xs font-bold text-gray-200 hover:text-white hover:border-[#FF94C7] transition-all cursor-pointer"
                title="Open in new browser tab"
              >
                <span>Open in New Tab</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#FF94C7]" />
              </a>

              <button
                onClick={onClose}
                className="p-2 sm:px-4 sm:py-2 rounded-full bg-white/10 hover:bg-red-500/20 border border-white/20 text-gray-200 hover:text-red-400 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                aria-label="Close Calendar"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Close</span>
              </button>
            </div>
          </div>

          {/* Cal.com Embed Viewport */}
          <div className="flex-grow w-full relative bg-[#10080F]">
            <iframe
              src={bookingUrl}
              title="Cal.com Executive Strategy Booking"
              className="w-full h-full border-0 block bg-[#10080F]"
              loading="eager"
              allow="camera; microphone; autoplay; clipboard-write;"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};
