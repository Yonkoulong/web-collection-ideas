import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { ErrorMessage } from "@hookform/error-message";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { TextField, OutlinedInput, InputAdornment } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { IconLightBulb } from "@/assets/icons";
import ImageSignIn from "@/assets/images/signinImage.png";
import {
  SignInContainer,
  SignInHead,
  SignInHeadLogo,
  SignInWrapper,
  SignInContent,
  SignInContentIntro,
  SignInForm,
  InputStyledWrapper,
  SignInImageWrapper,
  SignInImage,
} from "./SignIn.styles";
import { StringRequired } from "@/shared/utils/validation";

export const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    username: "",
    password: "",
  });

  const onSubmit = (data) => {
    setLoading(!loading);
    console.log(data);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <SignInContainer>
      <SignInHead>
        <IconLightBulb viewBox="0 0 50 50" sx={{ fontSize: "32px" }} />
      </SignInHead>
      <SignInWrapper>
        <SignInContent>
          <SignInContentIntro>
            Web-based role-based system <br />
            to collect ideas for improvement from staff in large university
          </SignInContentIntro>

          <SignInForm onSubmit={handleSubmit(onSubmit)}>
            <InputStyledWrapper>
              <Controller
                name="username"
                control={control}
                rules={{ validate: (v) => StringRequired(v, "Username") }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    type="text"
                    placeholder="Enter username"
                    error={error != undefined}
                  />
                )}
              />
              <ErrorMessage
                errors={errors}
                name="username"
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
                LOG IN
              </LoadingButton>
            </InputStyledWrapper>
          </SignInForm>
        </SignInContent>
        <SignInImageWrapper>
          <SignInImage src={ImageSignIn} alt="signin image" />
        </SignInImageWrapper>
      </SignInWrapper>
    </SignInContainer>
  );
};
