import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=2000",
    title: "Empower Communities",
    desc: "Join local initiatives to provide education and resources to those who need it most.",
  },
  {
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=2000",
    title: "Care for the Environment",
    desc: "Participate in global cleanup campaigns and sustainability projects.",
  },
  {
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=2000",
    title: "Support Animal Welfare",
    desc: "Help give shelter and medical care to animals in rescue centers worldwide.",
  }
];

export default function Banner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden bg-neutral">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          />
          <div className="absolute inset-0 bg-base-900/60 transition-colors duration-500 bg-opacity-60 bg-black/50" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-md"
            >
              {slides[current].title}
            </motion.h1>
            <motion.p 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.5, duration: 0.8 }}
               className="text-lg md:text-2xl text-white/90 max-w-2xl font-medium drop-shadow-sm mb-10"
            >
              {slides[current].desc}
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
               <Link to="/all-posts" className="btn btn-primary btn-lg rounded-full px-10 shadow-xl border-none text-white font-bold">
                 Find Opportunities
               </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === current ? "bg-primary w-8" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
