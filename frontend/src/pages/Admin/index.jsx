import React from "react";
import { Outlet } from 'react-router-dom';
import { Navbar } from "@/shared/components/Navbar";
import { HeaderComponent } from '@/shared/components/Header';
import { AdminPageContainer, AdminPageContent } from "./AdminPage.style";

export const AdminPage = () => {
  return (
    <AdminPageContainer>
      <Navbar />
      <AdminPageContent>
        <HeaderComponent />
        <Outlet />
      </AdminPageContent>
    </AdminPageContainer>
  );
};
