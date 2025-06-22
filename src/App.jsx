import React, { Suspense } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext.jsx";
import Navbar from "@/components/Navbar.jsx";
import Hero from "@/components/Hero.jsx";
import Story from "@/components/Story.jsx";
import Schedule from "@/components/Schedule.jsx";
import Venue from "@/components/Venue.jsx";
import RSVP from "@/components/RSVP.jsx";
import Gifts from "@/components/Gifts.jsx";
import Memories from "@/components/Memories.jsx";
import DressCode from "@/components/DressCode.jsx";
import Footer from "@/components/Footer.jsx";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LanguageProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Hero />
            <Story />
            <Schedule />
            <Venue />
            <RSVP />
            <Gifts />
            <Memories />
            <DressCode />
          </main>
          <Footer />
          <Toaster />
        </div>
      </LanguageProvider>
    </Suspense>
  );
};

export default App;