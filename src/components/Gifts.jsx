import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Gift, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { translations } from '@/lib/translations';
import { Button } from '@/components/ui/button';

const Gifts = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { language } = useLanguage();
  const t = translations[language].gifts;

  return (
    <section id="gifts" className="py-20 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-light text-primary mb-6">{t.giftsTitle}</h2>
          <div className="w-20 h-0.5 bg-primary mx-auto mb-8"></div>
          <p className="text-foreground/80 leading-relaxed mb-8">{t.giftsDescription}</p>
          <Button 
            asChild 
            size="lg" 
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground group"
          >
            <a href={t.contributionLink} target="_blank" rel="noopener noreferrer">
              {t.contributionLinkText}
              <ExternalLink className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center"
        >
          <Gift className="w-32 h-32 text-primary opacity-20 transform -rotate-12" />
        </motion.div>
      </div>
    </section>
  );
};

export default Gifts;