import React, { useEffect, useContext, useState } from 'react';
import { useAuth, useUser, useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { SERVER_BASE_URL } from '../services/api';
import axios from 'axios';
import Loader from '../components/Loader';

const ClerkSync = () => {
    const { getToken, isLoaded: authLoaded } = useAuth();
    const { user: clerkUser, isLoaded: userLoaded } = useUser();
    const { signOut } = useClerk();
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [syncError, setSyncError] = useState(null);

    useEffect(() => {
        const syncAccount = async () => {
            if (authLoaded && userLoaded) {
                if (!clerkUser) {
                    navigate('/login');
                    return;
                }
                
                try {
                    const token = await getToken();
                    const payload = {
                        clerkId: clerkUser.id,
                        email: clerkUser.primaryEmailAddress?.emailAddress || 'no-email@ekabadiwala.com',
                        name: clerkUser.fullName || clerkUser.firstName || 'User',
                        profileImage: clerkUser.imageUrl
                    };
                    
                    // Directly use raw axios to BYPASS our custom API interceptor. 
                    // This prevents the global interceptor from overwriting the Clerk Header with old local tokens!
                    const response = await axios.post(`${SERVER_BASE_URL}/api/v1/auth/clerk-sync`, payload, {
                        headers: { 
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (response.data.success) {
                        setUser(response.data.data);
                        localStorage.setItem('userInfo', JSON.stringify(response.data.data));
                        navigate('/dashboard');
                    } else {
                        setSyncError(response.data.message || 'Verification failed');
                        await signOut();
                    }
                } catch (error) {
                    setSyncError(error.response?.data?.message || error.message || 'Server connection error');
                    await signOut();
                }
            }
        };
        
        syncAccount();
    }, [authLoaded, userLoaded, clerkUser, getToken, navigate, setUser, signOut]);

    if (syncError) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
                <div className="bg-red-50 text-red-600 p-8 rounded-3xl max-w-md shadow-2xl border-t-8 border-red-600">
                    <h2 className="text-2xl font-extrabold mb-2 text-dark">Sync Error</h2>
                    <p className="font-semibold mb-6 text-red-600/80">{syncError}</p>
                    <button onClick={() => { setSyncError(null); navigate('/login'); }} className="px-8 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 shadow-xl w-full uppercase tracking-wider text-sm transition-all">Back to Login</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
            <Loader />
            <p className="mt-6 text-gray-500 font-extrabold tracking-widest uppercase text-xs">Securing account via Clerk...</p>
        </div>
    );
};

export default ClerkSync;
