import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { ErrorMessage } from "@hookform/error-message";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { TextField, OutlinedInput, InputAdornment } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { IconLightBulb } from "@/assets/icons";
import  ImageSignIn  from "@/assets/images/signinImage.png";
import {
  SignInContainer,
  SignInHead,
  SignInWrapper,
  SignInContent,
  SignInContentIntro,
  SignInForm,
  InputStyledWrapper,
  SignInImageWrapper,
  SignInImage,
  SignInBody,
} from "./SignIn.styles";
import { StringRequired } from "@/shared/utils/validation.utils";
import {  toast } from 'react-toastify';
import { postLogin } from "@/services/auth.services";
import { redirectTo } from "@/shared/utils/history";
import { useAppStore } from "@/stores/useAppStore"; 

export const SignIn = () => {
  const { setUserInfo } = useAppStore((state) => state);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    email: "",
    password: "",
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await postLogin(data);
      if(response) {
        cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        localStorage.setItem('token', response?.data?.data?.user?.refreshToken);
        setUserInfo(response?.data?.data)
        toast.success("Login in successfully!");
        setLoading(false);
        redirectTo('/admin');
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.status;
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <SignInContainer>
      <SignInWrapper>
        <SignInHead>
          <IconLightBulb viewBox="0 0 50 50" sx={{ fontSize: "50px" }} />
        </SignInHead>
        <SignInBody>
        <SignInContent>
          <SignInContentIntro>
            Web-based role-based system <br />
            to collect ideas for improvement from staff in large university
          </SignInContentIntro>

          <SignInForm onSubmit={handleSubmit(onSubmit)}>
            <InputStyledWrapper>
              <Controller
                name="email"
                control={control}
                rules={{ validate: (v) => StringRequired(v, "Email") }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    type="text"
                    placeholder="Enter Email"
                    error={error != undefined}
                  />
                )}
              />
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => (
                  <div style={{ color: "red", fontSize: 12 }}>{message}</div>
                )}
              />
            </InputStyledWrapper>

            <InputStyledWrapper>
              <Controller
                name="password"
                control={control}
                rules={{ validate: (v) => StringRequired(v, "Password") }}
                render={({ field, fieldState: { error } }) => (
                  <OutlinedInput
                    {...field}
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    error={error != undefined}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                )}
              />
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => (
                  <div style={{ color: "red", fontSize: 12 }}>{message}</div>
                )}
              />
            </InputStyledWrapper>

            <InputStyledWrapper>
              <LoadingButton
                loading={loading}
                type="submit"
                size="large"
                disableElevation
                variant="contained"
              >
                Log In
              </LoadingButton>
            </InputStyledWrapper>
          </SignInForm>
        </SignInContent>
        <SignInImageWrapper>
          <SignInImage src={ImageSignIn} alt="signin image" />
        </SignInImageWrapper>
        </SignInBody>
      </SignInWrapper>
    </SignInContainer>
  );
};
