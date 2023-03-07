import React, { useEffect, useState } from 'react';
import { Navigate, redirect } from 'react-router-dom';

import {  toast } from 'react-toastify';
import { getRefreshToken } from '@/services/auth.services';
import { useAppStore } from '@/stores/useAppStore';

const ProtectedRoute = ({ children }) => {
    const [isLogged, setIsLogged] = useState();
    const setUserInfo = useAppStore((state) => state.setUserInfo);

    useEffect(() => {
        (async () => {
            try {
                const resp = await getRefreshToken();
                
                if(resp) {
                    setUserInfo(resp?.data?.content);
                    setIsLogged(!!resp);
                }
            } catch (error) {
                console.log(error);
                const errorMessage = error?.response?.data?.content;
                setIsLogged(error?.response?.status);
                toast.error(errorMessage);
            }
        })();
    }, []);

    if(isLogged === undefined) {
        return <>loading</>
    }

    if(isLogged === false || isLogged === 400) {
        return <Navigate to="/"/>
    }

    return children;
}

export default ProtectedRoute;