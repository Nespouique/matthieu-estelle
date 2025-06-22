import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleLanguage} aria-label="Changer de langue">
      <Globe className="h-5 w-5 text-primary" />
      <span className="sr-only">{language === 'fr' ? 'Switch to English' : 'Passer en Français'}</span>
    </Button>
  );
};

export default LanguageSwitcher;