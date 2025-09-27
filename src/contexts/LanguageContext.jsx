import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Function to detect user's preferred language
  const detectUserLanguage = () => {
    // Check if there's a saved preference
    const savedLanguage = localStorage.getItem("wedding-language");
    if (savedLanguage) {
      return savedLanguage;
    }

    // Default to English
    let detectedLanguage = "en";

    // Try to detect browser/device language
    if (typeof window !== "undefined" && window.navigator) {
      const userLanguage = 
        navigator.language || 
        navigator.languages?.[0] || 
        navigator.userLanguage || 
        navigator.browserLanguage;

      // If user's language starts with 'fr', switch to French
      if (userLanguage && userLanguage.toLowerCase().startsWith('fr')) {
        detectedLanguage = "fr";
      }
    }

    return detectedLanguage;
  };

  const [language, setLanguage] = useState(() => detectUserLanguage());

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