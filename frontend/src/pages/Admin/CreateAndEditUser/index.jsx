import React from "react";
import { toast } from "react-toastify";
import { useForm, useWatch } from "react-hook-form";
import { useParams } from "react-router-dom";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { postRegisterAccount } from '@/services/admin.services'

import {
  TextField,
  StyledTextField,
  Box,
  ControllerInput,
  MenuItem,
  Select,
  Typography,
  Button,
  IconButton,
} from "@/shared/components";

import { enumRoles, formatDate } from "@/shared/utils/constant.utils";

import {
  FormCreateAccount,
  ImageUserWrapper,
  ImageUser,
  CameraWrapper,
} from "./CreateAndEditUser.styles";

import { primaryColor, blackColor } from "@/shared/utils/colors.utils";
import { redirectTo } from "@/shared/utils/history";

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

const flexCenter = {
  display: "flex",
  alignItems: "center",
};

export const CreateAndEditUser = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    try {
    } catch (error) {
      const errorMessage = error?.response?.data?.content;
      toast.error(errorMessage);
    }
  };

  const watchFieldsInModalCreateMember = () => {
    let isEnable = false;
    const field = useWatch({ control });

    if (field?.role) {
      isEnable = false;
    } else {
      isEnable = true;
    }
    return isEnable;
  };

  return (
    <Box sx={{ m: "24px 16px" }}>
      <Box>
        <Box sx={flexCenter}>
          <ArrowCircleLeftIcon
            sx={{
              fontSize: "30px",
              ":hover": {
                color: primaryColor,
                cursor: "pointer",
              },
            }}
            onClick={() => redirectTo("/admin/user-management")}
          />
          <Typography variant="h4" component="h3" sx={{ ml: 1 }}>
            Create Member
          </Typography>
        </Box>
        <Box></Box>
      </Box>
      <Box sx={{ mt: "24px" }}>
        <FormCreateAccount onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ flex: "0 0 50%", maxWidth: "50%" }}>
            <Box>
              <Typography>
                Role <span style={{ color: "red" }}>*</span>
              </Typography>
              <Box>
                <ControllerInput
                  control={control}
                  errors={errors}
                  fieldNameErrorMessage="Role"
                  fieldName="role"
                  required={true}
                >
                  {(field) => (
                    <Select
                      {...field}
                      fullWidth
                      size="small"
                      value={field?.value || ""}
                    >
                      {roles.map((option) => (
                        <MenuItem key={option.value} value={option.value || ""}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </ControllerInput>
              </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography>
                Department<span style={{ color: "red" }}>*</span>{" "}
              </Typography>
              <Box>
                <ControllerInput
                  control={control}
                  errors={errors}
                  fieldNameErrorMessage="Role"
                  fieldName="role"
                  required={true}
                >
                  {(field) => (
                    <Select
                      {...field}
                      fullWidth
                      size="small"
                      value={field?.value || ""}
                    >
                      {roles.map((option) => (
                        <MenuItem key={option.value} value={option.value || ""}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </ControllerInput>
              </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography>
                Name <span style={{ color: "red" }}>*</span>
              </Typography>
              <ControllerInput
                control={control}
                errors={errors}
                fieldNameErrorMessage="Name"
                fieldName="name"
                required={true}
              >
                {(field) => (
                  <StyledTextField
                    {...field}
                    fullWidth
                    size="small"
                    type="text"
                    placeholder="Enter name"
                  />
                )}
              </ControllerInput>
            </Box>
            <Box sx={{ mt: 2 }}>
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
            </Box>
            <Box sx={{ mt: 2 }}>
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
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography>
                DoB <span style={{ color: "red" }}>*</span>
              </Typography>
              <ControllerInput
                control={control}
                errors={errors}
                fieldNameErrorMessage="Date of birth"
                fieldName="dob"
                required={true}
              >
                {(field) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      {...field}
                      sx={{
                        width: "100%",
                        ".MuiInputBase-root": {},
                      }}
                    />
                  </LocalizationProvider>
                )}
              </ControllerInput>
            </Box>
            <Box sx={{ mt: 4 }}>
              <Button variant="contained" type="submit" disabled={watchFieldsInModalCreateMember} fullWidth>
                Create
              </Button>
            </Box>
          </Box>
          <Box sx={{ flex: "0 0 50%", maxWidth: "50%" }}>
            <ControllerInput
              control={control}
              errors={errors}
              fieldName="image"
              required={false}
            >
              {(field) => (
                <ImageUserWrapper>
                  <ImageUser src="" />
                  <CameraWrapper>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                    >
                      <input hidden accept="image/*" type="file" />
                      <PhotoCamera />
                    </IconButton>
                  </CameraWrapper>
                </ImageUserWrapper>
              )}
            </ControllerInput>
          </Box>
        </FormCreateAccount>
      </Box>
    </Box>
  );
};
