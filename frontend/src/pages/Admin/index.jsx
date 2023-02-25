import React from "react";
import { Navbar } from "@/shared/components/Navbar";
import { AdminPageContainer, AdminPageContent } from "./AdminPage.style";

export const AdminPage = () => {
  return (
    <AdminPageContainer>
      <Navbar />
      <AdminPageContent>This is content</AdminPageContent>
    </AdminPageContainer>
  );
};
