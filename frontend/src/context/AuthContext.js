import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // To navigate between different routes after login/logout
import axiosInstance from '../api/api'; // Axios Instance for API Calls
import { toast } from 'react-toastify'; // To show notification

const AuthContext = createContext(); // Create a context for authentication

const AuthProvider = ({ children }) => {  // Destructure `children` from props
    const [user, setUser] = useState(null); // State to store the authenticated user's data
    const [loading, setLoading] = useState(true); // State to show a loading status during initial authentication check
    const navigate = useNavigate(); // This hook is used to navigate between pages (e.g., redirect to dashboard after login)

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('userInfo')); // Retrieves user info from localStorage
        if (storedUser) {
            setUser(storedUser); // If user data found in localStorage, it sets the user state
        }
        setLoading(false); // After checking for user, stop the loading state
    }, []);

    const login = async (email, password) => {
        try {
            // Making POST request to the login API endpoint
            const { data } = await axiosInstance.post('/users/login', { email, password });

            // Save user data to state and localStorage for session persistence
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));

            // Show success message and navigate to the appropriate dashboard based on user role
            toast.success('Login Successful');
            navigate(data.role === 'admin' ? '/admin' : '/user'); // Redirect to admin or user dashboard 
        } catch (error) {
            // If login fails, show error message
            toast.error('Invalid email or password');
        }
    };

    const logout = () => {
        setUser(null); // Clear user data from the state.
        localStorage.removeItem('userInfo'); // Remove user info from localStorage
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children} {/* Render the children prop */}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
