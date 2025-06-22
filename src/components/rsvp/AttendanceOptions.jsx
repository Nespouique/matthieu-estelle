import React from "react";
import { CalendarCheck } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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

export default AttendanceOptions;