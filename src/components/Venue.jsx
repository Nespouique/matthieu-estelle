import React, { useState, useEffect } from 'react';
import { MapPin, Plane, Book, ChevronDown, ChevronUp, School, Home as HomeIcon, Castle, Hotel } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { translations } from '@/lib/translations';

const Venue = () => {
  const { language } = useLanguage();
  const t = translations[language].venue;
  const [isTravelInfoOpen, setIsTravelInfoOpen] = useState(false);

  // Ouvrir l'accordéon par défaut sur desktop
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsTravelInfoOpen(true);
      } else {
        setIsTravelInfoOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const venues = [
    {
      name: t.venues.townHall.name,
      address: t.venues.townHall.address,
      access: t.venues.townHall.access,
      parking: t.venues.townHall.parking,
      mapsLink: t.venues.townHall.mapsLink,
      transports: t.venues.townHall.transports || [],
      icon: School
    },
    {
      name: t.venues.home.name,
      address: t.venues.home.address,
      access: t.venues.home.access,
      parking: t.venues.home.parking,
      mapsLink: t.venues.home.mapsLink,
      transports: t.venues.home.transports || [],
      icon: HomeIcon
    },
    {
      name: t.venues.chaalis.name,
      address: t.venues.chaalis.address,
      access: t.venues.chaalis.access,
      parking: t.venues.chaalis.parking,
      mapsLink: t.venues.chaalis.mapsLink,
      transports: t.venues.chaalis.transports || [],
      icon: Castle
    }
  ];

  return (
    <section id="venue" className="py-20 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-primary mb-6">{t.venueTitle}</h2>
          <div className="w-20 h-0.5 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-foreground/80 leading-relaxed max-w-4xl mx-auto">
            {t.introText}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <div className="relative">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                alt="Domaine de Chaalis"
                className="w-full h-auto object-cover aspect-[4/3] transform transition-transform duration-500 hover:scale-105"
                src="/images/Chaalis.jpg" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-background rounded-xl shadow-lg border border-secondary/10">
              <button
                onClick={() => setIsTravelInfoOpen(!isTravelInfoOpen)}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center">
                  <Plane className="w-7 h-7 text-secondary mr-3" />
                  <h3 className="text-2xl font-serif text-secondary">{t.travelInfo.title}</h3>
                </div>
                {isTravelInfoOpen ? (
                  <ChevronUp className="w-5 h-5 text-secondary transition-transform duration-200" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-secondary transition-transform duration-200" />
                )}
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isTravelInfoOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pt-4">
                  {t.travelInfo.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-foreground/80 leading-relaxed mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section des 3 lieux - encapsulée dans une carte */}
        <div className="mb-16">
          <div className="p-6 bg-background rounded-xl shadow-lg border border-secondary/10">
            <div className="flex items-center mb-6">
              <MapPin className="w-7 h-7 text-secondary mr-3" />
              <h3 className="text-2xl font-serif text-secondary">{t.venues.title}</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {venues.map((venue, index) => {
                const IconComponent = venue.icon;
                return (
                  <div key={index} className="p-4 bg-secondary/5 rounded-lg border border-secondary/10">
                    <h4 className="text-lg font-serif text-secondary mb-2 flex items-center">
                      <IconComponent className="w-5 h-5 text-secondary mr-2" />
                      {venue.name}
                    </h4>
                  <a 
                    href={venue.mapsLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-foreground/80 mb-2 text-sm hover:text-primary transition-colors block underline"
                  >
                    {venue.address}
                  </a>
                  
                  {/* Affichage des transports avec logos */}
                  {venue.transports && venue.transports.length > 0 && (
                    <div className="mb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-foreground/70 text-sm">{venue.access}</span>
                        {venue.transports.map((transport, transportIndex) => (
                          <div key={transportIndex} className="flex items-center bg-background rounded px-1.5 py-0.5 border border-secondary/20">
                            <span className="text-xs text-foreground/70 mr-1">{transport.type}</span>
                            {transport.logos ? (
                              // Cas pour multiple logos (comme Transilien L ou J)
                              transport.logos.map((logoUrl, logoIndex) => (
                                <img 
                                  key={logoIndex}
                                  src={logoUrl} 
                                  alt={transport.line}
                                  className="w-4 h-4 object-contain ml-0.5"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                  }}
                                />
                              ))
                            ) : transport.logo ? (
                              // Cas pour un seul logo
                              <img 
                                src={transport.logo} 
                                alt={transport.line}
                                className="w-4 h-4 object-contain"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            ) : transport.busNumber ? (
                              // Cas pour les bus avec numéro
                              <span 
                                className="inline-flex items-center justify-center w-4 h-4 rounded text-white text-[0.5rem] font-bold"
                                style={{ backgroundColor: transport.busColor }}
                                aria-hidden="true"
                              >
                                {transport.busNumber}
                              </span>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Affichage pour les lieux sans transport (comme Chaalis) */}
                  {(!venue.transports || venue.transports.length === 0) && (
                    <p className="text-foreground/70 mb-2 text-sm">{venue.access}</p>
                  )}
                  
                  <p className="text-foreground/70 mb-2 text-sm italic font-light">{venue.parking}</p>
                </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section hébergements */}
        <div className="mb-16">
          <div className="p-6 bg-background rounded-xl shadow-lg border border-secondary/10">
            <div className="flex items-center mb-4">
              <Hotel className="w-7 h-7 text-secondary mr-3" />
              <h3 className="text-2xl font-serif text-secondary">{t.accommodation.title}</h3>
            </div>
            <p className="text-foreground/80 mb-6">{t.accommodation.description}</p>
            <div className="grid md:grid-cols-3 gap-4">
              {t.accommodation.options.map((option, index) => (
                <div key={index} className="p-4 border border-secondary/20 rounded-lg">
                  <h5 className="font-semibold text-secondary mb-1">{option.name}</h5>
                  <p className="text-sm text-foreground/70 mb-1">{option.address}</p>
                  <p className="text-sm text-foreground/80 font-medium">{option.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section Notre Guide */}
        <div>
          <div className="p-6 bg-background rounded-xl shadow-lg border border-secondary/10">
            <div className="flex items-center mb-6">
              <Book className="w-7 h-7 text-secondary mr-3" />
              <h3 className="text-2xl font-serif text-secondary">{t.ourGuide.title}</h3>
            </div>
            <div className="mb-6">
              {t.ourGuide.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-foreground/80 leading-relaxed mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {t.ourGuide.places.map((place, index) => (
                <div key={index} className="p-4 bg-secondary/5 rounded-lg border border-secondary/10">
                  <h4 className="text-lg font-serif text-secondary mb-3">{place.name}</h4>
                  {/* Image du lieu */}
                  {place.image && (
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <img 
                        src={place.image} 
                        alt={place.venue}
                        className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <h5 className="font-semibold text-foreground mb-1">{place.venue}</h5>
                  <a 
                    href={place.mapsLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-foreground/80 text-sm hover:text-primary transition-colors underline block"
                  >
                    {place.address}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Venue;