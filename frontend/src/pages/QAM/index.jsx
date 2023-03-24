import React from "react";
import { Outlet } from "react-router-dom";

import { Navbar } from "@/shared/components/Navbar";
import { HeaderComponent } from '@/shared/components/Header';

import { QAMPageContainer, QAMPageContent } from "./QAMPage.styles";

export const QAMPage = () => {
  return (
    <QAMPageContainer>
      <Navbar />
      <QAMPageContent>
        <HeaderComponent />
        <Outlet />
      </QAMPageContent>
    </QAMPageContainer>
  );
};
