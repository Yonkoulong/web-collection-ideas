import React from "react";
import { useAppStore } from '@/stores/AppStore';
import { PageNotPermission } from '@/pages/NotPermission';

const AuthorizationRoute = ({ children, allowRoles = [] }) => {
    const userInfo = useAppStore((state) => state.userInfo);
    
    if(userInfo?.role && allowRoles.indexOf(userInfo.role) > -1) {
        return children;
    }

    return <PageNotPermission />
}   

export default AuthorizationRoute;