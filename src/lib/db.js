import { supabase } from './supabaseClient';
import { format } from 'date-fns';

export const fetchReservationData = async (token) => {
  const { data, error } = await supabase
    .from('reservations')
    .select('id, date, start_time, end_time, service, clients (name, surname, phone, email)')
    .eq('modification_token', token)
    .single();
  return data;
};

export async function createReservationWithClient(formData) {
  
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

export const fetchReservationsWithFilters = async (filters) => {
  let clientIds = [];

  if (filters.name || filters.surname) {
    const { data: clients, error } = await supabase
      .from('clients')
      .select('id')
      .ilike('name', `%${filters.name || ''}%`)
      .ilike('surname', `%${filters.surname || ''}%`);

    if (error) throw error;
    clientIds = clients.map((c) => c.id);
  }

  let query = supabase
    .from('reservations')
    .select(`
      id,
      date,
      start_time,
      end_time,
      service,
      status,
      clients (name, surname, phone, email, id)
    `);

  if (clientIds.length > 0) query = query.in('client_id', clientIds);
  if (filters.service) query = query.ilike('service', `%${filters.service}%`);
  if (filters.date) {
    const formattedDate = new Date(filters.date).toISOString().split('T')[0];
    query = query.eq('date', formattedDate);
  }

  const { data, error } = await query;
  if (error) throw error;

  return data.map((r) => ({
    id: r.id,
    date: r.date,
    start_time: r.start_time,
    end_time: r.end_time,
    service: r.service,
    status: r.status || 'waiting',
    name: r.clients?.name || '',
    surname: r.clients?.surname || '',
    phone: r.clients?.phone || '',
    email: r.clients?.email || '',
    client_id: r.clients?.id || ''
  }));
};

export const updateReservation = async (id, updates) => {
  const { error } = await supabase
    .from('reservations')
    .update(updates)
    .eq('id', id);
  if (error) throw error;
};

export const updateClient = async (id, updates) => {
  const { error } = await supabase
    .from('clients')
    .update(updates)
    .eq('id', id);
  if (error) throw error;
};

export const deleteReservation = async (id) => {
  const { error } = await supabase.from('reservations').delete().eq('id', id);
  if (error) throw error;
};

export const deleteClient = async (id) => {
  const { error } = await supabase.from('clients').delete().eq('id', id);
  if (error) throw error;
};