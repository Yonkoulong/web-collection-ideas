import React, { useEffect, useState } from "react";
import PieChartSharpIcon from "@mui/icons-material/PieChartSharp";
import GroupIcon from "@mui/icons-material/Group";
import { IconLightBulb } from "@/assets/icons";
import LogoutIcon from "@mui/icons-material/Logout";
import NavbarBottomImageLink from "@/assets/images/navbarBottom.png";

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

const navList = [
  {
    to: "/admin/user-management",
    icon: <PieChartSharpIcon />,
    title: "Manages Account",
    permission: "admin",
  },
  {
    to: "/ideas",
    icon: <GroupIcon />,
    title: "Ideas",
    permission: "all",
  },
  {
    to: "/admin/departments",
    icon: <GroupIcon />,
    title: "Department",
    permission: "admin",
  },
  {
    to: "/admin/campains",
    icon: <GroupIcon />,
    title: "Campaign",
    permission: "admin",
  },
  {
    to: "/qam/categories",
    icon: <GroupIcon />,
    title: "Categories",
    permission: "qam",
  },
  {
    to: "/qam/dashboard",
    icon: <GroupIcon />,
    title: "Dashboard",
    permission: "qam",
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
        <NavbarBottomLogout>
          <LogoutIcon fontSize="small" />
          <NavbarBottomLogoutText>Logout</NavbarBottomLogoutText>
        </NavbarBottomLogout>
      </NavbarBottom>
    </NavbarContainer>
  );
};
