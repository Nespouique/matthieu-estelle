import React, { useState } from "react";
import { User, AtSign, CalendarCheck, WheatOff, Send, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext.jsx";
import { translations } from "@/lib/translations";

const RSVP = () => {
  const { language } = useLanguage();
  const t = translations[language].rsvp;
  const { toast } = useToast();

  // Google Apps Script URL
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxCk4LMVV7-F6BOhU7CjsXhd-rmc5rJX9gm64YgiU0R70tfW0UMqqAMbzAmtW4EmvuS/exec';

  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [attendanceEvents, setAttendanceEvents] = useState([]);
  const [cannotAttend, setCannotAttend] = useState(false);
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  
  // Submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Attendance events options
  const eventOptions = [
    { id: 'mairie', label: t.rsvpForm.eventMairie, date: t.rsvpForm.dateJuly23 },
    { id: 'cocktail', label: t.rsvpForm.eventCocktail, date: t.rsvpForm.dateJuly23 },
    { id: 'ceremony', label: t.rsvpForm.eventCeremony, date: t.rsvpForm.dateJuly25 },
    { id: 'brunch', label: t.rsvpForm.eventBrunch, date: t.rsvpForm.dateJuly26 },
  ];

  // Handle checkbox changes for events
  const handleEventChange = (eventId) => {
    if (cannotAttend) return; // Ne pas permettre de sélectionner des événements si "ne peut pas venir" est coché
    
    // Si on sélectionne un événement, désactiver "ne peut pas venir"
    if (!attendanceEvents.includes(eventId)) {
      setCannotAttend(false);
    }
    
    setAttendanceEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  // Handle "cannot attend" checkbox
  const handleCannotAttendChange = (checked) => {
    setCannotAttend(checked);
    if (checked) {
      // Clear all events if user cannot attend
      setAttendanceEvents([]);
    }
  };

  // Check if form is valid
  const isFormValid = () => {
    return fullName.trim() && 
           email.trim() && 
           (attendanceEvents.length > 0 || cannotAttend);
  };

  // Handle form submission via URL parameters (GET method for testing)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid() || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Prepare data with specific attendance fields
      const params = new URLSearchParams({
        fullName: fullName.trim(),
        email: email.trim(),
        presenceMairie: attendanceEvents.includes('mairie') ? 'O' : 'N',
        presenceCocktail: attendanceEvents.includes('cocktail') ? 'O' : 'N',
        presenceCeremonie: attendanceEvents.includes('ceremony') ? 'O' : 'N',
        presenceBrunch: attendanceEvents.includes('brunch') ? 'O' : 'N',
        absence: cannotAttend ? 'O' : 'N',
        diet: dietaryRestrictions.trim()
      });

      // Try GET request first to test connectivity
      const testUrl = `${GOOGLE_SCRIPT_URL}?${params.toString()}`;
      
      // Use a hidden iframe to make the request
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.name = 'response-iframe';
      
      // Listen for load event
      const handleLoad = () => {
        iframe.removeEventListener('load', handleLoad);
        
        // Success (we assume success if no error is thrown)
        setIsSubmitted(true);
        toast({
          title: t.rsvpForm.success,
          description: t.rsvpForm.successMessage,
          className: "border-green-200 bg-green-50",
          style: {
            borderColor: "#bbf7d0",
            backgroundColor: "#f0fdf4",
            color: "#166534"
          }
        });
        
        // Scroll to memories section after successful submission
        setTimeout(() => {
          const memoriesSection = document.getElementById('memories');
          if (memoriesSection) {
            memoriesSection.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 1500);
        
        // Reset form after a delay
        setTimeout(() => {
          setFullName("");
          setEmail("");
          setAttendanceEvents([]);
          setCannotAttend(false);
          setDietaryRestrictions("");
          setIsSubmitted(false);
        }, 3000);
        
        // Clean up
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 1000);
        
        setIsSubmitting(false);
      };

      iframe.addEventListener('load', handleLoad);
      
      // Set the src to trigger the request
      document.body.appendChild(iframe);
      iframe.src = testUrl;
      
    } catch (error) {
      toast({
        title: t.rsvpForm.error,
        description: t.rsvpForm.errorMessage,
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
        <section id="rsvp" className="py-20 section-darker section-transition">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-primary mb-6">
            {t.rsvpTitle}
          </h2>
          <div className="w-20 h-0.5 bg-primary mx-auto mb-8"></div>
          <p className="text-foreground/80">
            {t.rsvpDescription}
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl shadow-2xl p-8 md:p-10 border border-primary/10">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Prénom Nom (un seul champ) */}
            <div>
              <Label htmlFor="fullName" className="flex items-center mb-2">
                <User className="w-4 h-4 mr-2 text-primary" /> 
                {t.rsvpForm.fullName} *
              </Label>
              <Input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={t.rsvpForm.fullNamePlaceholder}
                required
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="flex items-center mb-2">
                <AtSign className="w-4 h-4 mr-2 text-primary" /> 
                {t.rsvpForm.email} *
              </Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.rsvpForm.emailPlaceholder}
                required
              />
            </div>

            {/* Serez-vous des nôtres ? */}
            <div>
              <Label className="flex items-center mb-4">
                <CalendarCheck className="w-4 h-4 mr-2 text-primary" /> 
                {t.rsvpForm.attending} *
              </Label>
              <div className="space-y-4">
                {eventOptions.map((event) => (
                  <div key={event.id} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id={event.id}
                      checked={attendanceEvents.includes(event.id) && !cannotAttend}
                      onChange={() => handleEventChange(event.id)}
                      disabled={cannotAttend}
                      className="w-4 h-4 text-primary border-input rounded focus:ring-primary focus:ring-2 accent-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <Label 
                      htmlFor={event.id} 
                      className={`flex-1 cursor-pointer text-sm font-medium transition-colors ${
                        cannotAttend 
                          ? 'text-foreground/50 cursor-not-allowed' 
                          : 'text-foreground hover:text-primary'
                      }`}
                    >
                      <span className="font-semibold">{event.label}</span>
                      <span className="text-foreground/60 text-xs ml-2">({event.date})</span>
                    </Label>
                  </div>
                ))}
                
                {/* Séparateur */}
                <div className="border-t border-foreground/20 my-4"></div>
                
                {/* Option "ne peut pas venir" */}
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="cannotAttend"
                    checked={cannotAttend}
                    onChange={(e) => handleCannotAttendChange(e.target.checked)}
                    className="w-4 h-4 text-primary border-input rounded focus:ring-primary focus:ring-2 accent-primary"
                  />
                  <Label 
                    htmlFor="cannotAttend" 
                    className="flex-1 cursor-pointer text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    <span className="font-semibold">
                      {t.rsvpForm.cannotAttend}
                    </span>
                  </Label>
                </div>
              </div>
            </div>

            {/* Restrictions alimentaires */}
            <div>
              <Label htmlFor="dietaryRestrictions" className="flex items-center mb-2">
                <WheatOff className="w-4 h-4 mr-2 text-primary" /> 
                {t.rsvpForm.dietaryRestrictions}
              </Label>
              <Textarea
                id="dietaryRestrictions"
                value={dietaryRestrictions}
                onChange={(e) => setDietaryRestrictions(e.target.value)}
                placeholder={t.rsvpForm.dietaryPlaceholder}
                rows={4}
                className="resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center py-2">
              <Button 
                type="submit" 
                disabled={!isFormValid() || isSubmitting || isSubmitted}
                className={`px-10 h-12 w-full sm:w-auto group transition-all ${
                  isFormValid() && !isSubmitting && !isSubmitted
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                    : 'bg-foreground/20 text-foreground/50 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {t.rsvpForm.sending}
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    {t.rsvpForm.sent}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2 transition-transform group-hover:translate-x-1" />
                    {t.rsvpForm.submit}
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RSVP;