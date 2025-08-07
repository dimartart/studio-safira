import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DateTimeSelector from '../components/DateTimeSelector'
import { fetchReservationData,
  updateReservation,
  deleteReservation
 } from '../lib/db';

const EditReservation = () => {
  const { modification_token } = useParams();
  const [reservationData, setReservationData] = useState();
  const [clientData, setClientData] = useState(null);
  const [editFormData, setEditFormData] = useState({
    service: '',
    date: null,
    start_time: '',
    end_time: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchReservationData(modification_token);

        const {clients, ...reservation} = data;

        setReservationData(reservation);
        setClientData(clients);
              
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  const handleReservationChange = (partial) => {
    setEditFormData((prev) => ({ ...prev, ...partial }));
  };

  const handleCancelReservation = async () => {
    try {
      await deleteReservation(reservationData.id);
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateReservation = async (e) => {
    e.preventDefault();

    try {
      await updateReservation(reservationData.id, editFormData);

    } catch (error) {
      console.error('Error editing reservation:', error);
      console.log(error);
    } finally {
      console.log('Reservation edited successfully.');
      setIsLoading(false);
    }

    // setIsLoading(true);
    // try {
    //     const { error } = await supabase
    //         .from('reservations')
    //         .update({ date: editForm.date, time: editForm.time })
    //         .eq('modification_token', modification_token);  

    //     if (error) {
    //         console.error('Error editing reservation:', error);
    //         alert('Error editing reservation. Please try again.');
    //     } else {
    //         alert('Reservation edited successfully.');
    //     }
    // } catch (error) {
    //   console.error('Error:', error);
    //   alert('An unexpected error occurred.');
    // } finally {
    //   setIsLoading(false);
    // }
  };


  if (!reservationData || !clientData) {
    return (
      <div className="mt-10 min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="mt-10 min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Edit Reservation
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto"></div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-4 border border-white/20 shadow-2xl">
                <h2 className="text-2xl font-semibold text-white mb-6 text-center">
                Data of your reservation:
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-white/20">
                      <span className="text-gray-300 font-medium">Service:</span>
                      <span className="text-white font-semibold">{reservationData.service}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-white/20">
                      <span className="text-gray-300 font-medium">Date:</span>
                      <span className="text-white font-semibold">{reservationData.date}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-white/20">
                      <span className="text-gray-300 font-medium">Time:</span>
                      <span className="text-white font-semibold">{reservationData.start_time.slice(0, 5)} - {reservationData.end_time.slice(0, 5)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-white/20">
                      <span className="text-gray-300 font-medium">Client:</span>
                      <span className="text-white font-semibold">{clientData.name} {clientData.surname}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3">
                      <span className="text-gray-300 font-medium">Phone:</span>
                      <span className="text-white font-semibold">{clientData.phone}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                      <span className="text-gray-300 font-medium">Email:</span>
                      <span className="text-white font-semibold">{clientData.email}</span>
                  </div>
                </div>
            </div>
            <div className="flex flex-col gap-2 bg-white/10 backdrop-blur-sm rounded-2xl p-2 sm:p-8 mb-8 border border-white/20 shadow-2xl">
                <h2 className="text-2xl font-semibold text-white mb-6 text-center">
                    Enter new data and time:
                </h2>
                <form onSubmit={handleUpdateReservation} className="flex flex-col gap-4">
                    <DateTimeSelector value={editFormData} onChange={handleReservationChange} />
                    <button
                        type="submit"
                        className="px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                        disabled={isLoading}
                    >
                        Edit Reservation
                    </button>
                </form>
                <div className="text-center">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleCancelReservation}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Cancelling...' : 'Cancel Reservation'}
                    </button>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditReservation;
