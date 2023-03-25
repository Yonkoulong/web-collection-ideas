import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm, useWatch } from "react-hook-form";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

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

import { postCampaign } from "@/services/admin.services";

import { useDepartmentStore } from "@/stores/DepartmentStore";
import { useAppStore } from "@/stores/AppStore";
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
  name: "",
  campaignId: 0,
  categoryId: 0,
  enonymous: false,
};

export const ModalCreateIdea = ({ open, onClose, editCampaign }) => {
  const { userInfo } = useAppStore((state) => state);
  const { departments, fetchDepartments } = useDepartmentStore(
    (state) => state
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues });

  const watchFieldsInModalCreateCampaign = () => {
    let isEnable = false;

    const field = useWatch({ control });
    if (
      field?.name &&
      field?.startTime &&
      field?.firstClosureDate &&
      field?.department
    ) {
      isEnable = false;
    } else {
      isEnable = true;
    }
    return isEnable;
  };

  const onSubmit = async (data) => {
    try {
      const respData = await postCampaign(data);

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

  useEffect(() => {
    (async () => {
      try {
        //fetch department
        await fetchDepartments();

        if (editCampaign) {
          setValue("role", resp?.data?.data?.role);
          setValue("department", resp?.data?.data?.department);
          setValue("name", resp?.data?.data?.name);
          setValue("email", resp?.data?.data?.email);
          setValue("password", resp?.data?.data?.password);
          setValue("dob", resp?.data?.data?.dob);
          setValue("image", resp?.data?.data?.image);
        }
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
                Idea Name <span style={{ color: "red" }}>*</span>
              </Typography>
              <ControllerInput
                control={control}
                errors={errors}
                fieldNameErrorMessage="Idea Name"
                fieldName="name"
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

            {/* //Campain */}
            <CreateCampaignInputContainer>
              <Typography fontSize="medium">
                Department<span style={{ color: "red" }}>*</span>
              </Typography>
              <ControllerInput
                control={control}
                errors={errors}
                fieldNameErrorMessage="Department"
                fieldName="department"
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
                    {departments.map((option) => (
                      <MenuItem
                        sx={{ fontSize: "15px" }}
                        key={option._id}
                        value={option._id || ""}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </ControllerInput>
            </CreateCampaignInputContainer>

            {/* //Category */}
            <CreateCampaignInputContainer>
              <Typography fontSize="medium">
                Category<span style={{ color: "red" }}>*</span>
              </Typography>
              <ControllerInput
                control={control}
                errors={errors}
                fieldNameErrorMessage="Category"
                fieldName="category"
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
                    {departments.map((option) => (
                      <MenuItem
                        sx={{ fontSize: "15px" }}
                        key={option._id}
                        value={option._id || ""}
                      >
                        {option.name}
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
                fieldName="anonymous"
                required={false}
              >
                {(field) => (
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox {...field} color="secondary" />}
                      label="Anonymous"
                      sx={{
                        '.MuiTypography-root': {
                          fontSize: "15px"
                        }
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
                  <input type="file" multiple  {...field}/>
                )}
              </ControllerInput>
            </CreateCampaignInputContainer>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="secondary" autoFocus onClick={() => handleClose()}>
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
