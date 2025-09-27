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
    <Button 
      variant="ghost" 
      onClick={toggleLanguage} 
      className="text-sm font-medium text-foreground hover:text-primary transition-colors underline justify-start flex items-center gap-2"
      aria-label="Changer de langue"
    >
      <Globe className="h-4 w-4" />
      {language === 'fr' ? 'Change to English' : 'Passer en Français'}
    </Button>
  );
};

export default LanguageSwitcher;