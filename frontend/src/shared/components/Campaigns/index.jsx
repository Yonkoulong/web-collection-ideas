import React from "react";

import { Box } from "@/shared/components";
import { HeaderComponent } from "@/shared/components/Header";
import { Navbar } from "@/shared/components/Navbar";
import { Outlet } from "react-router-dom";

export const Campaigns = () => {
  return (
    <Box sx={{ pl: "20%" }}>
      <Navbar />
      <Box>
        <HeaderComponent />
        <Outlet />
      </Box>
    </Box>
  );
};
