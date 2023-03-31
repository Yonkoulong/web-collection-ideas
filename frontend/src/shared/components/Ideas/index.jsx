import React, { useState } from "react";
import { Navbar } from "@/shared/components/Navbar";
import { Box, Tab, TabContext, TabList, TabPanel } from "@/shared/components";
import { HeaderComponent } from "@/shared/components/Header";
import { primaryColor } from "@/shared/utils/colors.utils";
import { IdeasFiltered } from "./components/IdeasFiltered";
import { ideaFilter } from "@/shared/utils/constant.utils";

export const Ideas = () => {
  const [value, setValue] = useState(ideaFilter.ALL);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
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
              label="ideas"
              value={ideaFilter.ALL}
              sx={{
                fontSize: "small",
                "&.Mui-selected": { color: primaryColor },
              }}
            />
            <Tab
              label="Most popular ideas"
              value={ideaFilter.MOST_POPULAR}
              sx={{
                fontSize: "small",
                "&.Mui-selected": { color: primaryColor },
              }}
            />
            <Tab
              label="Most Viewed ideas"
              value={ideaFilter.MOST_VIEWED}
              sx={{
                fontSize: "small",
                "&.Mui-selected": { color: primaryColor },
              }}
            />
            <Tab
              label="Lastest Ideas"
              value={ideaFilter.LASTEST_IDEAS}
              sx={{
                fontSize: "small",
                "&.Mui-selected": { color: primaryColor },
              }}
            />
            <Tab
              label="Lastest Comments"
              value={ideaFilter.LASTEST_COMMENTS}
              sx={{
                fontSize: "small",
                "&.Mui-selected": { color: primaryColor },
              }}
            />
          </TabList>
        </Box>
        <TabPanel value={ideaFilter.ALL}>
          <IdeasFiltered filter={value} />
        </TabPanel>
        <TabPanel value={ideaFilter.MOST_POPULAR}>
          <IdeasFiltered filter={value} />
        </TabPanel>
        <TabPanel value={ideaFilter.MOST_VIEWED}>
          <IdeasFiltered filter={value} />
        </TabPanel>
        <TabPanel value={ideaFilter.LASTEST_IDEAS}>
          <IdeasFiltered filter={value} />
        </TabPanel>
        <TabPanel value={ideaFilter.LASTEST_COMMENTS}>
          <IdeasFiltered filter={value} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};
