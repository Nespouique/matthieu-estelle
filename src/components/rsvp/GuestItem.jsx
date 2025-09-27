import React from "react";
import { User, Utensils, MinusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const GuestItem = ({ guest, index, handleGuestChange, handleRemoveGuest, canRemove, t }) => {
  return (
    <div
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
          <User className="w-3 h-3 mr-1 text-primary/80" /> {t.rsvpForm.name} *
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
    </div>
  );
};

export default GuestItem;