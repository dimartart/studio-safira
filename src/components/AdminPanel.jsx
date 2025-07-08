import React, { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

const AdminPanel = () => {
    const [reservations, setReservations] = useState([]);
    const [filteredReservations, setFilteredReservations] = useState([]);

    // Filters
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedService, setSelectedService] = useState('');
    const [filters, setFilters] = useState({
        date: '',
        service: ''
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        name: '',
        surname: '',
        date: '',
        time: '',
        service: '',
        status: 'waiting'
    });

    // Services list matching your website
    const services = [
        'kadernictvi',
        'kosmetika',
        'masaze',
        'pedikura',
        'lymfaticka drenaze'
    ];

    // Status options
    const statusOptions = [
        { value: 'waiting', label: 'Waiting', color: 'bg-yellow-500' },
        { value: 'finished', label: 'Finished', color: 'bg-green-500' },
        { value: 'cancel', label: 'Cancel', color: 'bg-red-500' }
    ];

    useEffect(() => {
        fetchReservations();
    }, []);

    useEffect(() => {
        let results = reservations;

        if (selectedDate) {
            results = results.filter(reservation => 
                reservation.date === selectedDate
            );
        }

        if (selectedService) {
            results = results.filter(reservation => 
                reservation.service === selectedService
            );
        }
        
        setFilteredReservations(results);

    }, [reservations, selectedDate, selectedService]);

    const fetchReservations = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('reservation')
                .select(`
                    id,
                    date, 
                    time,
                    service,
                    status,
                    clients (
                        id,
                        name,
                        surname,
                        phone,
                        email
                    )
                `)

            if (error) throw error;

            const formattedData = data.map(reservation => ({
                id: reservation.id,
                date: reservation.date,
                time: reservation.time,
                service: reservation.service,
                status: reservation?.status || 'waiting',
                name: reservation.clients?.name || '',
                surname: reservation.clients?.surname || '',
                phone: reservation.clients?.phone || '',
                email: reservation.clients?.email || '',
                client_id: reservation.clients?.id
            }));

            setReservations(formattedData);
            setError('');
        } catch (err) {
            setError('Failed to fetch reservations: ' + err.message);
            console.error('Error fetching reservations:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (reservation) => {
        setEditingId(reservation.id);
        setEditForm({
            name: reservation.name,
            surname: reservation.surname,
            date: reservation.date,
            time: reservation.time,
            service: reservation.service,
            status: reservation.status
        });
    };

    const handleSave = async () => {
        try {
            // Update reservation table
            const { error: reservationError } = await supabase
                .from('reservation')
                .update({
                    service: editForm.service,
                    date: editForm.date,
                    time: editForm.time,
                    status: editForm.status
                })
                .eq('id', editingId);

            if (reservationError) throw reservationError;

            // Update client table
            const reservation = reservations.find(r => r.id === editingId);
            if (reservation) {
                const { error: clientError } = await supabase
                    .from('clients')
                    .update({
                        name: editForm.name,
                        surname: editForm.surname
                    })
                    .eq('id', reservation.client_id);

                if (clientError) throw clientError;
            }

            // Refresh data
            await fetchReservations();
            setEditingId(null);
            setError('');
        } catch (err) {
            setError('Failed to update reservation: ' + err.message);
            console.error('Error updating reservation:', err);
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditForm({
            name: '',
            surname: '',
            date: '',
            time: '',
            service: '',
            status: 'waiting'
        });
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    const getStatusColor = (status) => {
        const statusOption = statusOptions.find(option => option.value === status);
        return statusOption ? statusOption.color : 'bg-gray-500';
    };

    if (loading) return (
        <div className="min-h-screen bg-[#1B191A] flex items-center justify-center">
            <div className="text-white text-xl">Loading...</div>
        </div>
    );

    return (
        <div className="pt-20 min-h-screen bg-[#1B191A] text-white">
            <div className="px-4 sm:px-6 lg:px-[10%] py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-[#D41C8A] mb-4 sm:mb-0">
                        Admin Panel
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                    >
                        Logout
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-600 text-white p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {/* Filters */}
                <div className="flex gap-1 flex-col">
                    <div className="mb-6">
                        <label className="block text-[#e8e8e8] text-lg font-medium mb-2">
                            Filter by Date:
                        </label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="bg-[#2A2A2A] border border-[#D41C8A] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#D41C8A] focus:border-transparent"
                        />
                        {selectedDate && (
                            <button
                                onClick={() => setSelectedDate('')}
                                className="ml-3 text-[#D41C8A] hover:text-[#B8156E] transition-colors duration-300"
                            >
                                Clear Filter
                            </button>
                        )}
                    </div>
                    <div className="mb-6">
                        <label className="block text-[#e8e8e8] text-lg font-medium mb-2">
                            Filter by Service:
                        </label>
                        <select 
                            value={selectedService}
                            onChange={(e) => setSelectedService(e.target.value)}
                            className="bg-[#2A2A2A] border border-[#D41C8A] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#D41C8A] focus:border-transparent"
                        >
                            <option value="">Select Service</option>
                            {services.map(service => (
                                <option key={service} value={service}>{service}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Table Header */}
                <div className="bg-[#2A2A2A] rounded-lg p-4 mb-4 border border-[#D41C8A]">
                    <div className="text-center grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 font-semibold text-[#D41C8A]">
                        <div>Clients info</div>
                        <div className="hidden sm:block">Date</div>
                        <div className="hidden lg:block">Time</div>
                        <div className="hidden lg:block">Service</div>
                        <div className="hidden lg:block">Status</div>
                        <div>Actions</div>
                    </div>
                </div>

                {/* Table Records */}
                <div className="space-y-4">
                    {filteredReservations.length === 0 ? (
                        <div className=" text-[#a1a1a1] py-8">
                            No reservations found for the selected date.
                        </div>
                    ) : (
                        filteredReservations.map((reservation) => (
                            <div key={reservation.id} className="bg-[#2A2A2A] rounded-lg p-4 border border-[#4D2039]">
                                {editingId === reservation.id ? (
                                    // Edit Mode
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-[#e8e8e8] mb-1">Name</label>
                                                <input
                                                    type="text"
                                                    value={editForm.name}
                                                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                                    className="w-full bg-[#1B191A] border border-[#D41C8A] rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#D41C8A]"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#e8e8e8] mb-1">Surname</label>
                                                <input
                                                    type="text"
                                                    value={editForm.surname}
                                                    onChange={(e) => setEditForm({...editForm, surname: e.target.value})}
                                                    className="w-full bg-[#1B191A] border border-[#D41C8A] rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#D41C8A]"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#e8e8e8] mb-1">Date</label>
                                                <input
                                                    type="date"
                                                    value={editForm.date}
                                                    onChange={(e) => setEditForm({...editForm, date: e.target.value})}
                                                    className="w-full bg-[#1B191A] border border-[#D41C8A] rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#D41C8A]"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#e8e8e8] mb-1">Time</label>
                                                <input
                                                    type="time"
                                                    value={editForm.time}
                                                    onChange={(e) => setEditForm({...editForm, time: e.target.value})}
                                                    className="w-full bg-[#1B191A] border border-[#D41C8A] rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#D41C8A]"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#e8e8e8] mb-1">Service</label>
                                                <select
                                                    value={editForm.service}
                                                    onChange={(e) => setEditForm({...editForm, service: e.target.value})}
                                                    className="w-full bg-[#1B191A] border border-[#D41C8A] rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#D41C8A]"
                                                >
                                                    <option value="">Select Service</option>
                                                    {services.map(service => (
                                                        <option key={service} value={service}>{service}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#e8e8e8] mb-1">Status</label>
                                                <select
                                                    value={editForm.status}
                                                    onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                                                    className="w-full bg-[#1B191A] border border-[#D41C8A] rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#D41C8A]"
                                                >
                                                    {statusOptions.map(option => (
                                                        <option key={option.value} value={option.value}>{option.label}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={handleSave}
                                                className="bg-[#D41C8A] hover:bg-[#B8156E] text-white px-6 py-2 rounded-lg transition-colors duration-300"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors duration-300"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (

                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center text-center">
                                        <div className="text-left">
                                            <div className="text-[#e8e8e8]">{reservation.name}</div>
                                            <div className="text-[#e8e8e8]">{reservation.surname}</div>
                                            <div className="text-[#e8e8e8]">{reservation.phone}</div>
                                            <div className="text-[#e8e8e8]">{reservation.email}</div>
                                        </div>
                                        <div className="text-[#a1a1a1]">{reservation.date}</div>
                                        <div className="text-[#a1a1a1]">{reservation.time}</div>
                                        <div className="text-[#a1a1a1]">{reservation.service}</div>
                                        <div className="">
                                            <span className={`px-2 py-1 rounded text-xs font-medium text-white ${getStatusColor(reservation.status)}`}>
                                                {statusOptions.find(s => s.value === reservation.status)?.label || 'waiting'}
                                            </span>
                                        </div>
                                        <div>
                                            <button
                                                onClick={() => handleEdit(reservation)}
                                                className="bg-[#D41C8A] hover:bg-[#B8156E] text-white px-4 py-2 rounded-lg transition-colors duration-300 text-sm"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                )}
                                
                                {/* Mobile View - Show extra details */}
                                <div className="sm:hidden lg:hidden mt-3 pt-3 border-t border-[#4D2039]">
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div className="text-[#a1a1a1]">Date: {reservation.date}</div>
                                        <div className="text-[#a1a1a1]">Time: {reservation.time}</div>
                                        <div className="text-[#a1a1a1]">Service: {reservation.service}</div>
                                        <div className="text-[#a1a1a1]">
                                            Status: <span className={`px-2 py-1 rounded text-xs font-medium text-white ${getStatusColor(reservation.status)}`}>
                                                {statusOptions.find(s => s.value === reservation.status)?.label || 'waiting'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Summary */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-[#2A2A2A] rounded-lg p-4 border border-[#4D2039]">
                        <div className="text-[#D41C8A] font-semibold">Total Reservations</div>
                        <div className="text-2xl font-bold text-white">{filteredReservations.length}</div>
                    </div>
                    <div className="bg-[#2A2A2A] rounded-lg p-4 border border-[#4D2039]">
                        <div className="text-green-400 font-semibold">Finished</div>
                        <div className="text-2xl font-bold text-white">
                            {filteredReservations.filter(r => r.status === 'finished').length}
                        </div>
                    </div>
                    <div className="bg-[#2A2A2A] rounded-lg p-4 border border-[#4D2039]">
                        <div className="text-yellow-400 font-semibold">Waiting</div>
                        <div className="text-2xl font-bold text-white">
                            {filteredReservations.filter(r => r.status === 'waiting').length}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;