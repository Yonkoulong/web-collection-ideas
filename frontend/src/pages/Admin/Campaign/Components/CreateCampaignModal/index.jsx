import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm, useWatch } from "react-hook-form";

import {
  StyledTextField,
  Typography,
  ControllerInput,
  Select,
  MenuItem,
  Button,
} from "@/shared/components";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { postCampaign } from "@/services/admin.services";
import { useAppStore } from "@/stores/AppStore";
import { enumRoles } from "@/shared/utils/constant.utils";
import {
  CreateCampaignFormWrapper,
  CreateCampaignForm,
  CreateCampaignInputContainer,
} from "./CreateCampaignModal.styles";

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

const roles = [
  {
    label: "Staff",
    value: enumRoles.STAFF,
  },
  {
    label: "Project Manager",
    value: enumRoles.PROJECT_MANAGER,
  },
];

const defaultValues = {
  email: "",
  password: "",
  role: "",
};

export const ModalCreateCampaign = ({ open, onClose }) => {
  const { userInfo } = useAppStore((state) => state);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues });

  const watchFieldsInModalCreateCampaign = () => {
    let isEnable = false;

    const field = useWatch({ control });
    if (field?.email && field?.password && field?.role) {
      isEnable = false;
    } else {
      isEnable = true;
    }
    return isEnable;
  };

  const onSubmit = async (data) => {
    try {
      const respData = await postCreateCampaign(data);

      if (respData) {
        setLoading(true);
        fetchCampaigns({
          organizeId: userInfo?.organizeId,
          id: "",
          email: "",
          paging: { page: 1, size: 10 },
        });
        toast.success("Create Campaign successfully.");
        handleClose();
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.content;
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

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Create Campaign
      </BootstrapDialogTitle>
      <CreateCampaignFormWrapper>
        <CreateCampaignForm onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <CreateCampaignInputContainer>
              <Typography>
                Email <span style={{ color: "red" }}>*</span>
              </Typography>
              <ControllerInput
                control={control}
                errors={errors}
                fieldNameErrorMessage="Email"
                fieldName="email"
                required={true}
              >
                {(field) => (
                  <StyledTextField
                    {...field}
                    fullWidth
                    size="small"
                    type="email"
                    placeholder="Enter email"
                  />
                )}
              </ControllerInput>
            </CreateCampaignInputContainer>

            <CreateCampaignInputContainer>
              <Typography>
                Password <span style={{ color: "red" }}>*</span>
              </Typography>
              <ControllerInput
                control={control}
                errors={errors}
                fieldNameErrorMessage="Password"
                fieldName="password"
                required={true}
              >
                {(field) => (
                  <StyledTextField
                    {...field}
                    fullWidth
                    size="small"
                    type="password"
                    placeholder="Enter password"
                  />
                )}
              </ControllerInput>
            </CreateCampaignInputContainer>

            <CreateCampaignInputContainer>
              <Typography>
                Role<span style={{ color: "red" }}>*</span>
              </Typography>
              <ControllerInput
                control={control}
                errors={errors}
                fieldNameErrorMessage="Role"
                fieldName="role"
                required={true}
              >
                {(field) => (
                  <Select {...field} fullWidth size="small">
                    {roles.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        <b>{option.label}</b>
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </ControllerInput>
            </CreateCampaignInputContainer>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" autoFocus onClick={() => handleClose()}>
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
