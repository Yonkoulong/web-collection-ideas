import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm, useWatch } from "react-hook-form";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

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

import { postCampaign, putCampaign } from "@/services/admin.services";

import { useDepartmentStore } from "@/stores/DepartmentStore";
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

const defaultValues = {
  name: "",
  startTime: "",
  firstClosureDate: "",
  finalClosureDate: "",
  departmentId: "",
};

export const ModalCreateCampaign = ({ open, onClose, editCampaign }) => {
  const { userInfo } = useAppStore((state) => state);
  const { departments, fetchDepartments } = useDepartmentStore(
    (state) => state
  );

  const {
    control,
    handleSubmit,
    setValue,
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
      field?.departmentId
    ) {
      isEnable = false;
    } else {
      isEnable = true;
    }
    return isEnable;
  };

  const onSubmit = async (data) => {
    try {
      let payload = {};

      //check final clouse date
      if (!data?.finalClosureDate) {
        let newFinalClousureDate = new Date(data?.firstClosureDate).setDate(
          new Date(data?.firstClosureDate).getDate() + 7
        );
        payload = { ...data, finalClosureDate: newFinalClousureDate };
      } else {
        payload = { ...data };
      }

      if (payload == "{}") {
        return;
      }

      if (
        handleCheckDateBeforeCreateCapaign(
          payload?.startTime,
          payload?.firstClosureDate,
          payload?.finalClosureDate
        )
      ) {
        if (editCampaign) {
          console.log(editCampaign?._id);
          const respData = await putCampaign({ id: editCampaign?._id }, data);

          if (respData) {
            setLoading(true);
            fetchCampaigns();
            toast.success("Update Campaign successfully.");
            handleClose();
          }
        } else {
          const respData = await postCampaign(data);

          if (respData) {
            setLoading(true);
            fetchCampaigns();
            toast.success("Create Campaign successfully.");
            handleClose();
          }
        }
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.content;
      toast.error(errorMessage);
    }
  };

  const handleCheckDateBeforeCreateCapaign = (
    startDate,
    firstClouseDate,
    finalClosureDate
  ) => {
    const now = new Date();

    if (!startDate || !firstClouseDate || !finalClosureDate) {
      return;
    }

    if (new Date(startDate).getTime() < now.getTime()) {
      toast.error("Start date must greater than current date");
      return false;
    } else if (
      new Date(startDate).getTime() > new Date(firstClouseDate).getTime() ||
      new Date(startDate).getTime() > new Date(finalClosureDate).getTime()
    ) {
      toast.error("Start date must less than Closure date");
      return false;
    } else if (
      new Date(firstClouseDate).getTime() > new Date(finalClosureDate).getTime()
    ) {
      toast.error("First closure date must less than Final closure date");
      return false;
    } else {
      return true;
    }
  };

  const handleClose = () => {
    reset({
      name: "",
      startTime: "",
      firstClosureDate: "",
      finalClosureDate: "",
      departmentId: "",
    });
    onClose(false);
  };

  useEffect(() => {
    (async () => {
      try {
        //fetch department
        await fetchDepartments();
      } catch (error) {
        const errorMessage = error?.response?.data?.status;
        toast.error(errorMessage);
      }
    })();
  }, []);

  useEffect(() => {
    if (editCampaign) {
      setValue("name", editCampaign?.name);
      setValue("startTime", dayjs(editCampaign?.startTime));
      setValue("firstClosureDate", dayjs(editCampaign?.firstClosureDate));
      setValue("finalClosureDate", dayjs(editCampaign?.finalClosureDate));
      setValue("departmentId", editCampaign?.departmentId);
    }
  }, [editCampaign]);

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
              <Typography fontSize="medium">
                Campain Name <span style={{ color: "red" }}>*</span>
              </Typography>
              <ControllerInput
                control={control}
                errors={errors}
                fieldNameErrorMessage="Campaign Name"
                fieldName="name"
                required={true}
              >
                {(field) => (
                  <StyledTextField
                    {...field}
                    fullWidth
                    size="small"
                    type="text"
                    placeholder="Enter campaign name"
                  />
                )}
              </ControllerInput>
            </CreateCampaignInputContainer>

            <CreateCampaignInputContainer>
              <Typography fontSize="medium">
                Start date<span style={{ color: "red" }}>*</span>
              </Typography>
              <ControllerInput
                control={control}
                errors={errors}
                fieldNameErrorMessage="Start Date"
                fieldName="startTime"
                required={true}
              >
                {(field) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      {...field}
                      sx={{
                        width: "100%",
                        ".MuiInputBase-root": {
                          fontSize: "15px",
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}
              </ControllerInput>
            </CreateCampaignInputContainer>

            <CreateCampaignInputContainer>
              <Typography fontSize="medium">
                First Closure Date<span style={{ color: "red" }}>*</span>
              </Typography>
              <ControllerInput
                control={control}
                errors={errors}
                fieldNameErrorMessage="First Closure Date"
                fieldName="firstClosureDate"
                required={true}
              >
                {(field) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      {...field}
                      sx={{
                        width: "100%",
                        ".MuiInputBase-root": {
                          fontSize: "15px",
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}
              </ControllerInput>
            </CreateCampaignInputContainer>

            <CreateCampaignInputContainer>
              <Typography fontSize="medium">Final Closure Date</Typography>
              <ControllerInput
                control={control}
                errors={errors}
                fieldNameErrorMessage="Final Closure Date"
                fieldName="finalClosureDate"
                required={false}
              >
                {(field) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      {...field}
                      sx={{
                        width: "100%",
                        ".MuiInputBase-root": {
                          fontSize: "15px",
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}
              </ControllerInput>
            </CreateCampaignInputContainer>

            {/* //department */}
            <CreateCampaignInputContainer>
              <Typography fontSize="medium">
                Department<span style={{ color: "red" }}>*</span>
              </Typography>
              <ControllerInput
                control={control}
                errors={errors}
                fieldNameErrorMessage="Department"
                fieldName="departmentId"
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
