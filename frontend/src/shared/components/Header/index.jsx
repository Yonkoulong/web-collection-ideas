import React from "react";
import { Box, Typography, Badge, Paper, IconButton } from "@/shared/components";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { HeaderImage } from "./HeaderComponent.styles";

const flexCenter = {
  display: "flex",
  alignItems: "center",
};

export const HeaderComponent = () => {
  return (
    <Box sx={{}}>
      <Paper
        elevation={2}
        sx={{
          padding: "24px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box>
          <Typography>Welcome {}</Typography>
        </Box>
        <Box sx={flexCenter}>
          <Box sx={{...flexCenter, mr: "20px"}}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Box>
          <Box>
            <HeaderImage src="" />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
