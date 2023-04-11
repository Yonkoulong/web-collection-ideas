import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import PieChartSharpIcon from "@mui/icons-material/PieChartSharp";
import GroupIcon from "@mui/icons-material/Group";
import { IconLightBulb } from "@/assets/icons";
import LogoutIcon from "@mui/icons-material/Logout";
import TagIcon from '@mui/icons-material/Tag';
import NavbarBottomImageLink from "@/assets/images/navbarBottom.png";
import EventIcon from '@mui/icons-material/Event';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import AssignmentIcon from '@mui/icons-material/Assignment';
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
import { useAppStore } from "@/stores/AppStore";
import { isObjectEmpty } from "@/shared/utils/constant.utils";
import { primaryColor } from "../../utils/colors.utils";
import { getLogout } from "@/services/auth.services";
import { redirectTo } from "../../utils/history";

const navList = [
  {
    to: "/admin/user-management",
    icon: <GroupIcon />,
    title: "Manages Account",
    permission: "admin",
  },
  {
    to: "/admin/departments-management",
    icon: <CheckBoxOutlineBlankIcon />,
    title: "Manages Department",
    permission: "admin",
  },
  {
    to: "/admin/campains-management",
    icon: <EventIcon />,
    title: "Manages Campaign",
    permission: "admin",
  },
  {
    to: "/qam/categories-management",
    icon: <TagIcon />,
    title: "Manages Categories",
    permission: "qam",
  },
  {
    to: "/qam/dashboard",
    icon: <PieChartSharpIcon />,
    title: "Dashboard",
    permission: "qam",
  },
  {
    to: "/campaigns",
    icon: <AssignmentIcon />,
    title: "Campaigns",
    permission: "all",
  },
];

export const Navbar = () => {
  const userInfo = useAppStore((state) => state.userInfo);
  const [navListPermission, setNavListPermission] = useState([]);

  const handleShowNavLinkByRole = () => {
    if (userInfo && !isObjectEmpty(userInfo)) {
      const newNavList = navList.filter(
        (nav) => nav?.permission === userInfo?.role || nav?.permission === "all"
      );
      setNavListPermission(newNavList);

      return newNavList;
    }
  };

  const handleLogout = async () => {
    try {
      await getLogout();
      localStorage.removeItem('token');
      redirectTo('/');
     
    } catch (error) {
      toast.error(error);
    }
  }

  useEffect(() => {
    handleShowNavLinkByRole();
  }, [userInfo]);

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
            {navListPermission.length > 0 &&
              navListPermission.map((item, index) => {
                return (
                  <NavbarItemStyled key={index}>
                    <NavLinkCustomize
                      to={item.to}
                      icon={item.icon}
                      title={item.title}
                    />
                  </NavbarItemStyled>
                );
              })}
          </NavbarListStyled>
        </NavbarStyled>
      </NavbarBody>
      <NavbarBottom>
        <NavbarBottomWrapperImage>
          <NavbarBottomImage
            src={NavbarBottomImageLink}
            alt="Navbar bottom image"
          />
        </NavbarBottomWrapperImage>
        <NavbarBottomLogout
          onClick={() => handleLogout()}
          sx={{
            marginTop: '16px',
            ':hover': {
              color: primaryColor,
              cursor: 'pointer'
            },
          }}
        >
          <LogoutIcon fontSize="small" />
          <NavbarBottomLogoutText>Logout</NavbarBottomLogoutText>
        </NavbarBottomLogout>
      </NavbarBottom>
    </NavbarContainer>
  );
};
