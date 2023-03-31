import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { HeaderComponent } from "@/shared/components/Header";
import { Navbar } from "@/shared/components/Navbar";
import { styled } from "@mui/material/styles";

import {
  Box,
  Paper,
  Typography,
  IconButton,
  InputAdornment,
  Badge,
  TextField,
} from "@/shared/components";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import CommentIcon from "@mui/icons-material/Comment";
import ImageIcon from "@mui/icons-material/Image";

import {
  primaryColor,
  backgroundColor,
  activeColor,
} from "@/shared/utils/colors.utils";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 20,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export const IdeaDetail = () => {
  const { idIdea } = useParams();

  useEffect(() => {
    if(idIdea) {

    }
  }, []);

  return (
    <Box>
      <Paper
        elevation={3}
        sx={{
          margin: "16px",
          padding: "24px",
          height: "calc(100vh - 136.4px)",
          overflow: "hidden",
        }}
      >
        <Box>
          <Typography fontSize="28px" fontWeight="bold">
            Why Reac Native is important on code?
          </Typography>
          <Typography fontSize="medium">Today, 6m ago</Typography>
        </Box>
        <Box>
          <img src="" alt="" />
        </Box>
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            borderRadius: "40px",
            padding: "16px 0px",
          }}
        >
          <IconButton aria-label="thumb-up">
            <StyledBadge badgeContent={4} color="secondary">
              <ThumbUpIcon />
            </StyledBadge>
          </IconButton>

          <IconButton aria-label="comment">
            <StyledBadge badgeContent={4} color="secondary">
              <CommentIcon />
            </StyledBadge>
          </IconButton>
          <IconButton aria-label="thumb-down">
            <StyledBadge badgeContent={4} color="secondary">
              <ThumbDownAltIcon />
            </StyledBadge>
          </IconButton>
        </Paper>
        <Box mt={3}>
          <TextField
            id="input-with-icon-textfield"
            label=""
            placeholder="Comment"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <ImageIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            fullWidth
            sx={{
              ".MuiInputBase-root": {
                borderRadius: "40px",
              },
            }}
          />
        </Box>

        <Box mt={3}>
          <Box
            sx={{
              maxHeight: "calc(100vh - 450px)",
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Box
                width={50}
                height={40}
                sx={{ border: "1px solid ", borderRadius: "50px" }}
              >
                <img
                  src="#"
                  alt=""
                  sx={{
                    borderRadius: "50px",
                    objectFit: "contain",
                    width: "100%",
                  }}
                />
              </Box>
              <Box
                sx={{
                  marginLeft: "8px",
                  backgroundColor: activeColor,
                  padding: "8px 16px",
                  borderRadius: "20px",
                }}
              >
                <Typography fontSize="medium" fontWeight="bold">
                  Nguyen Hai Long
                </Typography>
                <Box fontSize="medium">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laborum aperiam necessitatibus voluptates, at dolorum nulla
                  aliquam magni animi debitis inventore obcaecati quibusdam!
                  Fuga maxime doloribus debitis error similique consectetur
                  quos?
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
