import { useState, useEffect } from "react";
import { format, isBefore, addMinutes } from "date-fns";
import DatePicker from "./DatePicker";
import { servicesDuration } from "../lib/services";
import { services } from "../lib/services";
import { supabase } from "../lib/supabaseClient";


const DateTimeSelector = ({value, onChange}) => {
  const [selected, setSelected] = useState({
    service: value?.service || Object.values(services)[0],
    date: value?.date || null,
    time_start: value?.time_start || "",
    time_end: value?.time_end || ""
  });
  
  const [duration, setDuration] = useState(60);

  const [reservations, setReservations] = useState([]);
  
  useEffect(() => {
    if (selected.service && selected.date) {
      fetchReservations();
    }

  }, [selected.service, selected.date]);
  
  const handleChange = (field, val) => {
    const updated = { ...selected, [field]: val };


    if (field === "time_start" && updated.service) {
      const d = servicesDuration[updated.service] || 60;
      const start = new Date(`1970-01-01T${val}`);
      const end = addMinutes(start, d);
      updated.time_end = format(end, "HH:mm");
    }

    if (field === "service") {
      const d = servicesDuration[val] || 60;
      setDuration(d);
    }

    setSelected(updated);
    onChange(updated); 
  };

  
  const calculateEndTime = (startTime, duration) => {
    const start = new Date(`1970-01-01T${startTime}`);
    const end = addMinutes(start, duration);
    return format(end, "HH:mm");
  };

  const fetchReservations = async () => {
    const formattedDate = format(new Date(selected.date), "yyyy-MM-dd");

    const { data, error } = await supabase
      .from("reservations")
      .select("start_time, end_time")
      .eq("service", selected.service)
      .eq("date", formattedDate);

    if (error) console.error("Error fetching reservations:", error);
    else setReservations(data || []);
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

  const isFriday = (date) => date.getDay() === 5;

  const getSlotRangeForDay = (date) => {
    return isFriday(date)
      ? ["09:00", "16:00"] 
      : ["09:00", "18:00"]; 
  };

  const [slotStart, slotEnd] = getSlotRangeForDay(new Date(selected.date));

  const allSlots = generateSlots(slotStart, slotEnd, duration);

  const availableSlots = allSlots.filter(time =>
    isSlotAvailable(time, duration, reservations)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white p-6 rounded-lg border border-[#D41C8A] shadow-lg">

      <div className="flex flex-col gap-2">
        <label>Service*</label>
        <select
          className="cursor-pointer p-2 rounded-lg border border-[#4D2039] shadow-lg"
          value={selected.service}
          onChange={(e) => handleChange("service", e.target.value)}
        >
          <option value="" className="text-white bg-black">Choose service</option>
          {Object.values(services).map((service) => (
            <option key={service} 
            value={service}
            className="text-white bg-black"
            >
              {service}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label>Date*</label>
      <DatePicker
        value={selected.date ? new Date(selected.date) : null}
        onChange={(val) => handleChange("date", val)}
      />
      </div>

      <div className="flex flex-col gap-2">
        <label>Time*</label>
        <select 
          className={`cursor-pointer p-2 rounded-lg border border-[#4D2039] shadow-lg
          ${!selected.date || !selected.service ? 'opacity-50 cursor-not-allowed' : ''}`}
          value={selected.time_start}
          disabled={!selected.date || !selected.service}
          onChange={(e) => {
            handleChange("time_start", e.target.value);
          }}
        >
          <option value="" className="text-white bg-black">Choose time</option>
          {availableSlots.map((slot) => (
            <option key={slot} value={slot} className="text-white bg-black">{slot}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default DateTimeSelector