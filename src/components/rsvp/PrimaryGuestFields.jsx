import React from "react";
import { User, Mail } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const PrimaryGuestFields = ({ primaryGuestName, setPrimaryGuestName, primaryGuestEmail, setPrimaryGuestEmail, t }) => {
  return (
    <>
      <div>
        <Label htmlFor="primaryGuestName" className="flex items-center mb-2">
          <User className="w-4 h-4 mr-2 text-primary" /> {t.rsvpForm.name} *
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
};

export default PrimaryGuestFields;