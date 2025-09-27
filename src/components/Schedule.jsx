import React from 'react';
import { Clock, GlassWater, Coffee } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { translations } from '@/lib/translations';

const Schedule = () => {
  const { language } = useLanguage();
  const t = translations[language].schedule;

  const scheduleItems = [
    {
      date: t.civilMarriage.date,
      title: t.civilMarriage.title,
      location: t.civilMarriage.location,
      times: t.civilMarriage.times,
      icon: <Clock className="w-6 h-6 text-primary" />
    },
    {
      date: t.laicCeremony.date,
      title: t.laicCeremony.title,
      location: t.laicCeremony.location,
      times: t.laicCeremony.times,
      icon: <GlassWater className="w-6 h-6 text-primary" />
    },
    {
      date: t.returnBrunch.date,
      title: t.returnBrunch.title,
      location: t.returnBrunch.location,
      times: t.returnBrunch.times,
      icon: <Coffee className="w-6 h-6 text-primary" />
    }
  ];

  return (
    <section id="schedule" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-primary mb-6">{t.scheduleTitle}</h2>
          <div className="w-20 h-0.5 bg-primary mx-auto"></div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Trait de connexion horizontal - visible uniquement sur desktop */}
          <div className="hidden md:block absolute left-0 right-0 h-1 bg-primary/40 z-0" style={{ top: '5rem' }}></div>
          
          {/* Trait de connexion vertical - visible uniquement sur mobile */}
          <div className="md:hidden absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary/40 z-0" style={{ top: '6rem', bottom: '6rem' }}></div>
          
          <div className="relative space-y-8 z-10">
            {scheduleItems.map((item, index) => (
              <div
                key={index}
                className="bg-white bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl shadow-lg border border-primary/10 hover:shadow-primary/20 transition-shadow p-6 md:p-8"
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4 p-3 bg-primary/10 rounded-full">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif text-primary font-semibold">{item.title}</h3>
                    {item.location && (
                      <p className="text-sm text-secondary font-medium mb-1">{item.location}</p>
                    )}
                    <p className="text-sm text-foreground/70 font-medium">{item.date}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {item.times.map((time, timeIndex) => (
                    <p key={timeIndex} className="text-foreground/80 text-sm leading-relaxed">
                      <span className="font-bold">{time.split(' - ')[0]}</span>
                      {time.includes(' - ') && <span> - {time.split(' - ')[1]}</span>}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;