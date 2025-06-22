import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { translations } from '@/lib/translations';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language].hero;
  const commonT = translations[language].common;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const autoplayIntervalRef = useRef(null);

  const images = [
    { id: 'couple-portrait', description: 'Estelle et Matthieu souriant ensemble dans un champ fleuri.' },
    { id: 'venue-exterior', description: 'Vue extérieure du Domaine de Chaalis avec son architecture historique.' },
    { id: 'wedding-decoration-detail', description: 'Détail de décoration de mariage élégant avec des fleurs et des bougies.' },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    autoplayIntervalRef.current = setInterval(nextImage, 5000);
    return () => clearInterval(autoplayIntervalRef.current);
  }, []);

  const handleInteraction = () => {
    clearInterval(autoplayIntervalRef.current);
    autoplayIntervalRef.current = setInterval(nextImage, 8000);
  };
  
  const scrollToRSVP = () => {
    const rsvpSection = document.getElementById('rsvp');
    if (rsvpSection) {
      rsvpSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentImageIndex}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          <img 
            alt={images[currentImageIndex].description}
            className="w-full h-full object-cover"
           src="https://images.unsplash.com/photo-1675023112817-52b789fd2ef0" />
          <div className="absolute inset-0 bg-black/50"></div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold">
            {commonT.estelle} <span className="text-primary">&</span> {commonT.matthieu}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl lg:text-2xl mb-8 font-light"
        >
          {t.heroSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12 text-base md:text-lg"
        >
          <div className="flex items-center">
            <CalendarDays className="w-5 h-5 mr-2 text-primary" />
            <span>{t.date}</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-white/50"></div>
          <div className="flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-primary" />
            <span>{t.location}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg" onClick={scrollToRSVP}>
            {t.rsvpButton}
          </Button>
        </motion.div>
      </div>

      <button
        onClick={() => { prevImage(); handleInteraction(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/30 hover:bg-black/50 rounded-full transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={() => { nextImage(); handleInteraction(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/30 hover:bg-black/50 rounded-full transition-colors"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => { setCurrentImageIndex(index); handleInteraction(); }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentImageIndex === index ? 'bg-primary scale-125' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to image ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Hero;