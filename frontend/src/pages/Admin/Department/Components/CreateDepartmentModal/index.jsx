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
import { primaryColor } from "@/shared/utils/colors.utils";
import { postDepartment, putDepartment } from "@/services/admin.services";
import { useDepartmentStore } from "@/stores/DepartmentStore";
import {
  CreateDepartmentFormWrapper,
  CreateDepartmentForm,
  CreateDepartmentInputContainer,
} from "./CreateDepartmentModal.styles";

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
  description: "",
};

export const ModalCreateDepartment = ({ open, onClose, editDepartment }) => {
  const { fetchDepartments } = useDepartmentStore((state) => state);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: editDepartment ? editDepartment : defaultValues,
  });

  const watchFieldsInModalCreateDepartment = () => {
    let isEnable = false;

    const field = useWatch({ control });
    if (field?.name && field?.description) {
      isEnable = false;
    } else {
      isEnable = true;
    }
    return isEnable;
  };

  const onSubmit = async (data) => {
    try {
      if (editDepartment) {
        
        const respData = await putDepartment({ id: editDepartment?._id }, data);

        if (respData) {
          toast.success("Update Department successfully.");
          await fetchDepartments();
          handleClose();
        }
      } else {
        const respData = await postDepartment(data);

        if (respData) {
          toast.success("Create Department successfully.");
          await fetchDepartments();
          handleClose();
        }
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.content;
      toast.error(errorMessage);
      handleClose();
    }
  };

  const handleClose = () => {
    reset({
      name: "",
      description: "",
    });
    onClose(false);
  };

  useEffect(() => {
    if (editDepartment) {
      setValue("name", editDepartment?.name);
      setValue("description", editDepartment?.description);
    }
  }, [editDepartment]);

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        {editDepartment ? "Update" : "Create"} Department
      </BootstrapDialogTitle>
      <CreateDepartmentFormWrapper>
        <CreateDepartmentForm onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <CreateDepartmentInputContainer>
              <Typography>
                Department name <span style={{ color: "red" }}>*</span>
              </Typography>
              <ControllerInput
                control={control}
                errors={errors}
                fieldNameErrorMessage="Department name"
                fieldName="name"
                required={true}
              >
                {(field) => (
                  <StyledTextField
                    {...field}
                    fullWidth
                    size="small"
                    type="text"
                    placeholder="Enter department name"
                  />
                )}
              </ControllerInput>
            </CreateDepartmentInputContainer>

            <CreateDepartmentInputContainer mt={2}>
              <Typography>
                Description <span style={{ color: "red" }}>*</span>
              </Typography>
              <ControllerInput
                control={control}
                errors={errors}
                fieldNameErrorMessage="Description"
                fieldName="description"
                required={true}
              >
                {(field) => (
                  <StyledTextField
                    {...field}
                    fullWidth
                    type="text"
                    placeholder="Enter description"
                    multiline
                    rows={4}
                  />
                )}
              </ControllerInput>
            </CreateDepartmentInputContainer>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              sx={{ color: primaryColor }}
              autoFocus
              onClick={() => handleClose()}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              {editDepartment ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </CreateDepartmentForm>
      </CreateDepartmentFormWrapper>
    </BootstrapDialog>
  );
};
