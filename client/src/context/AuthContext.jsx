import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        if (data.success) {
            setUser(data.data);
            localStorage.setItem('userInfo', JSON.stringify(data.data));
            return data;
        }
    };

    const register = async (name, email, password, role = 'user') => {
        const { data } = await api.post('/auth/register', { name, email, password, role });
        if (data.success) {
            setUser(data.data);
            localStorage.setItem('userInfo', JSON.stringify(data.data));
            return data;
        }
    };

    const refreshUser = async () => {
        try {
            const { data } = await api.get('/auth/profile');
            if (data.success) {
                const userInfo = localStorage.getItem('userInfo');
                const currentUser = userInfo ? JSON.parse(userInfo) : user;
                const updatedUser = { ...currentUser, ...data.data };
                setUser(updatedUser);
                localStorage.setItem('userInfo', JSON.stringify(updatedUser));
            }
        } catch (error) {
            console.error("Failed to refresh user profile", error);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userInfo');
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, register, logout, loading, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};
