import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { translations } from '@/lib/translations';

const DressCode = () => {
  const { language } = useLanguage();
  const t = translations[language].dressCode;
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="dresscode" className="py-20 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-primary mb-6">{t.faqTitle}</h2>
          <div className="w-20 h-0.5 bg-primary mx-auto mb-8"></div>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {t.faqs.map((faq, index) => (
            <div key={index} className="bg-background rounded-xl shadow-lg border border-secondary/10">
              <button
                onClick={() => toggleFaq(index)}
                className="flex items-center justify-between w-full p-6 text-left"
              >
                <div className="flex items-center">
                  <HelpCircle className="w-6 h-6 text-secondary mr-3 flex-shrink-0" />
                  <h3 className="text-lg font-serif text-secondary">{faq.question}</h3>
                </div>
                {openFaq === index ? (
                  <ChevronUp className="w-5 h-5 text-secondary transition-transform duration-200 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-secondary transition-transform duration-200 flex-shrink-0" />
                )}
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openFaq === index ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6">
                  {faq.answer.split('\n\n').map((paragraph, pIndex) => (
                    <div key={pIndex} className="text-foreground/80 leading-relaxed mb-3 last:mb-0">
                      {paragraph.split('\n').map((line, lIndex) => (
                        <div key={lIndex} className="mb-1 last:mb-0">
                          {/* Gestion spéciale pour les liens Treatwell */}
                          {line.includes('Treatwell') ? (
                            <span>
                              {line.split('Treatwell')[0]}
                              <a 
                                href="https://trea.tw/5985HD" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary hover:underline font-medium"
                              >
                                Treatwell
                              </a>
                              {line.split('Treatwell')[1]}
                            </span>
                          ) : /* Gestion spéciale pour les numéros WhatsApp */
                          line.includes('+33') && (faq.question.toLowerCase().includes('contact') || faq.question.toLowerCase().includes('nous contacter')) ? (
                            <span>
                              {line.split(':')[0]}:
                              <a 
                                href={`https://wa.me/33${line.split('+33')[1]?.trim().replace(/\s/g, '').replace(/^0/, '')}`}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary hover:underline font-medium ml-1"
                              >
                                +33{line.split('+33')[1]?.trim()}
                              </a>
                            </span>
                          ) : /* Gestion spéciale pour le numéro d'urgence */
                          line.includes('112') && faq.question.toLowerCase().includes('urgence') ? (
                            <span>
                              {line.split('112')[0]}
                              <a 
                                href="tel:112"
                                className="text-primary hover:underline font-medium"
                              >
                                112
                              </a>
                            </span>
                          ) : (
                            <span>{line}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DressCode;