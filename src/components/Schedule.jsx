import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Clock, GlassWater, Utensils, Music, Coffee } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { translations } from '@/lib/translations';

const Schedule = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { language } = useLanguage();
  const t = translations[language].schedule;

  const scheduleItems = [
    { time: "18:00", title: t.arrival.title, description: t.arrival.description, icon: <Clock className="w-6 h-6 text-primary" /> },
    { time: "18:30", title: t.ceremony.title, description: t.ceremony.description, icon: <GlassWater className="w-6 h-6 text-primary" /> },
    { time: "20:00", title: t.cocktail.title, description: t.cocktail.description, icon: <GlassWater className="w-6 h-6 text-primary" /> },
    { time: "21:30", title: t.dinner.title, description: t.dinner.description, icon: <Utensils className="w-6 h-6 text-primary" /> },
    { time: "23:30", title: t.party.title, description: t.party.description, icon: <Music className="w-6 h-6 text-primary" /> },
    { time: t.brunch.time, title: t.brunch.title, description: t.brunch.description, icon: <Coffee className="w-6 h-6 text-primary" /> },
  ];

  return (
    <section id="schedule" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-light text-primary mb-6">{t.scheduleTitle}</h2>
          <div className="w-20 h-0.5 bg-primary mx-auto"></div>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary/20 transform -translate-x-1/2 rounded-full"></div>
          {scheduleItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              className={`mb-12 flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8 order-2'}`}>
                <div className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl shadow-lg border border-primary/10 hover:shadow-primary/20 transition-shadow">
                  <div className="flex items-center mb-2">
                    <div className={`mr-3 p-2 bg-primary/10 rounded-full ${index % 2 === 0 ? 'ml-auto order-2' : 'mr-auto'}`}>
                      {item.icon}
                    </div>
                    <h3 className={`text-xl font-serif text-primary ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>{item.title}</h3>
                  </div>
                  <p className={`text-sm text-foreground/60 font-semibold mb-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>{item.time}</p>
                  <p className={`text-foreground/80 text-sm leading-relaxed ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>{item.description}</p>
                </div>
              </div>
              <div className="w-1/12 flex-shrink-0">
                <div className="w-4 h-4 bg-primary rounded-full mx-auto border-2 border-background shadow-md"></div>
              </div>
              <div className="w-5/12"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;