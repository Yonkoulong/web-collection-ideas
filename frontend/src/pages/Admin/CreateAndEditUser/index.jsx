import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm, useWatch } from "react-hook-form";
import { useParams } from "react-router-dom";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { postRegisterAccount, getAccountDetail, putAccount } from "@/services/admin.services";

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
import { useDepartmentStore } from "@/stores/DepartmentStore";
import { useAccountStore } from "@/stores/AccountStore";

const roles = [
  {
    label: "Staff",
    value: enumRoles.STAFF,
  },
  {
    label: "QAM",
    value: enumRoles.QAM,
  },
  {
    label: "QAC",
    value: enumRoles.QAC,
  },
];

const flexCenter = {
  display: "flex",
  alignItems: "center",
};

const defaultValue = {
  role: "",
  department: "",
  dob: "",
  email: "",
  password: "",
  image: "",
};

export const CreateAndEditUser = () => {
  const { departments, fetchDepartments } = useDepartmentStore(
    (state) => state
  );
  const fetchAccounts = useAccountStore((state) => state.fetchAccounts);
  const { id } = useParams();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm(defaultValue);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        dob: formatDate(data?.dob?.$d),
      };

      if(id) {
        const resp = await putAccount({id}, payload);
        
        if (resp) {
          toast.success("Update account successfully!");
          await fetchAccounts();
          redirectTo("/admin/user-management");
        }
      } else {
        const resp = await postRegisterAccount(payload);
        
        if (resp) {
          toast.success("Create account successfully!");
          await fetchAccounts();
          redirectTo("/admin/user-management");
        }
      }

    } catch (error) {
      const errorMessage = error?.response?.data?.status;
      toast.error(errorMessage);
    }
  };

  const watchFieldsInModalCreateMember = () => {
    let isEnable = false;
    const field = useWatch({ control });

    if (
      field?.role &&
      field?.department &&
      field?.name &&
      field?.email &&
      field?.password
    ) {
      isEnable = false;
    } else {
      isEnable = true;
    }
    return isEnable;
  };

  useEffect(() => {
    (async () => {
      try {
        //fetch department
        await fetchDepartments();

        if(id) {
          const resp = await getAccountDetail({ id });
          if(resp) {
            setValue('role', resp?.data?.data?.role);
            setValue('department', resp?.data?.data?.department);
            setValue('name', resp?.data?.data?.name);
            setValue('email', resp?.data?.data?.email);
            setValue('password', resp?.data?.data?.password);
            setValue('dob', resp?.data?.data?.dob);
            setValue('image', resp?.data?.data?.image);
          } 
        }
      } catch (error) {
        const errorMessage = error?.response?.data?.status;
        toast.error(errorMessage);
      }
    })();
  }, []);
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
            {id ? "Edit" : "Create"} Member
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
                      sx={{ fontSize: "15px" }}
                    >
                      {roles.map((option) => (
                        <MenuItem
                          sx={{ fontSize: "15px" }}
                          key={option.value}
                          value={option.value || ""}
                        >
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
                          value={option.name || ""}
                        >
                          {option.name}
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
                    disabled={id ? true : false}
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
                        ".MuiInputBase-root": {
                          fontSize: "15px",
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}
              </ControllerInput>
            </Box>
            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                type="submit"
                disabled={watchFieldsInModalCreateMember()}
                fullWidth
              >
                {id ? "Edit" : "Update"}
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
                      <input {...field} hidden accept="image/*" type="file" />
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
