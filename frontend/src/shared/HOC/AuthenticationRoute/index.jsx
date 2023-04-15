import React, { useEffect, useState } from 'react';
import { Navigate, redirect } from 'react-router-dom';

import {  toast } from 'react-toastify';
import { getRefreshToken } from '@/services/auth.services';
import { useAppStore } from '@/stores/AppStore';
import { redirectTo } from '../../utils/history';

const ProtectedRoute = ({ children }) => {
    const [isLogged, setIsLogged] = useState();
    const setUserInfo = useAppStore((state) => state.setUserInfo);

    useEffect(() => {
        (async () => {
            try {
                const resp = await getRefreshToken();
                
                if(resp) {
                    localStorage.setItem('token', resp?.data?.accesToken);
                    setUserInfo(resp?.data?.foundAccount);
                    setIsLogged(!!resp);
                }
            } catch (error) {
                const errorMessage = error?.response?.status;
                setIsLogged(error?.response?.status);
                toast.error(errorMessage);

                if(errorMessage == 403) {
                    redirectTo('/');
                    localStorage.removeItem('token');
                }
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