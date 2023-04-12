import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm, useWatch } from "react-hook-form";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  postRegisterAccount,
  getAccountDetail,
  putAccount,
} from "@/services/admin.services";

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
    label: "STAFF",
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
  departmentId: "",
  name: "",
  dob: "",
  email: "",
  password: "",
  file: "",
};

export const CreateAndEditUser = () => {
  const { departments, fetchDepartments } = useDepartmentStore(
    (state) => state
  );
  const fetchAccounts = useAccountStore((state) => state.fetchAccounts);
  const { id } = useParams();
  const fileRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    resetField
  } = useForm(defaultValue);

  const field = useWatch({ control });

  const onSubmit = async (data) => {
    try {
      if(!data.departmentId) {
        delete data.departmentId;
      }

      const [file] = fileRef.current.files;
      const formData = new FormData();

      formData.append("file", file);

      const payload = {
        ...data,
        dob: data?.dob?.$d.toISOString(),
      };

      Object.entries(payload).forEach((pair) => {
        const [k, v] = pair;
        if (k != "file") {
          formData.append(k, v);
        }
      });

      if (id) {
        axios({
          method: "put",
          url: `http://localhost:8080/account/${id}`,
          data: formData,
          headers: {
            withCredentials: "true",
            "Content-Type": "multipart/form-data",
          },
        })
          .then(function (response) {
            if (response) {
              toast.success("Create account successfully!");
              fetchAccounts();
              redirectTo("/admin/user-management");
            }
          })
          .catch(function (error) {
            throw error;
          });
      } else {
        const token = localStorage.getItem('token');
        axios({
          method: "post",
          url: "http://localhost:8080/account",
          data: formData,
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token && token}`
          },
        })
          .then(function (response) {
            if (response) {
              toast.success("Create account successfully!");
              fetchAccounts();
              redirectTo("/admin/user-management");
            }
          })
          .catch(function (error) {
            throw error;
          });
      }
    } catch (error) {
      const errorMessage = error?.data?.status;
      toast.error(errorMessage);
    }
  };

  const handleWatchRoleQAM = () => {
    let isEnable = false;

    if (field?.role === enumRoles.QAM) {
      isEnable = true;
    } else {
      isEnable = false;
    }

    return isEnable;
  };

  const handleWatchChangeFile = () => {
    const [file] = fileRef.current.files;

    if (file) {
      setSelectedFile(file);
    }
  };

  const watchFieldsInModalCreateMember = () => {
    let isEnable = false;

    if (
      field?.role &&
      field?.name &&
      field?.email &&
      field?.password &&
      field?.dob &&
      field?.file
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

        if (id) {
          const resp = await getAccountDetail({ id });
          if (resp) {
            setValue("role", resp?.data?.data?.role);
            setValue("departmentId", resp?.data?.data?.departmentId);
            setValue("name", resp?.data?.data?.name);
            setValue("email", resp?.data?.data?.email);
            setValue("password", resp?.data?.data?.password);
            setValue("dob", dayjs(resp?.data?.data?.dob).format('YYYY-MM-DD'));
            // setValue("file", resp?.data?.data?.avartarUrl);
            setPreview(resp?.data?.data?.avartarUrl);
          }
        }
      } catch (error) {
        const errorMessage = error?.response?.data?.status;
        toast.error(errorMessage);
      }
    })();
  }, []);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (field?.role === enumRoles.QAM) {
      resetField('departmentId');
    }
  }, [field.role]);


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
              <Typography fontSize="medium">
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
              <Typography fontSize="medium">
                Department<span style={{ color: "red" }}>*</span>{" "}
              </Typography>
              <Box>
                <ControllerInput
                  control={control}
                  errors={errors}
                  fieldNameErrorMessage="Department"
                  fieldName="departmentId"
                  required={false}
                >
                  {}
                  {(field) => (
                    <Select
                      {...field}
                      fullWidth
                      size="small"
                      value={field?.value || ""}
                      sx={{ fontSize: "15px" }}
                      disabled={handleWatchRoleQAM()}
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
              </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography fontSize="medium">
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
              <Typography fontSize="medium">
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
              <Typography fontSize="medium">
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
              <Typography fontSize="medium">
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
                      value={dayjs(field.value)}
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
                {id ? "Update" : "Create"}
              </Button>
            </Box>
          </Box>
          <Box sx={{ flex: "0 0 50%", maxWidth: "50%" }}>
            <ControllerInput
              control={control}
              errors={errors}
              fieldName="file"
              required={false}
            >
              {(field) => (
                <ImageUserWrapper>
                  <ImageUser src={preview} />
                  <CameraWrapper>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                    >
                      <input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleWatchChangeFile();
                        }}
                        hidden
                        ref={fileRef}
                        accept="image/*"
                        type="file"
                      />
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
