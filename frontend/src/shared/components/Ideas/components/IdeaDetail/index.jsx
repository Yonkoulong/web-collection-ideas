import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import { reactionType, isObjectEmpty } from "@/shared/utils/constant.utils";

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
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  primaryColor,
  backgroundColor,
  activeColor,
} from "@/shared/utils/colors.utils";
import { hasWhiteSpace } from "@/shared/utils/validation.utils";

import { useAppStore } from "@/stores/AppStore";

import { getIdeaById } from "@/services/idea.services";
import { postComment } from "@/services/comment.services";
import { postReaction } from "@/services/reaction.services";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 20,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export const IdeaDetail = () => {
  const userInfo = useAppStore((state) => state.userInfo);

  const { idIdea } = useParams();
  const [ideaDetail, setIdeaDetail] = useState({});

  const handleCommentIdea = async (e) => {
    try {
      const payload = {
        content: e.target.value,
        authorId: userInfo?._id,
        ideaId: idIdea,
      };

      if (e.target.value !== "" && !hasWhiteSpace(e.target.value)) {
        if (e.key === "Enter" || e.keyCode === 13) {
          const resp = await postComment(payload);
          if (resp) {
            e.target.value = "";
          }
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleReactionIdea = async (typeReaction) => {
    try {
      const payload = {
        type: typeReaction,
        authorId: userInfo?._id,
        ideaId: idIdea,
      };

      const resp = await postReaction(payload);
    } catch (error) {
      toast.error(error);
    }
  };

  const countReactionTypeByIdea = (typeReaction) => {
    if (!ideaDetail && isObjectEmpty(ideaDetail)) {
      return;
    }

    switch (typeReaction) {
      case reactionType.LIKE: {
        const newListReactions = ideaDetail?.reaction?.filter(
          (react) => react?.type === reactionType.LIKE
        );
        return newListReactions?.length;
      }
      case reactionType.DISLIKE: {
        const newListReactions = ideaDetail?.reaction?.filter(
          (react) => react?.type === reactionType.DISLIKE
        );
        return newListReactions?.length;
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (idIdea) {
        const resp = await getIdeaById({ id: idIdea });

        if (!resp) {
          return;
        }

        setIdeaDetail(resp?.data?.data);
      }
    })();
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
        <Box sx={{ display: "flex" }}>
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
            <img src={ideaDetail?.authorId?.avartarUrl} alt="avatar" />
          </Box>
          <Box sx={{ marginLeft: 1 }}>
            <Typography fontSize="20px" fontWeight="bold">
              {ideaDetail?.content}
            </Typography>
            <Typography fontSize="small">{ideaDetail?.updatedAt}</Typography>
          </Box>
        </Box>

        {/* description */}
        <Box sx={{ margin: "24px 0" }}>
          <img src={ideaDetail?.authorId?.avartarUrl} alt="avatar" />
        </Box>
        {/* end description */}
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
            <StyledBadge badgeContent={countReactionTypeByIdea(reactionType.LIKE)} color="secondary">
              <ThumbUpIcon
                fontSize="small"
                onClick={() => handleReactionIdea(reactionType.LIKE)}
              />
            </StyledBadge>
          </IconButton>

          <IconButton aria-label="comment">
            <StyledBadge
              badgeContent={ideaDetail?.comment?.length || 0}
              color="secondary"
            >
              <CommentIcon fontSize="small" />
            </StyledBadge>
          </IconButton>
          <IconButton aria-label="thumb-down">
            <StyledBadge badgeContent={countReactionTypeByIdea(reactionType.DISLIKE)} color="secondary">
              <ThumbDownAltIcon
                fontSize="small"
                onClick={() => handleReactionIdea(reactionType.DISLIKE)}
              />
            </StyledBadge>
          </IconButton>
          <IconButton aria-label="eye">
            <StyledBadge
              badgeContent={ideaDetail?.viewer?.length || 0}
              color="secondary"
            >
              <VisibilityIcon fontSize="small" />
            </StyledBadge>
          </IconButton>
        </Paper>
        <Box mt={3}>
          <TextField
            id="input-with-icon-textfield"
            label=""
            placeholder="Comment"
            onKeyDown={handleCommentIdea}
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
                fontSize: "16px",
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
            {ideaDetail?.comment?.length > 0 &&
              ideaDetail?.comment.map((cmt) => {
                return (
                  <Box sx={{ display: "flex" }} key={cmt?._id}>
                    <Box
                      minWidth={50}
                      height={50}
                      sx={{
                        border: "1px solid ",
                        borderRadius: "50px",
                      }}
                    >
                      <img
                        src={cmt?.authorId?.avartarUrl}
                        alt="asd"
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
                        width: "100%",
                      }}
                    >
                      <Typography fontSize="15px" fontWeight="bold">
                        {cmt?.authorId}
                      </Typography>
                      <Box fontSize="14px">{cmt?.content}</Box>
                    </Box>
                  </Box>
                );
              })}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
