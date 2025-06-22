import React from 'react';
import { Feather, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { translations } from '@/lib/translations';

const Logo = () => {
  const { language } = useLanguage();
  const t = translations[language].common;

  return (
    <a href="#hero" className="flex items-center space-x-2 group">
      <div className="relative">
        <Shield className="h-8 w-8 text-primary transition-transform duration-300 group-hover:rotate-[-12deg]" />
        <Feather className="h-5 w-5 text-secondary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[10deg]" />
      </div>
      <div className="flex flex-col items-start leading-tight">
        <span className="font-serif text-xl font-semibold text-primary group-hover:text-primary/80 transition-colors">
          {t.estelle}
        </span>
        <span className="font-serif text-sm font-medium text-secondary group-hover:text-secondary/80 transition-colors -mt-1">
          & {t.matthieu}
        </span>
      </div>
    </a>
  );
};

export default Logo;