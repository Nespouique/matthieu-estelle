import React from "react";
import { MessageSquare } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const MessageField = ({ message, setMessage, t }) => {
  return (
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
};

export default MessageField;