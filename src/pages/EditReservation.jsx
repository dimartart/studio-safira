import { useParams } from 'react-router-dom';
import { supabase } from "../supabaseClient";

const EditReservation = () => {
    const { id } = useParams();

    return (    
        <div>
            <button>Edit reservation</button>
        </div>
    )
}

export default EditReservation;