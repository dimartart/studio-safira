import { useState, useEffect, useRef } from "react";
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

const isTodayLocked = (date) => {
  const now = new Date();
  const nowPrague = new Date(formatInTimeZone(now, PRAGUE_TZ, "yyyy-MM-dd'T'HH:mm:ssXXX"));

  return (
    format(date, 'yyyy-MM-dd') === format(nowPrague, 'yyyy-MM-dd')
  )
};

const isDateDisabled = (date) => {
  const today = new Date();
  const day = date.getDay(); // Sunday = 0, Saturday = 6

  return (
    date < today ||
    day === 0 || day === 6 ||          
    isCzechHoliday(date) ||
    isTodayLocked(date)
  );
};

export default function DatePicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const datePickerRef = useRef(null);

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div className="w-full" ref={datePickerRef}>
      <input
        readOnly
        placeholder="Choose date"
        className="cursor-pointer p-2 rounded border border-[#4D2039] text-white w-full"
        value={value ? format(value, 'dd.MM.yyyy') : ''}
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div className="absolute z-10 mt-2 bg-black rounded shadow-xl text-white">
          <DayPicker
            className="p-2"
            mode="single"
            selected={value}
            onSelect={(date) => {
              setOpen(false);
              onChange(format(date, 'yyyy-MM-dd'));
            }}
            disabled={isDateDisabled}
          />
        </div>
      )}
    </div>
  );
}
