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
import { postCategory, putCategory } from "@/services/qam.services";
import { useCategoryStore } from "@/stores/categoryStore";
import {
  CreateCategoryFormWrapper,
  CreateCategoryForm,
  CreateCategoryInputContainer,
} from "./CreateCategoryModal.styles";

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
  type: "",
  description: "",
};

export const ModalCreateCategory = ({ open, onClose, editCategory }) => {
  const { fetchCategorys } = useCategoryStore((state) => state);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: editCategory ? editCategory : defaultValues,
  });

  const watchFieldsInModalCreateCategory = () => {
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
      if (editCategory) {
        
        const respData = await putCategory({ id: editCategory?._id }, data);

        if (respData) {
          toast.success("Update Category successfully.");
          await fetchCategorys();
          handleClose();
        }
      } else {
        const respData = await postCategory(data);

        if (respData) {
          toast.success("Create Category successfully.");
          await fetchCategorys();
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
      type: "",
      description: "",
    });
    onClose(false);
  };

  useEffect(() => {
    if (editCategory) {
      setValue("type", editCategory?.name);
      setValue("description", editCategory?.description);
    }
  }, [editCategory]);

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        {editCategory ? "Update" : "Create"} Category
      </BootstrapDialogTitle>
      <CreateCategoryFormWrapper>
        <CreateCategoryForm onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <CreateCategoryInputContainer>
              <Typography>
                Category name <span style={{ color: "red" }}>*</span>
              </Typography>
              <ControllerInput
                control={control}
                errors={errors}
                fieldNameErrorMessage="Category name"
                fieldName="type"
                required={true}
              >
                {(field) => (
                  <StyledTextField
                    {...field}
                    fullWidth
                    size="small"
                    type="text"
                    placeholder="Enter Category name"
                  />
                )}
              </ControllerInput>
            </CreateCategoryInputContainer>

            <CreateCategoryInputContainer mt={2}>
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
            </CreateCategoryInputContainer>
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
              {editCategory ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </CreateCategoryForm>
      </CreateCategoryFormWrapper>
    </BootstrapDialog>
  );
};
