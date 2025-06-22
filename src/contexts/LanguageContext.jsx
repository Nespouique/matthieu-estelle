import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Try to get language from localStorage, default to 'fr'
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("wedding-language");
    return savedLanguage || "fr";
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem("wedding-language", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};