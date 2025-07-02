import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

const Supabase = () => {
    const [instruments, setInstruments] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        phone: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
      getInstruments();
    }, []);
    
    async function getInstruments() {
      const { data } = await supabase.from("clients").select('*');
      setInstruments(data);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        try {
            const { data, error } = await supabase
                .from('clients')
                .insert([formData]);

            if (error) throw error;

            setMessage('Contact submitted successfully!');
            setFormData({ name: '', surname: '', email: '', phone: '' });
        } catch (error) {
            setMessage('Error: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="text-white" style={{ padding: '100px', maxWidth: '600px', margin: '0 auto' }}>
                <h2>Contact Form</h2>
                <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            placeholder="Enter your name"
                            onChange={handleInputChange}
                            required
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="surname" style={{ display: 'block', marginBottom: '5px' }}>Surname:</label>
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            value={formData.surname}
                            placeholder="Enter your surname"
                            onChange={handleInputChange}
                            required
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            placeholder="Enter your email"
                            onChange={handleInputChange}
                            required
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="phone" style={{ display: 'block', marginBottom: '5px' }}>Phone:</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            placeholder="Enter your phone"
                            onChange={handleInputChange}
                            required
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        style={{ 
                            padding: '10px 20px', 
                            backgroundColor: '#007bff', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '4px',
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            opacity: isSubmitting ? 0.6 : 1
                        }}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </form>

                {message && (
                    <div style={{ 
                        padding: '10px', 
                        marginBottom: '20px',
                        backgroundColor: message.startsWith('Error') ? '#f8d7da' : '#d4edda',
                        color: message.startsWith('Error') ? '#721c24' : '#155724',
                        border: `1px solid ${message.startsWith('Error') ? '#f5c6cb' : '#c3e6cb'}`,
                        borderRadius: '4px'
                    }}>
                        {message}
                    </div>
                )}

                <h3>Submitted Contacts</h3>
                <div>
                    {instruments.map((item, index) => (
                        <div key={index} style={{ 
                            border: '1px solid #ddd', 
                            padding: '10px', 
                            marginBottom: '10px',
                            borderRadius: '4px'
                        }}>
                            {Object.entries(item).map(([key, value]) => (
                                <div key={key} style={{ marginBottom: '5px' }}>
                                    <strong>{key}:</strong> {value}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )

}

export default Supabase;