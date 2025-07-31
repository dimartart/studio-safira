import { useState } from "react";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';
import { format } from "date-fns";
import { formatInTimeZone } from 'date-fns-tz';

const PRAGUE_TZ = 'Europe/Prague';

const czechHolidays = [
  '2025-01-01', '2025-05-01', '2025-07-05', '2025-07-06',
  '2025-09-28', '2025-10-28', '2025-11-17', '2025-12-24',
  '2025-12-25', '2025-12-26'
];

const isCzechHoliday = (date) =>
  czechHolidays.includes(format(date, 'yyyy-MM-dd'));

const isTomorrowLocked = (date) => {
  const now = new Date();
  const nowPrague = new Date(formatInTimeZone(now, PRAGUE_TZ, "yyyy-MM-dd'T'HH:mm:ssXXX"));
  const tomorrow = new Date(nowPrague);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    format(date, 'yyyy-MM-dd') === format(tomorrow, 'yyyy-MM-dd') &&
    nowPrague.getHours() >= 0
  );
};

const isDateDisabled = (date) => {
  const today = new Date();
  const day = date.getDay(); // Sunday = 0, Saturday = 6

  return (
    date < today ||
    day === 0 || day === 6 ||          
    isCzechHoliday(date) ||
    isTomorrowLocked(date)
  );
};

export default function DatePicker({ value, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <input
        readOnly
        className="cursor-pointer p-2 rounded border text-black"
        value={value ? format(value, 'dd.MM.yyyy') : ''}
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div className="absolute z-10 mt-2 bg-black rounded shadow-xl">
          <DayPicker
            mode="single"
            selected={value}
            onSelect={(date) => {
              setOpen(false);
              onChange(date);
            }}
            disabled={isDateDisabled}
          />
        </div>
      )}
    </div>
  );
}
