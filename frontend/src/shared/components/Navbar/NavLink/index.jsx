import React from 'react';
import { NavLink } from "react-router-dom";
import { NavLinkWrapper, NavLinkTitle } from './NavLink.styles';
import { inActiveColor, whiteColor, primaryColor, activeColor } from '@/shared/utils/colors.utils';

let commonStyle = {
    display: 'flex',
    borderRadius: "10px",
    padding: "16px",
}

let activeStyle = {
    ...commonStyle,
    backgroundColor: activeColor,
    color: primaryColor,
}

let inActiveStyle = {
    ...commonStyle,
    color: inActiveColor,
}   

export const NavLinkCustomize = ({ to, icon, title }) => {
    
    return (
        <NavLink to={to}
            style={({ isActive }) => 
                isActive ? activeStyle : inActiveStyle
            }   
        >
            <NavLinkWrapper>
                {icon}
                <NavLinkTitle>{title}</NavLinkTitle>
            </NavLinkWrapper>
        </NavLink>
    )
}