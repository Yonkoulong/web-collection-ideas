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
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
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
import {
  enumRoles,
  ideaFilter,
  reactionType,
} from "@/shared/utils/constant.utils";

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
import { postView } from "@/services/idea.services";
import { postReaction } from "@/services/reaction.services";
import { getCSVFile } from "@/services/qam.services";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 20,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const MAX_ITEM_PER_PAGE = 5;

const flexCenter = {
  display: "flex",
  alignItems: "center",
};

export const IdeasFiltered = ({ filter }) => {
  const { idCampaign } = useParams();

  const userInfo = useAppStore((state) => state.userInfo);
  const {
    ideas,
    loading,
    setLoading,
    fetchIdeas,
    totalRecord,
    fetchIdeaMostLike,
    fetchIdeaMostView,
    fetchIdeaLatest,
    fetchIdeaMostComment
  } = useIdeaStore((state) => state);
  const { categories, fetchCategorys } = useCategoryStore((state) => state);

  const [campaignDetail, setCampaignDetail] = useState(null);
  const [anchorDownloadEl, setAnchorDownloadEl] = useState(null);
  const [openCreateIdeaModal, setOpenCreateIdeaModal] = useState(false);
  const [category, setCategory] = useState("");
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: MAX_ITEM_PER_PAGE,
  });

  //download
  const handleClickDownloadAnchor = (event) => {
    setAnchorDownloadEl(event.currentTarget);
  };

  const handleCloseDownloadAnchor = () => {
    setAnchorDownloadEl(null);
  };

  const handlePageChange = (event, newPage) => {
    setController({
      ...controller,
      page: newPage - 1,
    });
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
      now.getTime() < new Date(campaignDetail?.firstClosureDate).getTime() &&
      userInfo?.role == enumRoles.STAFF
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

  const handleClickIdea = async (idea) => {
    try {
      const payload = {
        ideaId: idea?._id,
        // viewerId: userInfo?._id,
      };

      const resp = await postView(payload);

      if (resp) {
        redirectTo(`/campaigns/${idea?.campaignId}/ideas/${idea?._id}`);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const countReactionTypeByIdea = (typeReaction, idea) => {
    if (!idea) {
      return;
    }

    switch (typeReaction) {
      case reactionType.LIKE: {
        let count = 0;
        idea?.reaction?.forEach((react) => {
          if (react?.type == reactionType.LIKE) {
            count++;
          }
        });
        return count;
      }
      case reactionType.DISLIKE: {
        let count = 0;

        idea?.reaction?.forEach((react) => {
          if (react?.type == reactionType.DISLIKE) {
            count++;
          }
        });
        return count;
      }
    }
  };

  const handleReactionIdea = async (typeReaction, idIdea, e) => {
    e.stopPropagation();

    try {
      const payload = {
        type: typeReaction,
        authorId: userInfo?._id,
        ideaId: idIdea,
      };

      const resp = await postReaction(payload);
      if (resp) {
        switch (filter) {
          case ideaFilter.ALL: {
            (async () => {
              try {
                await fetchIdeas({ campaignId: idCampaign });
                await fetchCategorys();
              } catch (error) {
                const errorMessage = error?.data?.status || error;
                toast.error(errorMessage);
              }
            })();
            break;
          }
          case ideaFilter.MOST_POPULAR: {
            (async () => {
              try {
                await fetchIdeaMostLike({ campaignId: idCampaign, categoryId: category ? category : null });
              } catch (error) {
                const errorMessage = error?.data?.status || error;
                toast.error(errorMessage);
              }
            })();
            break;
          }
          case ideaFilter.MOST_VIEWED: {
            (async () => {
              try {
                await fetchIdeaMostView({ campaignId: idCampaign, categoryId: category ? category : null });
              } catch (error) {
                const errorMessage = error?.data?.status || error;
                toast.error(errorMessage);
              }
            })();
            break;
          }
          case ideaFilter.LASTEST_IDEAS: {
            (async () => {
              try {
                await fetchIdeaLatest({ campaignId: idCampaign, categoryId: category ? category : null });
              } catch (error) {
                const errorMessage = error?.data?.status || error;
                toast.error(errorMessage);
              }
            })();
            break;
          }
          case ideaFilter.MOST_COMMENTS: {
            (async () => {
              try {
                await fetchIdeaMostComment({ campaignId: idCampaign, categoryId: category ? category : null });
              } catch (error) {
                const errorMessage = error?.data?.status || error;
                toast.error(errorMessage);
              }
            })();
            break;
          }
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDownloadCSV = async () => {
     const resp = await getCSVFile();

     if(!resp) { return; }

   
    
  };

  const openDownloadAnchor = Boolean(anchorDownloadEl);

  const idDownloadAnchor = openDownloadAnchor ? "download-popover" : undefined;

  useEffect(() => {
    setLoading(true);

    switch (filter) {
      case ideaFilter.ALL: {
        (async () => {
          try {
            await fetchIdeas({ campaignId: idCampaign });
            await fetchCategorys();
          } catch (error) {
            const errorMessage = error?.data?.status || error;
            toast.error(errorMessage);
          }
        })();
        break;
      }
      case ideaFilter.MOST_POPULAR: {
        (async () => {
          try {
            await fetchIdeaMostLike({ campaignId: idCampaign, categoryId: category ? category : null });
          } catch (error) {
            const errorMessage = error?.data?.status || error;
            toast.error(errorMessage);
          }
        })();
        break;
      }
      case ideaFilter.MOST_VIEWED: {
        (async () => {
          try {
            await fetchIdeaMostView({ campaignId: idCampaign, categoryId: category ? category : null });
          } catch (error) {
            const errorMessage = error?.data?.status || error;
            toast.error(errorMessage);
          }
        })();
        break;
      }
      case ideaFilter.LASTEST_IDEAS: {
        (async () => {
          try {
            await fetchIdeaLatest({ campaignId: idCampaign, categoryId: category ? category : null });
          } catch (error) {
            const errorMessage = error?.data?.status || error;
            toast.error(errorMessage);
          }
        })();
        break;
      }
      case ideaFilter.MOST_COMMENTS: {
        (async () => {
          try {
            await fetchIdeaMostComment({ campaignId: idCampaign, categoryId: category ? category : null });
          } catch (error) {
            const errorMessage = error?.data?.status || error;
            toast.error(errorMessage);
          }
        })();
        break;
      }
    }
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

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center'}}>
        <ArrowCircleLeftIcon
          sx={{
            fontSize: "30px",
            ":hover": {
              color: primaryColor,
              cursor: "pointer",

            },
          }}
          onClick={() => redirectTo("/campaigns")}
        />
        <Typography sx={{ marginLeft: '8px'}}>Ideas</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: '16px'
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
                  onClick={() => handleDownloadCSV()}
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
              ideas
                ?.slice(
                  controller.page * controller.rowsPerPage,
                  controller.page * controller.rowsPerPage +
                    controller.rowsPerPage
                )
                ?.map((idea) => {
                  return (
                    <IdeaItem elevation={3} key={idea?._id} onClick={() => handleClickIdea(idea)}>
                      <IdeaItemHead>
                        <Box
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                          sx={{
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            border: "1px solid",
                          }}
                        >
                          <IdeaItemHeadImage
                            src={
                              idea?.enonymously
                                ? "https://www.kindpng.com/picc/m/206-2069926_google-chrome-incognito-mode-detection-incognito-logo-hd.png"
                                : idea?.authorId?.avartarUrl
                            }
                            alt="avatar"
                          />
                        </Box>
                        <Box ml={2}>
                          <IdeaItemHeadTitle>{idea?.content}</IdeaItemHeadTitle>
                          <IdeaItemHeadNameWrapper>
                            <IdeaItemHeadNameText>
                              {idea?.enonymously
                                ? "Unknown"
                                : idea?.authorId?.email}
                            </IdeaItemHeadNameText>
                            -
                            <IdeaItemHeadDateText>
                              {dayjs(idea?.updatedAt).format(
                                "MM/DD/YYYY HH:mm A"
                              )}
                            </IdeaItemHeadDateText>
                          </IdeaItemHeadNameWrapper>
                        </Box>
                      </IdeaItemHead>
                      <IdeaItemBody></IdeaItemBody>
                      <IdeaItemBottom>
                        <Box sx={{ display: "flex", gap: "8px" }}>
                          <IconButton aria-label="thumb-up">
                            <StyledBadge
                              badgeContent={countReactionTypeByIdea(
                                reactionType.LIKE,
                                idea
                              )}
                              color="secondary"
                            >
                              <ThumbUpIcon
                                fontSize="small"
                                onClick={(event) =>
                                  handleReactionIdea(
                                    reactionType.LIKE,
                                    idea?._id, event
                                  )
                                }
                              />
                            </StyledBadge>
                          </IconButton>
                          <IconButton aria-label="thumb-down">
                            <StyledBadge
                              badgeContent={countReactionTypeByIdea(
                                reactionType.DISLIKE,
                                idea
                              )}
                              color="secondary"
                            >
                              <ThumbDownAltIcon
                                fontSize="small"
                                onClick={() =>
                                  handleReactionIdea(
                                    reactionType.DISLIKE,
                                    idea?._id
                                  )
                                }
                              />
                            </StyledBadge>
                          </IconButton>
                          <IconButton aria-label="comment">
                            <StyledBadge
                              badgeContent={idea?.comment?.length}
                              color="secondary"
                            >
                              <CommentIcon
                                fontSize="small"
                                onClick={() => handleClickIdea(idea)}
                              />
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
          <Pagination
            onChange={handlePageChange}
            count={Math.ceil(totalRecord / MAX_ITEM_PER_PAGE)}
            color="secondary"
          />
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
