import { supabase } from './supabaseClient';
import { format, addMinutes } from 'date-fns';

/**
 * Создание резервации с клиентом.
 * - Если клиент с таким email уже есть — использует его.
 * - Иначе создаёт нового.
 * - Затем создаёт резервацию.
 * @param {Object} formData — данные из формы
 * @param {number} duration — длительность услуги в минутах
 */

export async function createReservationWithClient(formData) {
  // 1. Найти или создать клиента
  const { data: existingClient, error: fetchError } = await supabase
    .from("clients")
    .select("id")
    .eq("email", formData.email)
    .maybeSingle();

  if (fetchError) throw fetchError;

  let clientId = existingClient?.id;

  if (!clientId) {
    const { data: newClient, error: insertError } = await supabase
      .from("clients")
      .insert({
        name: formData.name,
        surname: formData.surname,
        phone: formData.phone,
        email: formData.email
      })
      .select()
      .single();

    if (insertError) throw insertError;
    clientId = newClient.id;
  }

  // 2. Создать токен и посчитать end_time
//   const startTime = formData.time;
//   const start = new Date(`1970-01-01T${startTime}:00`);
//   const end = addMinutes(start, duration);
//   const endTime = format(end, 'HH:mm');

  const modification_token = crypto.randomUUID();

  // 3. Создать резервацию
  const { data: reservation, error: reservationError } = await supabase
    .from("reservations")
    .insert({
      client_id: clientId,
      service: formData.service,
      date: format(formData.date, "yyyy-MM-dd"),
      start_time: formData.time_start,
      end_time: formData.time_end,
      modification_token
    })
    .select()
    .single();

  if (reservationError) throw reservationError;

  return reservation;
}
