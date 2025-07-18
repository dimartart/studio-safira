import { useParams } from 'react-router-dom';
import { supabase } from "../supabaseClient";
import { useState, useEffect } from 'react';

const CancelReservation = () => {
  const { modification_token } = useParams();
  const [reservationData, setReservationData] = useState(null);
  const [clientData, setClientData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const { data: reservationData, error: reservationError } = await supabase
                .from('reservation')
                .select('service, date, time, client_id')
                .eq('modification_token', modification_token)
                .single();

            if (reservationError) {
                console.error('Error fetching reservation data:', reservationError);
                return;
            }

            const { data: clientData, error: clientError } = await supabase
                .from('clients')
                .select('name, surname, phone')
                .eq('id', reservationData.client_id)
                .single();

            if (clientError) {
                console.error('Error fetching client data:', clientError);
                return;
            }

            setReservationData(reservationData);
            setClientData(clientData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
  }, [modification_token]);

  const handleCancelReservation = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('reservation')
        .delete()
        .eq('modification_token', modification_token);

      if (error) {
        console.error('Error cancelling reservation:', error);
        alert('Error cancelling reservation. Please try again.');
      } else {
        alert('Reservation cancelled successfully.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
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
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Cancel Reservation
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto"></div>
          </div>

          {/* Reservation Details Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20 shadow-2xl">
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
                <span className="text-white font-semibold">{reservationData.time}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-white/20">
                <span className="text-gray-300 font-medium">Client:</span>
                <span className="text-white font-semibold">{clientData.name} {clientData.surname}</span>
              </div>
              
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-300 font-medium">Phone:</span>
                <span className="text-white font-semibold">{clientData.phone}</span>
              </div>
            </div>
          </div>

          {/* Confirmation Section */}
          <div className="text-center">
            <h3 className="text-xl text-white mb-6 font-medium">
              Do you want to cancel the reservation?
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleCancelReservation}
                disabled={isLoading}
              >
                {isLoading ? 'Cancelling...' : 'Yes, Cancel Reservation'}
              </button>
              
              <button
                className="px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                onClick={() => window.history.back()}
              >
                No, Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelReservation;
