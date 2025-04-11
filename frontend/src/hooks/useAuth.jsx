import { useState, useEffect } from 'react';
import axios from 'axios';

function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const checkAuthStatus = async () => {
        try {
            const response = await axios.get('/api/user/isAuthenticated');
            if (response.data.loggedIn) {
                setIsLoggedIn(true);
                setUser(response.data.user);
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        } catch (err) {
            console.log("Error checking auth status:", err);
            setIsLoggedIn(false);
            setUser(null);
        }
    };

    useEffect(() => {
        checkAuthStatus(); // Call the function immediately when the component mounts
    }, []);

    return { isLoggedIn, user, revalidate: checkAuthStatus };
}

export default useAuth;
