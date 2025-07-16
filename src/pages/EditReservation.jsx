import { useParams } from 'react-router-dom';
import { supabase } from "../supabaseClient";

const EditReservation = () => {
    const { id } = useParams();

    return (    
        <div className="bg-gradient-to-br from-gray-900 via-black to-purple-900 border-b border-[#D41C8A] relative flex flex-col lg:flex-row mt-10 px-4 sm:px-6 lg:px-[10%] py-8 md:py-12 lg:py-[4rem] lg:pb-[7rem]">
            <button>Edit reservation</button>
        </div>
    )
}

export default EditReservation;