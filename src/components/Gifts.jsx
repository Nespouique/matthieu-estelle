import React, { useState } from 'react';
import { Gift } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../lib/translations';
import { Button } from '../components/ui/button';
import ContributionModal from './ContributionModal';

const Gifts = () => {
  const { language } = useLanguage();
  const t = translations[language].gifts;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="gifts" className="py-20 section-darker section-transition">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-primary mb-6">{t.giftsTitle}</h2>
          <div className="w-20 h-0.5 bg-primary mx-auto mb-8"></div>
          <div className="text-lg text-foreground/80 leading-relaxed mb-8">
            {t.giftsDescription.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>

          <Button 
            size="lg"
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
          >
            <Gift className="w-5 h-5 mr-2" />
            <span>{t.contributionLinkText}</span>
          </Button>
        </div>
      </div>

      <ContributionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        translations={t}
      />
    </section>
  );
};

export default Gifts;