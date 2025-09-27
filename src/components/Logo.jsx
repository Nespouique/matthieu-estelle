import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { translations } from '@/lib/translations';

const Logo = () => {
  const { language } = useLanguage();
  const t = translations[language].common;

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