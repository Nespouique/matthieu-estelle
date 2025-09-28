import React from 'react';
import confetti from 'canvas-confetti';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { translations } from '@/lib/translations';

const Logo = ({ enableConfetti = false }) => {
  const { language } = useLanguage();
  const t = translations[language].common;

  const triggerConfetti = (e) => {
    e.preventDefault();
    
    // Explosion de confettis au centre
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Série d'explosions latérales
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 150);

    // Explosion finale avec des couleurs de mariage (or, blanc, rose)
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FFFFFF', '#FFB6C1', '#F0E68C']
      });
    }, 300);
  };

  if (enableConfetti) {
    return (
      <button onClick={triggerConfetti} className="group">
        <img 
          src="/images/Logo.png" 
          alt={`${t.estelle} & ${t.matthieu} Logo`}
          className="h-14 sm:h-18 transition-transform duration-300 group-hover:scale-110"
        />
      </button>
    );
  }

  return (
    <a href="#hero" className="group">
      <img 
        src="/images/Logo.png" 
        alt={`${t.estelle} & ${t.matthieu} Logo`}
        className="h-14 sm:h-18 transition-transform duration-300 group-hover:scale-110"
      />
    </a>
  );
};

export default Logo;