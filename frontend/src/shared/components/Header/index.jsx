import React from "react";
import { Box, Typography, Badge, Paper, IconButton } from "@/shared/components";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { HeaderImage } from "./HeaderComponent.styles";
import { useAppStore } from "@/stores/AppStore";
import UserDefault from "@/assets/images/userdefault.jpg"
const flexCenter = {
  display: "flex",
  alignItems: "center",
};

export const HeaderComponent = () => {
  const userInfo = useAppStore((state) => state.userInfo);
  console.log(userInfo)
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
          <Typography>Welcome {userInfo?.name} (<span style={{ textTransform: 'uppercase'}}>{userInfo?.role}</span>)</Typography>
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
            <HeaderImage src={userInfo?.avartarUrl ? userInfo?.avartarUrl : <UserDefault />} />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
