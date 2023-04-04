import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { ModalCreateIdea } from "../CreateIdeaModal";
import dayjs from "dayjs";

import {
  Box,
  Button,
  Popover,
  Typography,
  Pagination,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  BootstrapTooltip,
  Badge,
  CircularProgress,
} from "@/shared/components";
import { SearchCustomize } from "@/shared/components/Search";

import { styled } from "@mui/material/styles";

import DownloadIcon from "@mui/icons-material/Download";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import DescriptionIcon from "@mui/icons-material/Description";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LoupeIcon from "@mui/icons-material/Loupe";

import {
  primaryColor,
  backgroundColor,
  whiteColor,
  activeColor,
} from "@/shared/utils/colors.utils";
import { redirectTo } from "@/shared/utils/history";
import { enumRoles } from "@/shared/utils/constant.utils";
import { ideaFilter } from "@/shared/utils/constant.utils";

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
import { useIdeaStore } from "@/stores/IdeaStore";
import { useCategoryStore } from "@/stores/CategoryStore";
import { getCampaignDetail } from "@/services/admin.services";

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

export const IdeasFiltered = ({ filter }) => {
  const { idCampaign } = useParams();

  const userInfo = useAppStore((state) => state.userInfo);
  const { ideas, loading, setLoading, fetchIdeas } = useIdeaStore(
    (state) => state
  );
  const { categories, fetchCategorys } = useCategoryStore((state) => state);

  const [campaignDetail, setCampaignDetail] = useState(null);
  const [anchorDownloadEl, setAnchorDownloadEl] = useState(null);
  const [openCreateIdeaModal, setOpenCreateIdeaModal] = useState(false);
  const [category, setCategory] = useState("");

  //download
  const handleClickDownloadAnchor = (event) => {
    setAnchorDownloadEl(event.currentTarget);
  };

  const handleCloseDownloadAnchor = () => {
    setAnchorDownloadEl(null);
  };

  //select department
  const handleChangeCategory = async (e) => {
    try {
      setCategory(e.target.value);
      await fetchIdeas({ campaignId: idCampaign, categoryId: e.target.value });
    } catch (error) {
      toast.error(error);
    }
  };

  const handleOpenCreateIdeaModal = () => {
    setOpenCreateIdeaModal(true);
  };

  const handleRenderCreateIconForIdea = () => {
    let now = new Date();
    if (!campaignDetail) {
      return;
    }

    if (
      now.getTime() >= new Date(campaignDetail?.startTime).getTime() &&
      now.getTime() < new Date(campaignDetail?.firstClosureDate).getTime()
    ) {
      return (
        <Box
          sx={{ position: "fixed", right: "50px", bottom: "100px", zIndex: 99 }}
        >
          <BootstrapTooltip
            title="Add Idea"
            backgroundColor="primary"
            onClick={handleOpenCreateIdeaModal}
          >
            <IconButton>
              <LoupeIcon fontSize="large" color="secondary" />
            </IconButton>
          </BootstrapTooltip>
        </Box>
      );
    } else {
      return <></>;
    }
  };

  const openDownloadAnchor = Boolean(anchorDownloadEl);

  const idDownloadAnchor = openDownloadAnchor ? "download-popover" : undefined;

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        await fetchIdeas({ campaignId: idCampaign });
        await fetchCategorys();
      } catch (error) {
        const errorMessage = error?.data?.status || error;
        toast.error(errorMessage);
      }
    })();
  }, [filter]);

  useEffect(() => {
    (async () => {
      try {
        if (idCampaign) {
          const resp = await getCampaignDetail({ id: idCampaign });

          if (resp) {
            setCampaignDetail(resp?.data?.data);
          }
        }
      } catch (error) {
        const errorMessage = error?.data?.status || error;
        toast.error(errorMessage);
      }
    })();
  }, []);
  console.log(categories);
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
        <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel
              id="select-helper-label"
              sx={{ fontSize: "15px", top: "-8px" }}
            >
              Categories
            </InputLabel>
            <Select
              labelId="select-helper-label"
              id="select-helper"
              label="Categories"
              value={category}
              onChange={(e) => handleChangeCategory(e)}
              sx={{
                fontSize: "15px",
                ".MuiSelect-select": { padding: "8.5px 14px" },
              }}
            >
              {categories?.map((category) => {
                return (
                  <MenuItem
                    sx={{ fontSize: "15px" }}
                    key={category._id}
                    value={category._id || ""}
                  >
                    {category.type}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

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
        </Box>
      </Box>
      <Box>
        <Box mt={2} mb={3}>
          <IdeasWrapper>
            {loading && (
              <Box my={10} mx={"auto"} textAlign="center">
                <CircularProgress color="inherit" size={30} />
              </Box>
            )}

            {!loading &&
              ideas?.map((idea) => {
                return (
                  <IdeaItem
                    elevation={3}
                    key={idea?._id}
                    onClick={() =>
                      redirectTo(
                        `/campaigns/${idea?.campaignId}/ideas/${idea?._id}`
                      )
                    }
                  >
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
                        <IdeaItemHeadTitle>{idea?.content}</IdeaItemHeadTitle>
                        <IdeaItemHeadNameWrapper>
                          <IdeaItemHeadNameText>
                            Long Yonkou
                          </IdeaItemHeadNameText>
                          -
                          <IdeaItemHeadDateText>
                            February 24 2023, 15:25:25
                          </IdeaItemHeadDateText>
                        </IdeaItemHeadNameWrapper>
                      </Box>
                    </IdeaItemHead>
                    <IdeaItemBody></IdeaItemBody>
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
                          <StyledBadge
                            badgeContent={idea?.viewer?.length}
                            color="secondary"
                          >
                            <VisibilityIcon fontSize="small" />
                          </StyledBadge>
                        </IconButton>
                      </Box>
                    </IdeaItemBottom>
                  </IdeaItem>
                );
              })}
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
      {handleRenderCreateIconForIdea()}
      {/* Modal */}
      <ModalCreateIdea
        open={openCreateIdeaModal}
        onClose={setOpenCreateIdeaModal}
      />
    </Box>
  );
};
