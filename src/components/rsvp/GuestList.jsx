import React from "react";
import { AnimatePresence } from "framer-motion";
import { Users, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import GuestItem from "./GuestItem";

const GuestList = ({ guests, handleGuestChange, handleAddGuest, handleRemoveGuest, maxGuests, t }) => {
  return (
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
};

export default GuestList;