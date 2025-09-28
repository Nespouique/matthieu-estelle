import React from 'react';
import { Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { translations } from '@/lib/translations';
import Logo from '@/components/Logo.jsx';

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language].footer;
  const commonT = translations[language].common;

  return (
    <footer className="section-light border-t border-border/50 py-12 text-center">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-6">
          <Logo enableConfetti={true} />
        </div>
        <p className="text-sm text-muted-foreground flex items-center justify-center">
          {t.madeWithLove} <Heart className="w-4 h-4 text-primary mx-1.5" /> {commonT.estelle} & {commonT.matthieu}
        </p>
      </div>
    </footer>
  );
};

export default Footer;