import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Shirt, VenetianMask } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { translations } from '@/lib/translations';

const DressCode = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { language } = useLanguage();
  const t = translations[language].dressCode;

  return (
    <section id="dresscode" className="py-20 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-light text-primary mb-6">{t.dressCodeTitle}</h2>
          <div className="w-20 h-0.5 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-foreground/80 leading-relaxed mb-4">{t.dressCodeDescription}</p>
          <p className="text-sm text-muted-foreground">{t.childrenInfo}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center items-center space-x-8"
        >
          <Shirt className="w-24 h-24 text-primary opacity-30 transform rotate-[-15deg]" />
          <VenetianMask className="w-20 h-20 text-secondary opacity-30 transform rotate-[10deg] scale-x-[-1]" />
        </motion.div>
      </div>
    </section>
  );
};

export default DressCode;