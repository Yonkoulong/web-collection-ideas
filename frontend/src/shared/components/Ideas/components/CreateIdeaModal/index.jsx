import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm, useWatch } from "react-hook-form";
import { useParams } from "react-router-dom";
import axios from "axios";

import {
  StyledTextField,
  Typography,
  ControllerInput,
  Select,
  MenuItem,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@/shared/components";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { postIdea } from "@/services/idea.services";

import { useCategoryStore } from "@/stores/CategoryStore";
import { useAppStore } from "@/stores/AppStore";
import { useIdeaStore } from "@/stores/IdeaStore";
import { enumRoles } from "@/shared/utils/constant.utils";

import {
  CreateCampaignFormWrapper,
  CreateCampaignForm,
  CreateCampaignInputContainer,
} from "./CreateIdeaModal.styles";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const defaultValues = {
  content: "",
  categoryId: 0,
  enonymously: 0,
};

export const ModalCreateIdea = ({ open, onClose }) => {
  const { userInfo } = useAppStore((state) => state);
  const { idCampaign } = useParams();
  const { categories, fetchCategorys } = useCategoryStore((state) => state);
  const { ideas, loading, setLoading, fetchIdeas } = useIdeaStore(
    (state) => state
  );

  const [selectedFile, setSelectedFile] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues });

  const watchFieldsInModalCreateCampaign = () => {
    let isEnable = false;

    const field = useWatch({ control });
    if (field?.content && field?.categoryId) {
      isEnable = false;
    } else {
      isEnable = true;
    }
    return isEnable;
  };

  const handleChangeFile = (e) => {
    const files = e.target.files;
    setSelectedFile(files);
  };

  const onSubmit = async (data) => {
    const token = localStorage.getItem('token');
    const newPayload = {
      ...data,
      enonymously: data?.enonymously ? 1 : 0,
      authorId: userInfo?._id,
      campaignId: idCampaign,
    };
    delete newPayload?.agree;

    try {
      const respData = await postIdea(newPayload);

      if (respData) {
        const idea = respData?.data?.data;
        setLoading(true);
  
        if (selectedFile?.length > 0) {
          const formData = new FormData();

          for(let i = 0; i < selectedFile.length; i++) {
            formData.append("file", selectedFile[i])
          }
          
          formData.append("ideaId", idea?._id);

          axios({
            method: "post",
            url: import.meta.env.VITE_API_ENV === "dev" ? `http://localhost:8080/file` : `https://backend-collection-ideas.onrender.com/file`,
            data: formData,
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token && token}`
            },
          })
            .then(function (response) {
              if (response) {
                console.log(response);
              }
            })
            .catch(function (error) {
              throw error;
            });
        }

        toast.success("Create Idea successfully");
        fetchIdeas({ campaignId: idCampaign });
        handleClose();
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.content || error;
      toast.error(errorMessage);
    }
  };

  const handleClose = () => {
    reset({
      email: "",
      password: "",
      role: "",
    });
    onClose(false);
  };

  useEffect(() => {
    (async () => {
      try {
        //fetch department
        await fetchCategorys();
      } catch (error) {
        const errorMessage = error?.response?.data?.status;
        toast.error(errorMessage);
      }
    })();
  }, []);

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Create Idea
      </BootstrapDialogTitle>
      <CreateCampaignFormWrapper>
        <CreateCampaignForm onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <CreateCampaignInputContainer>
              <Typography fontSize="medium">
                Idea Content <span style={{ color: "red" }}>*</span>
              </Typography>
              <ControllerInput
                control={control}
                errors={errors}
                fieldNameErrorMessage="Idea Content"
                fieldName="content"
                required={true}
              >
                {(field) => (
                  <StyledTextField
                    {...field}
                    fullWidth
                    size="small"
                    type="text"
                    placeholder="Enter idea name"
                  />
                )}
              </ControllerInput>
            </CreateCampaignInputContainer>

            {/* //Category */}
            <CreateCampaignInputContainer>
              <Typography fontSize="medium">
                Categories<span style={{ color: "red" }}>*</span>
              </Typography>
              <ControllerInput
                control={control}
                errors={errors}
                fieldNameErrorMessage="Category"
                fieldName="categoryId"
                required={true}
              >
                {(field) => (
                  <Select
                    {...field}
                    fullWidth
                    size="small"
                    value={field?.value || ""}
                    sx={{ fontSize: "15px" }}
                  >
                    {categories.map((category) => (
                      <MenuItem
                        sx={{ fontSize: "15px" }}
                        key={category._id}
                        value={category._id || ""}
                      >
                        {category?.type}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </ControllerInput>
            </CreateCampaignInputContainer>

            <CreateCampaignInputContainer>
              <ControllerInput
                control={control}
                errors={errors}
                fieldNameErrorMessage="Anonymous"
                fieldName="enonymously"
                required={false}
              >
                {(field) => (
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox {...field} color="secondary" />}
                      label="Anonymous"
                      sx={{
                        ".MuiTypography-root": {
                          fontSize: "15px",
                        },
                      }}
                    />
                  </FormGroup>
                )}
              </ControllerInput>
            </CreateCampaignInputContainer>

            <CreateCampaignInputContainer>
              <ControllerInput
                control={control}
                errors={errors}
                fieldNameErrorMessage=""
                fieldName=""
                required={false}
              >
                {(field) => (
                  <input
                    type="file"
                    name='files[]'
                    multiple
                    {...field}
                    onChange={handleChangeFile}
                  />
                )}
              </ControllerInput>
            </CreateCampaignInputContainer>

            <CreateCampaignInputContainer>
              <ControllerInput
                control={control}
                errors={errors}
                fieldNameErrorMessage="Terms of conditions"
                fieldName="agree"
                required={true}
              >
                {(field) => (
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox {...field} color="secondary" />}
                      label="Terms of conditions"
                      sx={{
                        ".MuiTypography-root": {
                          fontSize: "15px",
                        },
                      }}
                    />
                  </FormGroup>
                )}
              </ControllerInput>
            </CreateCampaignInputContainer>

          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              color="secondary"
              autoFocus
              onClick={() => handleClose()}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={watchFieldsInModalCreateCampaign()}
            >
              Create
            </Button>
          </DialogActions>
        </CreateCampaignForm>
      </CreateCampaignFormWrapper>
    </BootstrapDialog>
  );
};
