import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Heart, BookOpenCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { translations } from '@/lib/translations';

const Story = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { language } = useLanguage();
  const t = translations[language].story;

  const storySections = [
    { icon: <Heart className="w-8 h-8 text-primary" />, title: t.howWeMetTitle, text: t.howWeMetText },
    { icon: <BookOpenCheck className="w-8 h-8 text-primary" />, title: t.proposalTitle, text: t.proposalText },
  ];

  return (
    <section id="story" className="py-20 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-light text-primary mb-6">{t.storyTitle}</h2>
          <div className="w-20 h-0.5 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden shadow-2xl">
              <img  
                alt="Estelle et Matthieu se regardant tendrement" 
                className="object-cover w-full h-full transform transition-transform duration-500 hover:scale-105"
               src="https://images.unsplash.com/photo-1616445204913-ef67d66eaff6" />
            </div>
             <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-secondary/10 rounded-full -z-10"></div>
             <div className="absolute -top-4 -left-4 w-16 h-16 border-4 border-primary rounded-lg -z-10 transform rotate-12"></div>
          </motion.div>

          <div className="space-y-10">
            {storySections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                className="flex items-start space-x-6 p-6 bg-background rounded-xl shadow-lg border border-primary/10 hover:shadow-primary/20 transition-shadow"
              >
                <div className="flex-shrink-0 p-3 bg-primary/10 rounded-full">
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-primary mb-2">{section.title}</h3>
                  <p className="text-foreground/80 leading-relaxed">{section.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;