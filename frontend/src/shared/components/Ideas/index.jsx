import React, { useState } from "react";
import { Navbar } from "@/shared/components/Navbar";
import { Box, Tab, TabContext, TabList, TabPanel } from "@/shared/components";
import { HeaderComponent } from "@/shared/components/Header";
import { primaryColor } from "@/shared/utils/colors.utils";
import { IdeasFiltered } from "./components/IdeasFiltered";

export const Ideas = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ pl: "20%" }}>
      <Navbar />
      <Box>
        <HeaderComponent />
        <Box>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                sx={{
                  "& .MuiTabs-indicator": {
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: primaryColor,
                  },
                  "& .MuiTabs-indicatorSpan": {
                    maxWidth: 40,
                    width: "100%",
                    backgroundColor: primaryColor,
                  },
                }}
              >
                <Tab
                  label="Most popular ideas"
                  value="1"
                  sx={{
                    fontSize: "small",
                    "&.Mui-selected": { color: primaryColor },
                  }}
                />
                <Tab
                  label="Most Viewed ideas"
                  value="2"
                  sx={{
                    fontSize: "small",
                    "&.Mui-selected": { color: primaryColor },
                  }}
                />
                <Tab
                  label="Lastest Ideas"
                  value="3"
                  sx={{
                    fontSize: "small",
                    "&.Mui-selected": { color: primaryColor },
                  }}
                />
                <Tab
                  label="Lastest Comments"
                  value="4"
                  sx={{
                    fontSize: "small",
                    "&.Mui-selected": { color: primaryColor },
                  }}
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              <IdeasFiltered />
            </TabPanel>
            <TabPanel value="2">
              <IdeasFiltered />
            </TabPanel>
            <TabPanel value="3">
              <IdeasFiltered />
            </TabPanel>
            <TabPanel value="4">
              <IdeasFiltered />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
};
