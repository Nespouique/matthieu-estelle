import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Check, X, Users, Utensils, MessageSquare, CalendarCheck, PlusCircle, MinusCircle, Mail, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext.jsx";
import { translations } from "@/lib/translations";

const PrimaryGuestFields = ({ primaryGuestName, setPrimaryGuestName, primaryGuestEmail, setPrimaryGuestEmail, t }) => (
  <>
    <div>
      <Label htmlFor="primaryGuestName" className="flex items-center mb-2">
        <UserIcon className="w-4 h-4 mr-2 text-primary" /> {t.rsvpForm.name} *
      </Label>
      <Input
        type="text"
        id="primaryGuestName"
        value={primaryGuestName}
        onChange={(e) => setPrimaryGuestName(e.target.value)}
        required
        placeholder={t.rsvpForm.namePlaceholder}
      />
    </div>
    <div>
      <Label htmlFor="primaryGuestEmail" className="flex items-center mb-2">
        <Mail className="w-4 h-4 mr-2 text-primary" /> {t.rsvpForm.email} *
      </Label>
      <Input
        type="email"
        id="primaryGuestEmail"
        value={primaryGuestEmail}
        onChange={(e) => setPrimaryGuestEmail(e.target.value)}
        required
        placeholder={t.rsvpForm.emailPlaceholder}
      />
    </div>
  </>
);

const AttendanceOptions = ({ attendance, setAttendance, t }) => {
  const attendanceChoices = [
    { label: t.rsvpForm.attendingDay1, value: 'day1' },
    { label: t.rsvpForm.attendingDay2, value: 'day2' },
    { label: t.rsvpForm.attendingBoth, value: 'both' },
    { label: t.rsvpForm.attendingNo, value: 'no' },
  ];
  return (
    <div>
      <Label className="block text-sm font-medium text-foreground mb-2">
        <CalendarCheck className="inline w-4 h-4 mr-2 text-primary" /> {t.rsvpForm.attending} *
      </Label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {attendanceChoices.map(option => (
          <Label key={option.value} className={`flex items-center p-3 rounded-md border cursor-pointer transition-all ${attendance === option.value ? 'bg-primary/10 border-primary ring-2 ring-primary' : 'border-input hover:border-primary/50'}`}>
            <Input
              type="radio"
              name="attendance"
              value={option.value}
              checked={attendance === option.value}
              onChange={(e) => setAttendance(e.target.value)}
              className="mr-3 h-4 w-4 text-primary focus:ring-primary border-gray-300 accent-primary"
            />
            <span className="text-sm">{option.label}</span>
          </Label>
        ))}
      </div>
    </div>
  );
};

const GuestItem = ({ guest, index, handleGuestChange, handleRemoveGuest, canRemove, t }) => (
  <motion.div 
    layout 
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
    className="p-4 border border-input rounded-md space-y-4 bg-background/50"
  >
    <div className="flex justify-between items-center">
      <h4 className="text-sm font-medium text-primary">{t.rsvpForm.guest} {index + 1}</h4>
      {canRemove && (
        <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveGuest(index)}>
          <MinusCircle className="w-4 h-4 mr-1" /> {t.rsvpForm.removeGuest}
        </Button>
      )}
    </div>
    <div>
      <Label htmlFor={`guestName-${index}`} className="flex items-center mb-1 text-xs">
        <UserIcon className="w-3 h-3 mr-1 text-primary/80" /> {t.rsvpForm.name} *
      </Label>
      <Input
        type="text"
        id={`guestName-${index}`}
        value={guest.name}
        onChange={(e) => handleGuestChange(index, "name", e.target.value)}
        required
        placeholder={t.rsvpForm.guestNamePlaceholder}
      />
    </div>
    <div>
      <Label htmlFor={`dietary-${index}`} className="flex items-center mb-1 text-xs">
        <Utensils className="w-3 h-3 mr-1 text-primary/80" /> {t.rsvpForm.dietary}
      </Label>
      <Input
        type="text"
        id={`dietary-${index}`}
        value={guest.dietaryRestrictions}
        onChange={(e) => handleGuestChange(index, "dietaryRestrictions", e.target.value)}
        placeholder={t.rsvpForm.dietaryPlaceholder}
      />
    </div>
  </motion.div>
);

const GuestList = ({ guests, handleGuestChange, handleAddGuest, handleRemoveGuest, maxGuests, t }) => (
  <div className="space-y-4">
    <Label className="block text-sm font-medium text-foreground">
      <Users className="inline w-4 h-4 mr-2 text-primary" /> {t.rsvpForm.guestListTitle}
    </Label>
    <AnimatePresence>
      {guests.map((guest, index) => (
        <GuestItem
          key={guest.id || index}
          guest={guest}
          index={index}
          handleGuestChange={handleGuestChange}
          handleRemoveGuest={handleRemoveGuest}
          canRemove={guests.length > 1}
          t={t}
        />
      ))}
    </AnimatePresence>
    <Button 
      type="button" 
      variant="outline" 
      onClick={handleAddGuest} 
      className="w-full" 
      disabled={guests.length >= maxGuests}
    >
      <PlusCircle className="w-4 h-4 mr-2" /> {t.rsvpForm.addGuest}
    </Button>
  </div>
);

const MessageField = ({ message, setMessage, t }) => (
  <div>
    <Label htmlFor="message" className="flex items-center mb-2">
      <MessageSquare className="w-4 h-4 mr-2 text-primary" /> {t.rsvpForm.message}
    </Label>
    <Textarea
      id="message"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      rows="4"
      placeholder={t.rsvpForm.messagePlaceholder}
    />
  </div>
);

const RSVP = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language].rsvp;

  const initialGuestValue = { id: Date.now(), name: "", dietaryRestrictions: "" };
  const MAX_GUESTS = 10; 

  const [primaryGuestName, setPrimaryGuestName] = useState("");
  const [primaryGuestEmail, setPrimaryGuestEmail] = useState("");
  const [attendance, setAttendance] = useState("no"); 
  const [guestDetails, setGuestDetails] = useState([{ ...initialGuestValue }]); 
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (primaryGuestName && guestDetails[0].name === "") {
      const newGuestDetails = [...guestDetails];
      newGuestDetails[0].name = primaryGuestName;
      setGuestDetails(newGuestDetails);
    }
  }, [primaryGuestName, guestDetails]);

  const handleAddGuestDetail = () => {
    if (guestDetails.length < MAX_GUESTS) {
      setGuestDetails([...guestDetails, { ...initialGuestValue, id: Date.now() }]);
    } else {
      toast({
        title: t.rsvpForm.error,
        description: t.rsvpForm.maxGuestsReached,
        variant: "destructive",
      });
    }
  };

  const handleRemoveGuestDetail = (index) => {
    if (guestDetails.length > 1) {
      const newGuestDetails = guestDetails.filter((_, i) => i !== index);
      setGuestDetails(newGuestDetails);
    }
  };

  const handleGuestDetailChange = (index, field, value) => {
    const newGuestDetails = [...guestDetails];
    newGuestDetails[index][field] = value;
    setGuestDetails(newGuestDetails);
  };

  const validateForm = () => {
    if (!primaryGuestName || !primaryGuestEmail) {
      toast({ title: t.rsvpForm.error, description: t.rsvpForm.requiredFieldsError, variant: "destructive" });
      return false;
    }
    if (attendance !== 'no') {
      for (const guest of guestDetails) {
        if (!guest.name) {
          toast({ title: t.rsvpForm.error, description: `${t.rsvpForm.guestName} ${t.rsvpForm.requiredFieldError.toLowerCase()}`, variant: "destructive" });
          return false;
        }
      }
    }
    return true;
  };
  
  const resetForm = () => {
    setPrimaryGuestName("");
    setPrimaryGuestEmail("");
    setAttendance("no");
    setGuestDetails([{ ...initialGuestValue, id: Date.now() }]);
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const rsvpData = {
      primaryResponder: { name: primaryGuestName, email: primaryGuestEmail },
      attendanceChoice: attendance,
      attendees: attendance !== 'no' ? guestDetails.map(g => ({ name: g.name, dietaryRestrictions: g.dietaryRestrictions })) : [],
      message,
      submissionDate: new Date().toISOString(),
    };
    
    const rsvps = JSON.parse(localStorage.getItem("rsvps") || "[]");
    rsvps.push(rsvpData);
    localStorage.setItem("rsvps", JSON.stringify(rsvps));

    toast({
      title: t.rsvpForm.success,
      description: t.rsvpForm.successMessage,
    });
    resetForm();
  };

  return (
    <section id="rsvp" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-light text-primary mb-6">
            {t.rsvpTitle}
          </h2>
          <div className="w-20 h-0.5 bg-primary mx-auto mb-8"></div>
          <p className="text-foreground/80">
            {t.rsvpDescription}
          </p>
          <p className="text-foreground/80 mt-2 font-medium">
            {t.rsvpDeadline}
          </p>
           <p className="text-xs text-muted-foreground mt-4">{t.rsvpForm.adultsOnly}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl shadow-2xl p-8 md:p-10 border border-primary/10"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <PrimaryGuestFields
              primaryGuestName={primaryGuestName}
              setPrimaryGuestName={setPrimaryGuestName}
              primaryGuestEmail={primaryGuestEmail}
              setPrimaryGuestEmail={setPrimaryGuestEmail}
              t={t}
            />
            <AttendanceOptions attendance={attendance} setAttendance={setAttendance} t={t} />
            
            {attendance !== "no" && (
              <GuestList
                guests={guestDetails}
                handleGuestChange={handleGuestDetailChange}
                handleAddGuest={handleAddGuestDetail}
                handleRemoveGuest={handleRemoveGuestDetail}
                maxGuests={MAX_GUESTS}
                t={t}
              />
            )}
            <MessageField message={message} setMessage={setMessage} t={t} />
            <div className="text-center pt-4">
              <Button type="submit" size="lg" className="px-10 py-3 text-base w-full sm:w-auto group bg-primary hover:bg-primary/90 text-primary-foreground">
                {attendance === 'no' ? (
                  <X className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />
                ) : (
                  <Check className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                )}
                {t.rsvpForm.submit}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default RSVP;