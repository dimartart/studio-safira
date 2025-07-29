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
  const [duration, setDuration] = useState(60);
  const [reservations, setReservations] = useState([]);


  const fetchReservations = async () => {
    try {
      const { data: reservations, error: reservationsError } = await supabase
        .from("reservations")
        .select("start_time", "end_time", "client_id")
        .eq("service", selectedService) 

      if (reservationsError) {
        console.error("Error fetching reservations:", reservationsError);
      }

      setReservations(reservations);
      console.log(reservations);
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
      const resStart = new Date(`1970-01-01T${res.start_time}:00`);
      const resEnd = new Date(`1970-01-01T${res.end_time}:00`);
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
        onChange={(e) => {
          setSelectedService(e.target.value);
        }}
      >
        {Object.values(services).map((service) => (
          <option key={service} value={service} className="text-black"
          defaultValue={null}
          >
            {service}
          </option>
        ))}
      </select>
      )}
      {selectedDate && selectedService && (
        <div>
        </div>
      )}
    </div>
  );
}

export default DateTimeSelector;