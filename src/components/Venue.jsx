import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { MapPin, BedDouble, Car } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { translations } from '@/lib/translations';
import { Button } from '@/components/ui/button';

const Venue = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { language } = useLanguage();
  const t = translations[language].venue;

  const venueDetails = {
    name: "Domaine de Chaalis",
    address: "60300 Fontaine-Chaalis, France",
    mapsLink: "https://www.google.com/maps/place/Domaine+de+Chaalis/@49.1500562,2.6800018,17z",
  };

  const accommodations = [
    { name: t.accommodationNearby.hotelExample.name, distance: t.accommodationNearby.hotelExample.distance, link: "#" },
    { name: t.accommodationNearby.giteExample.name, distance: t.accommodationNearby.giteExample.distance, link: "#" },
  ];

  return (
    <section id="venue" className="py-20 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-light text-primary mb-6">{t.venueTitle}</h2>
          <div className="w-20 h-0.5 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img  
                alt="Photo du Domaine de Chaalis" 
                className="w-full h-auto object-cover aspect-[4/3] transform transition-transform duration-500 hover:scale-105"
               src="https://images.unsplash.com/photo-1657117735687-50cda95e80cc" />
            </div>
            <div className="absolute -top-5 -left-5 w-20 h-20 bg-primary/10 rounded-full -z-10"></div>
            <div className="absolute -bottom-5 -right-5 w-28 h-28 border-4 border-secondary rounded-lg -z-10 transform rotate-[-15deg]"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="p-6 bg-background rounded-xl shadow-lg border border-secondary/10">
              <div className="flex items-center mb-3">
                <MapPin className="w-7 h-7 text-secondary mr-3" />
                <h3 className="text-2xl font-serif text-secondary">{venueDetails.name}</h3>
              </div>
              <p className="text-foreground/80 mb-4">{venueDetails.address}</p>
              <Button asChild variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary">
                <a href={venueDetails.mapsLink} target="_blank" rel="noopener noreferrer">
                  <MapPin className="w-4 h-4 mr-2" /> {t.viewOnMap}
                </a>
              </Button>
            </div>

            <div className="p-6 bg-background rounded-xl shadow-lg border border-secondary/10">
              <div className="flex items-center mb-3">
                <Car className="w-7 h-7 text-secondary mr-3" />
                <h3 className="text-2xl font-serif text-secondary">{t.accessInfo.title}</h3>
              </div>
              <p className="text-foreground/80 mb-2">{t.accessInfo.byCar}</p>
              <p className="text-foreground/80">{t.accessInfo.parking}</p>
            </div>
            
            <div className="p-6 bg-background rounded-xl shadow-lg border border-secondary/10">
              <div className="flex items-center mb-3">
                <BedDouble className="w-7 h-7 text-secondary mr-3" />
                <h3 className="text-2xl font-serif text-secondary">{t.accommodationNearby.title}</h3>
              </div>
              <p className="text-foreground/80 mb-4">{t.accommodationNearby.description}</p>
              <ul className="space-y-2">
                {accommodations.map((acc, index) => (
                  <li key={index} className="text-sm text-foreground/70">
                    <a href={acc.link} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                      {acc.name} ({acc.distance})
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Venue;