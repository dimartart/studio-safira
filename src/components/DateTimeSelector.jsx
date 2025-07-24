import { useState, useEffect } from "react";
import { format, isBefore, addMinutes } from "date-fns";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';
import { services } from "../lib/services";
import { supabase } from "../lib/supabaseClient";

function generateTimeSlots(time, duration) {
  const slots = [];
  let current = new Date(`1970-01-01T${time.start}:00`);
  const endTime = new Date(`1970-01-01T${time.end}:00`);

  while (current < endTime) {
    slots.push(format(current, "HH:mm"));
    current = addMinutes(current, duration);
  }

  return slots;
}

const isWeekend = (date) => date.getDay() === 0 || date.getDay() === 6;
const isHoliday = (date) => {
  const holidays = ['2025-01-01', '2025-12-31'];
  return holidays.includes(format(date, 'yyyy-MM-dd'));
};

export default function DateTimeSelector({ onSelect }) {
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
        try {
            const { data, error } = await supabase
            .from("reservations")
            .select("date, start_time, end_time, service");
            if (error) {
                console.error("Error fetching reservations:", error);
            } else {
                setReservations(data);
            }
        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    };
    fetchReservations();
  }, []);

  const isDateDisabled = (date) => {
    if (isBefore(date, new Date())) return true;
    if (isWeekend(date) || isHoliday(date)) return true;

    return false;
  };

  useEffect(() => {
    if (!selectedDate || !selectedService) return;

    const { duration } = services.find(s => s.value === selectedService);
    const timeSlots = generateTimeSlots("10:00", "18:00", duration);
    const selectedDateStr = format(selectedDate, "yyyy-MM-dd");

    const bookedTimes = reservations
      .filter(r =>
        r.service === selectedService &&
        r.date === selectedDateStr
      )
      .map(r => r.time);

    const free = timeSlots.filter(slot => !bookedTimes.includes(slot));
    setAvailableTimes(free);
  }, [selectedDate, selectedService, reservations]);

  return (
    <div className="mt-20 flex flex-col gap-6 text-white max-w-md mx-auto">
      <label className="text-lg">
        Service:
        <select
          className="block mt-2 p-2 rounded bg-black border border-white"
          value={selectedService}
          onChange={(e) => {
            setSelectedService(e.target.value);
            setSelectedDate(null);
            setAvailableTimes([]);
          }}
        >
          <option value="">Select service</option>
          {services.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </label>

      {selectedService && (
        <div>
          <label className="text-lg mb-2 block">Select date:</label>
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={isDateDisabled}
          />
        </div>
      )}

      {selectedDate && availableTimes.length > 0 && (
        <label className="text-lg">
          Time:
          <select
            className="block mt-2 p-2 rounded bg-black border border-white"
            onChange={(e) => onSelect({
              service: selectedService,
              date: format(selectedDate, 'yyyy-MM-dd'),
              time: e.target.value
            })}
          >
            <option value="">Select time</option>
            {availableTimes.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </label>
      )}

      {selectedDate && availableTimes.length === 0 && (
        <p className="text-red-400">No available time on the selected date</p>
      )}
    </div>
  );
}
