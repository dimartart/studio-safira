import { useParams } from 'react-router-dom';
import { supabase } from "../supabaseClient";

const CancelReservation = () => {
    return (
        <div className="bg-gradient-to-br from-gray-900 via-black to-purple-900 border-b border-[#D41C8A] relative flex flex-col lg:flex-row mt-10 px-4 sm:px-6 lg:px-[10%] py-8 md:py-12 lg:py-[4rem] lg:pb-[7rem]">
            <button className="text-white text-2xl font-bold" onClick={async () => {
                await supabase
                .from('reservations')
                .delete()
                .eq('modification_token', id);
                alert('Reservation cancelled.');
                }}>
                Cancel reservation
            </button>
        </div>
    )
}

export default CancelReservation;