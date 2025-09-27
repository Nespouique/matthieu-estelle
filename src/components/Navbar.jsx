import React, { useState } from 'react';
import Logo from '@/components/Logo.jsx';
import LanguageSwitcher from '@/components/LanguageSwitcher.jsx';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { translations } from '@/lib/translations';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const t = translations[language].common;

  const navItems = [
    { id: 'hero', label: t.navHome },
    { id: 'schedule', label: t.navSchedule },
    { id: 'venue', label: t.navVenue },
    { id: 'dresscode', label: t.navDressCode },
    { id: 'gifts', label: t.navGifts },
    { id: 'memories', label: t.navMemories },
    { id: 'rsvp', label: t.navRSVP },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 shadow-lg backdrop-blur-sm w-screen">
      <div className="w-full px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Logo />
          </div>
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="bg-background/95 border-t border-border">
          <div className="w-full px-4 py-4 max-w-7xl mx-auto">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors justify-start"
                >
                  {item.label}
                </Button>
              ))}
              <div className="border-t border-border pt-2 mt-2">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;