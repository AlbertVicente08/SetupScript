"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useRef } from "react";

export default function DemoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <section id="demo" className="py-24 px-6 bg-[#050505]">
      <div className="mx-auto max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-white mb-4">
            See it in action
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12">
            From zero to fully configured PC in under 2 minutes
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mx-auto max-w-[900px] aspect-video rounded-xl overflow-hidden border border-neon-red/20 shadow-[0_0_50px_rgba(255,26,26,0.1)] bg-[#0a0a0a] group cursor-pointer"
          onClick={handlePlay}
        >
          {/* Video Element */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            controls={false}
            playsInline
            /* TODO: replace with real video src */
            // src="/demo.mp4" 
          />

          {/* Overlay / Placeholder Play Button */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/30 transition-colors">
            <div className="h-20 w-20 rounded-full bg-neon-red/90 flex items-center justify-center pl-1 shadow-[0_0_30px_rgba(255,26,26,0.4)] transition-transform duration-300 group-hover:scale-110">
              <Play className="h-8 w-8 text-white fill-current" />
            </div>
          </div>
          
          {/* Scanlines effect overlay */}
          <div className="absolute inset-0 pointer-events-none bg-[url('/scanlines.png')] opacity-10 mix-blend-overlay" />
        </motion.div>
      </div>
    </section>
  );
}
