import React, { useState, useEffect, useRef } from 'react';
import { services } from "../lib/services";
import { supabase } from "../lib/supabaseClient";
import {
    fetchReservationsWithFilters,
    updateReservation,
    updateClient,
    deleteReservation,
    deleteClient
  } from "../lib/db";


const AdminPanel = () => {
    const inputRef = useRef();

    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState({
        date: new Date().toISOString().split('T')[0],
        name: '',
        surname: '',
        service: ''
    });

    const handleFilters = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const [error, setError] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        name: '',
        surname: '',
        date: '',
        start_time: '',
        end_time: '',
        phone:'',
        email:'',
        service: '',
        status: 'waiting',
    });

    const statusOptions = [
        { value: 'waiting', label: 'Waiting', color: 'bg-yellow-500' },
        { value: 'finished', label: 'Finished', color: 'bg-green-500' },
        { value: 'cancel', label: 'Cancel', color: 'bg-red-500' }
    ];

    useEffect(() => {
        sendRequestQuery(new Event('submit'));
    }, []);

    const sendRequestQuery = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await fetchReservationsWithFilters(filters);
            setReservations(data);
        } catch (err) {
          console.error("Filter error:", err);
        }
        finally {
            setLoading(false);
        }
    };

    const handleEdit = (reservation) => {
        setEditingId(reservation.id);
        setEditForm({
            name: reservation.name,
            surname: reservation.surname,
            email: reservation.email,
            phone: reservation.phone,
            date: reservation.date,
            start_time: reservation.start_time,
            end_time: reservation.end_time,
            service: reservation.service,
            status: reservation.status
        });
    };

    const handleSave = async () => {
        try {
          await updateReservation(editingId, {
            service: editForm.service,
            date: editForm.date,
            start_time: editForm.start_time,
            end_time: editForm.end_time,
            status: editForm.status
          });
      
          const client = reservations.find(r => r.id === editingId);
          if (client) {
            await updateClient(client.client_id, {
              name: editForm.name,
              surname: editForm.surname,
              email: editForm.email,
              phone: editForm.phone
            });
          }
      
          setEditingId(null);
          setError('');
          window.location.reload();
        } catch (err) {
          setError('Failed to update reservation: ' + err.message);
        }
    };

    const handleDeleteReservation = async (id) => {
        await deleteReservation(id);
        window.location.reload();
    };

    const handleDeleteClient = async (id) => {
    await deleteClient(id);
    window.location.reload();
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditForm({
            name: '',
            surname: '',
            date: '',
            start_time: '',
            end_time: '',
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


    return (
        <div className="pt-20 min-h-screen  text-white">
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
                <form
                onSubmit={sendRequestQuery}
                className="flex flex-row gap-4 mb-6 items-end flex-wrap">
                    <div>
                        <label className="block text-[#e8e8e8] text-lg font-medium mb-2">
                            Filter by Date:
                        </label>
                        <input
                            type="date"
                            onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                            value={filters.date}
                            name="date"
                            onChange={handleFilters}
                            className="cursor-pointer border border-[#D41C8A] rounded-lg px-2 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#D41C8A] focus:border-transparent"
                        />
                        <button
                            type="button"
                            onClick={() => setFilters({...filters, date: ''})}
                            className="ml-3 text-[#D41C8A] hover:text-[#B8156E] transition-colors duration-300"
                        >
                            Clear Filter
                        </button>
                    </div>
                    <div>
                        <label className="block text-[#e8e8e8] text-lg font-medium mb-2">
                            Filter by Service:
                        </label>
                        <select 
                            value={filters.service || ''}
                            name="service"
                            onChange={handleFilters}
                            className="appearance-none border border-[#D41C8A] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#D41C8A] focus:border-transparent"
                        >
                            <option value='' className='text-black'>Select Service</option>
                            {Object.values(services).map(service => (
                                <option 
                                className='text-black'
                                 key={service} value={service}>{service}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-row gap-3 flex-wrap">
                        <div>
                            <label className="block text-[#e8e8e8] text-lg font-medium mb-2">
                                Filter by Name:
                            </label>
                            <input
                                type="text"
                                value={filters.name}
                                name="name"
                                onChange={handleFilters}
                                className=" border border-[#D41C8A] rounded-lg px-2 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#D41C8A] focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-[#e8e8e8] text-lg font-medium mb-2">
                                Filter by Surname:
                            </label>
                            <input
                                type="text"
                                value={filters.surname}
                                name="surname"
                                onChange={handleFilters}
                                className=" border border-[#D41C8A] rounded-lg px-2 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#D41C8A] focus:border-transparent"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-[#D41C8A] hover:bg-[#B8156E] text-white px-4 py-2 rounded-lg transition-colors duration-300"
                    >
                        Apply Filters
                    </button>
                </form>

                {/* Table Header */}
                <div className=" hidden lg:block rounded-lg p-4 mb-4 border border-[#D41C8A]">
                    <div className="text-center grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 font-semibold text-[#D41C8A]">
                        <div>Clients info</div>
                        <div className="hidden sm:block">Date</div>
                        <div className="hidden lg:block">Time</div>
                        <div className="hidden lg:block">Service</div>
                        <div className="hidden lg:block">Status</div>
                        <div>Actions</div>
                    </div>
                </div>

                <div className='flex flex-col gap-4 mb-4'>
                    {loading && (
                        <div className=" text-white">Loading...</div>
                    )}
                    <p className='text-white'>The {reservations.length} reservations have been found for your search.</p>
                </div>

                {/* Table Records */}
                <div className="space-y-4">
                    {reservations.length === 0 ? (
                        <div className="text-center text-white">No reservations found</div>
                    ) : (
                    reservations.map((reservation) => (
                    <div key={reservation.id} className=" rounded-lg p-4 border border-[#4D2039]">
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
                                            className="w-full bg-black border border-[#D41C8A] rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#D41C8A]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#e8e8e8] mb-1">Surname</label>
                                        <input
                                            type="text"
                                            value={editForm.surname}
                                            onChange={(e) => setEditForm({...editForm, surname: e.target.value})}
                                            className="w-full bg-black border border-[#D41C8A] rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#D41C8A]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#e8e8e8] mb-1">Email</label>
                                        <input
                                            type="email"
                                            value={editForm.email}
                                            onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                                            className="w-full bg-black border border-[#D41C8A] rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#D41C8A]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#e8e8e8] mb-1">Phone</label>
                                        <input
                                            type="text"
                                            value={editForm.phone}
                                            onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                                            className="w-full bg-black border border-[#D41C8A] rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#D41C8A]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#e8e8e8] mb-1">Date</label>
                                        <input
                                            type="date"
                                            onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                                            value={editForm.date}
                                            onChange={(e) => setEditForm({...editForm, date: e.target.value})}
                                            className="cursor-pointer w-full bg-black border border-[#D41C8A] rounded px-3 py-2 text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#e8e8e8] mb-1">Time</label>
                                        <input
                                            type="time"
                                            onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                                            value={editForm.start_time}
                                            onChange={(e) => setEditForm({...editForm, start_time: e.target.value})}
                                            className="w-full bg-black border border-[#D41C8A] rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#D41C8A]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#e8e8e8] mb-1">End Time</label>
                                        <input
                                            type="time"
                                            onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                                            value={editForm.end_time}
                                            onChange={(e) => setEditForm({...editForm, end_time: e.target.value})}
                                            className="cursor-pointer w-full bg-black border border-[#D41C8A] rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#D41C8A]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#e8e8e8] mb-1">Service</label>
                                        <select
                                            value={editForm.service}
                                            onChange={(e) => setEditForm({...editForm, service: e.target.value})}
                                            className="w-full bg-black border border-[#D41C8A] rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#D41C8A]"
                                        >
                                            <option value="">Select Service</option>
                                            {Object.values(services).map(service => (
                                                <option key={service} value={service}>{service}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#e8e8e8] mb-1">Status</label>
                                        <select
                                            value={editForm.status}
                                            onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                                            className="w-full bg-black border border-[#D41C8A] rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#D41C8A]"
                                        >
                                            {statusOptions.map(option => (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex gap-3 flex-col sm:flex-row sm:justify-between">
                                    <div className='flex gap-3'>
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
                                    <div className='flex gap-3 flex-wrap'>
                                        <button
                                            className="bg-gray-700 hover:bg-[#1a1919] text-white px-6 py-2 rounded-lg transition-colors duration-300"
                                            onClick={() => handleDeleteReservation(reservation.id)}                                            
                                        >
                                            Delete reservation
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClient(reservation.client_id)}
                                            className="bg-[#d41c44] hover:bg-[#91102c] text-white px-6 py-2 rounded-lg transition-colors duration-300"
                                        >
                                            Delete client
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center text-center">
                                <div className="text-center lg:text-left">
                                    <div className="text-[#e8e8e8]">{reservation.name}</div>
                                    <div className="text-[#e8e8e8]">{reservation.surname}</div>
                                    <div className="text-[#e8e8e8]">{reservation.phone}</div>
                                    <div className="text-[#e8e8e8]">{reservation.email}</div>
                                </div>
                                <div className="text-[#a1a1a1]">{reservation.date}</div>
                                <div className="text-[#a1a1a1]">{reservation.start_time?.slice(0, 5)} - {reservation.end_time?.slice(0, 5)}</div>
                                <div className="text-[#a1a1a1]">{reservation.service}</div>
                                <div className="">
                                    <span className={`px-2 py-1 rounded text-sm font-bold text-black ${getStatusColor(reservation.status)}`}>
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
                        
                    </div>
                    )))}
                </div>

                {/* Summary */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className=" rounded-lg p-4 border border-[#4D2039]">
                        <div className="text-[#D41C8A] font-semibold">Total Reservations</div>
                        <div className="text-2xl font-bold text-white">{reservations.length}</div>
                    </div>
                    <div className=" rounded-lg p-4 border border-[#4D2039]">
                        <div className="text-green-400 font-semibold">Finished</div>
                        <div className="text-2xl font-bold text-white">
                            {reservations.filter(r => r.status === 'finished').length}
                        </div>
                    </div>
                    <div className=" rounded-lg p-4 border border-[#4D2039]">
                        <div className="text-yellow-400 font-semibold">Waiting</div>
                        <div className="text-2xl font-bold text-white">
                            {reservations.filter(r => r.status === 'waiting').length}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;