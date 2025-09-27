import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CalendarDays } from 'lucide-react';
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
    { 
      id: 'carousel1', 
      src: '/images/carousel1.png',
      description: 'Estelle et Matthieu - Photo de mariage 1'
    },
    { 
      id: 'carousel2', 
      src: '/images/carousel2.png',
      description: 'Estelle et Matthieu - Photo de mariage 2'
    },
    { 
      id: 'carousel3', 
      src: '/images/carousel3.png',
      description: 'Estelle et Matthieu - Photo de mariage 3'
    },
  ];

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    autoplayIntervalRef.current = setInterval(nextImage, 5000);
    return () => clearInterval(autoplayIntervalRef.current);
  }, [nextImage]);

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
      <div className="absolute inset-0 z-0">
        <img 
          alt={images[currentImageIndex].description}
          className="w-full h-full object-cover"
          src={images[currentImageIndex].src} />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 p-4 md:p-8">
        <div className="mb-6">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold">
            {commonT.estelle} <span className="text-primary">&</span> {commonT.matthieu}
          </h1>
        </div>

        <div className="text-lg md:text-xl lg:text-2xl mb-8 font-light">
          {t.heroSubtitle.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>

        <div
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12 text-base md:text-lg"
        >
          <div className="flex items-center">
            <CalendarDays className="w-5 h-5 mr-2 text-primary" />
            <span>{t.date1}</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-white/50"></div>
          <div className="flex items-center">
            <CalendarDays className="w-5 h-5 mr-2 text-primary" />
            <span>{t.date2}</span>
          </div>
        </div>

        <div>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg" onClick={scrollToRSVP}>
            {t.rsvpButton}
          </Button>
        </div>
      </div>

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