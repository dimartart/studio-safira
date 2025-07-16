import { useParams } from 'react-router-dom';
import { supabase } from "../supabaseClient";

const CancelReservation = () => {
    return (
        <div>
            <button onClick={async () => {
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