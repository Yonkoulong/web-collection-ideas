import React from "react";
import PieChartSharpIcon from "@mui/icons-material/PieChartSharp";
import GroupIcon from "@mui/icons-material/Group";
import { IconLightBulb, } from "@/assets/icons";
import LogoutIcon from '@mui/icons-material/Logout';
import  NavbarBottomImageLink  from "@/assets/images/navbarBottom.png";

import {
  NavbarContainer, 
  NavbarHead,
  NavbarLogoWrapper,
  NavbarBody,
  NavbarStyled,
  NavbarListStyled,
  NavbarItemStyled,
  NavbarBottom,
  NavbarBottomWrapperImage,
  NavbarBottomImage,
  NavbarBottomLogout,
  NavbarBottomLogoutText,
} from "./NavBar.styles";
import { NavLinkCustomize } from "./NavLink";

const navList = [
  {
    to: "admin/manages-account",
    icon: <PieChartSharpIcon />,
    title: "Manages Account",
  },
  {
    to: "Ideas",
    icon: <GroupIcon />,
    title: "Popular Ideas",
  },
  {
    to: "/admin/department",
    icon: <GroupIcon />,
    title: "Department",
  },
  {
    to: "/admin/campain",
    icon: <GroupIcon />,
    title: "Campaign",
  },
];

export const Navbar = () => {
  return (
    <NavbarContainer>
        <NavbarHead>
          <NavbarLogoWrapper>
              <IconLightBulb viewBox="0 0 50 50" sx={{ fontSize: "30px" }} />
          </NavbarLogoWrapper>
        </NavbarHead>
        <NavbarBody>
          <NavbarStyled>
            <NavbarListStyled>
                {navList.length > 0 &&
                navList.map((item) => {
                return (
                    <NavbarItemStyled key={item}>
                    <NavLinkCustomize
                        to={item.to}
                        icon={item.icon}
                        title={item.title}
                    />
                    </NavbarItemStyled>
                ) 
                })}
            </NavbarListStyled>
          </NavbarStyled>
        </NavbarBody>
        <NavbarBottom>
          <NavbarBottomWrapperImage>
            <NavbarBottomImage src={NavbarBottomImageLink} alt="Navbar bottom image"/>
          </NavbarBottomWrapperImage>
          <NavbarBottomLogout>
              <LogoutIcon fontSize="small"/>
              <NavbarBottomLogoutText>Logout</NavbarBottomLogoutText>
          </NavbarBottomLogout>
        </NavbarBottom>
    </NavbarContainer>
  );
};