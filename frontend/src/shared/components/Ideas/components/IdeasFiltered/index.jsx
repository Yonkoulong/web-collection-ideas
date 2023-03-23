import React, { useState } from "react";

import {
  Box,
  Button,
  Popover,
  Typography,
  IconButton,
  Pagination,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@/shared/components";
import { SearchCustomize } from "@/shared/components/Search";
import Badge from "@mui/material/Badge";

import { styled } from "@mui/material/styles";

import DownloadIcon from "@mui/icons-material/Download";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import DescriptionIcon from "@mui/icons-material/Description";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  primaryColor,
  backgroundColor,
  activeColor,
} from "@/shared/utils/colors.utils";
import { enumRoles } from "@/shared/utils/constant.utils";

import {
  IdeasWrapper,
  IdeaItem,
  IdeaItemHead,
  IdeaItemHeadImage,
  IdeaItemHeadTitle,
  IdeaItemHeadNameWrapper,
  IdeaItemHeadNameText,
  IdeaItemHeadDateText,
  IdeaItemBody,
  IdeaItemContent,
  IdeaItemBottom,
} from "./IdeasFiltered.styles";

import { useAppStore } from "@/stores/AppStore";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 20,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const flexCenter = {
  display: "flex",
  alignItems: "center",
};

export const IdeasFiltered = () => {
  const [age, setAge] = React.useState("");
  const userInfo = useAppStore((state) => state.userInfo);

  const [anchorSortEl, setAnchorSortEl] = useState(null);
  const [anchorDownloadEl, setAnchorDownloadEl] = useState(null);

  //sort
  const handleClickSortAnchor = (event) => {
    setAnchorSortEl(event.currentTarget);
  };

  const handleCloseSortAnchor = () => {
    setAnchorSortEl(null);
  };

  //download
  const handleClickDownloadAnchor = (event) => {
    setAnchorDownloadEl(event.currentTarget);
  };

  const handleCloseDownloadAnchor = () => {
    setAnchorDownloadEl(null);
  };

  //select department
  const handleChangeDepartment = (e) => {
    setAge(e.target.value);
  };

  const openSortAnchor = Boolean(anchorSortEl);
  const openDownloadAnchor = Boolean(anchorDownloadEl);

  const idSortAnchor = openSortAnchor ? "sort-popover" : undefined;
  const idDownloadAnchor = openDownloadAnchor ? "download-popover" : undefined;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent:
            userInfo.role == enumRoles.ADMIN || userInfo.role == enumRoles.QAM
              ? "space-between"
              : "flex-end",
        }}
      >
        <Box>
          {userInfo.role == enumRoles.QAM ? (
            <Box>
              <Button
                aria-describedby={idDownloadAnchor}
                onClick={handleClickDownloadAnchor}
                variant="contained"
                endIcon={<DownloadIcon />}
                sx={{ fontSize: "15px" }}
              >
                Download
              </Button>

              <Popover
                id={idDownloadAnchor}
                open={openDownloadAnchor}
                anchorEl={anchorDownloadEl}
                onClose={handleCloseDownloadAnchor}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Box
                  sx={{
                    ...flexCenter,
                    padding: 2,
                    gap: 1,
                    ":hover": {
                      backgroundColor: activeColor,
                      color: primaryColor,
                      cursor: "pointer",
                    },
                  }}
                >
                  <Typography fontSize="small">CSV</Typography>
                  <DescriptionIcon fontSize="small" />
                </Box>
                <Box
                  sx={{
                    ...flexCenter,
                    padding: 2,
                    gap: 2,

                    ":hover": {
                      backgroundColor: activeColor,
                      color: primaryColor,
                      cursor: "pointer",
                    },
                  }}
                >
                  <Typography fontSize="small">Zip</Typography>
                  <FolderZipIcon fontSize="small" />
                </Box>
              </Popover>
            </Box>
          ) : null}

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel
              id="select-helper-label"
              sx={{ fontSize: "15px", top: "-8px" }}
            >
              Department
            </InputLabel>
            <Select
              labelId="select-helper-label"
              id="select-helper"
              label="Department"
              value={age}
              onChange={handleChangeDepartment}
              sx={{
                fontSize: "15px",
                ".MuiSelect-select": { padding: "8.5px 14px" },
              }}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ mr: 2 }}>
            <SearchCustomize />
          </Box>
          <Box>
            <Button
              aria-describedby={idSortAnchor}
              variant="contained"
              onClick={handleClickSortAnchor}
              sx={{ fontSize: "15px" }}
            >
              Sort by
            </Button>

            <Popover
              id={idSortAnchor}
              open={openSortAnchor}
              anchorEl={anchorSortEl}
              onClose={handleCloseSortAnchor}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Box
                sx={{
                  ":hover": {
                    backgroundColor: activeColor,
                    color: primaryColor,
                  },
                }}
              >
                <Typography sx={{ p: 1, cursor: "pointer" }} fontSize="small">
                  Name
                </Typography>
              </Box>
              <Box
                sx={{
                  ":hover": {
                    backgroundColor: activeColor,
                    color: primaryColor,
                  },
                }}
              >
                <Typography sx={{ p: 1, cursor: "pointer" }} fontSize="small">
                  Closure Date
                </Typography>
              </Box>
              <Box
                sx={{
                  ":hover": {
                    backgroundColor: activeColor,
                    color: primaryColor,
                  },
                }}
              >
                <Typography sx={{ p: 1, cursor: "pointer" }} fontSize="small">
                  Final Closure Date
                </Typography>
              </Box>
            </Popover>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box mt={2} mb={3}>
          <IdeasWrapper>
            <IdeaItem elevation={3}>
              <IdeaItemHead>
                <Box
                  width="50px"
                  height="50px"
                  border="1px solid"
                  borderRadius="50%"
                >
                  <IdeaItemHeadImage />
                </Box>
                <Box ml={2}>
                  <IdeaItemHeadTitle>
                    Why React is important for frontend?
                  </IdeaItemHeadTitle>
                  <IdeaItemHeadNameWrapper>
                    <IdeaItemHeadNameText>Long Yonkou</IdeaItemHeadNameText>-
                    <IdeaItemHeadDateText>
                      February 24 2023, 15:25:25
                    </IdeaItemHeadDateText>
                  </IdeaItemHeadNameWrapper>
                </Box>
              </IdeaItemHead>
              <IdeaItemBody>
                <IdeaItemContent>text.file</IdeaItemContent>
              </IdeaItemBody>
              <IdeaItemBottom>
                <Box sx={{ display: "flex", gap: "8px" }}>
                  <IconButton aria-label="thumb-up">
                    <StyledBadge badgeContent={4} color="secondary">
                      <ThumbUpIcon fontSize="small" />
                    </StyledBadge>
                  </IconButton>
                  <IconButton aria-label="thumb-down">
                    <StyledBadge badgeContent={4} color="secondary">
                      <ThumbDownAltIcon fontSize="small" />
                    </StyledBadge>
                  </IconButton>
                  <IconButton aria-label="comment">
                    <StyledBadge badgeContent={4} color="secondary">
                      <CommentIcon fontSize="small" />
                    </StyledBadge>
                  </IconButton>
                </Box>
                <Box>
                  <IconButton aria-label="eye">
                    <StyledBadge badgeContent={4} color="secondary">
                      <VisibilityIcon fontSize="small" />
                    </StyledBadge>
                  </IconButton>
                </Box>
              </IdeaItemBottom>
            </IdeaItem>
          </IdeasWrapper>
        </Box>
        <Stack
          spacing={2}
          sx={{
            ".MuiPagination-root": {
              display: "flex",
              justifyContent: "flex-end",
            },
          }}
        >
          <Pagination count={10} color="secondary" />
        </Stack>
      </Box>
    </Box>
  );
};
