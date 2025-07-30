import { useState, useEffect } from "react";
import { format, isBefore, addMinutes } from "date-fns";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';
import { servicesDuration } from "../lib/services";
import { services } from "../lib/services";
import { supabase } from "../lib/supabaseClient";


const DateTimeSelector = () => {
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [duration, setDuration] = useState(60);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    if (selectedService && selectedDate) {
      fetchReservations();
    }
  }, [selectedService, selectedDate]);


  const fetchReservations = async () => {
    const formattedDate = format(selectedDate, "yyyy-MM-dd");

    try {
      const { data: reservations, error: reservationsError } = await supabase
        .from("reservations")
        .select("start_time, end_time")
        .eq("service", selectedService) 
        .eq("date", formattedDate)

      console.log(reservations)
      if (reservationsError) {
        console.error("Error fetching reservations:", reservationsError);
      }

      setReservations(reservations);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  function generateSlots(start = "10:00", end = "18:00", duration = 60) {
    const result = [];
    let current = new Date(`1970-01-01T${start}:00`);
    const endTime = new Date(`1970-01-01T${end}:00`);
  
    while (addMinutes(current, duration) <= endTime) {
      result.push(format(current, "HH:mm"));
      current = addMinutes(current, duration);
    }
  
    return result;
  }

  function isSlotAvailable(slotStartStr, duration, reservations) {
    const slotStart = new Date(`1970-01-01T${slotStartStr}:00`);
    const slotEnd = addMinutes(slotStart, duration);
  
    return reservations.every(res => {

      const resStart = new Date(`1970-01-01T${res.start_time}`);
      const resEnd = new Date(`1970-01-01T${res.end_time}`);
      return slotEnd <= resStart || slotStart >= resEnd;
    });
  }

  const allSlots = generateSlots("10:00", "18:00");

  const availableSlots = allSlots.filter(time =>
    isSlotAvailable(time, duration, reservations)
  );

  return (
    <div className="mt-20 flex flex-col gap-6 text-white max-w-md mx-auto">
      <h1>DateTimeSelector</h1>
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
      />
      {selectedDate && (
      <select
        value={selectedService}
        onChange={(e) => {
          setSelectedService(e.target.value);
        }}
      >
        {Object.values(services).map((service) => (
          <option key={service} value={service} className="text-black"
          >
            {service}
          </option>
        ))}
      </select>
      )}
      {selectedDate && selectedService && (
        <select
          value={selectedSlot}
          onChange={(e) => {
            setSelectedSlot(e.target.value);
          }}
        >
          {availableSlots.map((slot) => (
            <option key={slot} value={slot} className="text-black">{slot}</option>
          ))}
        </select>
      )}
    </div>
  );
}

export default DateTimeSelector