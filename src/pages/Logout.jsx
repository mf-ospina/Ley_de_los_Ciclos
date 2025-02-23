import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout({ setIsLoggedIn }) {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
        navigate('/');
    }, [navigate, setIsLoggedIn]);
    return null;
}

export default Logout;
