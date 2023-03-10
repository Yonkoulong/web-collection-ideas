import { DialogContentText, Button, Typography } from "@/shared/components";
import styled, { css } from "styled-components";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import CloseIcon from "@mui/icons-material/Close";

export const IconSuccess = styled(CheckCircleIcon)`
  ${({ theme: { palette } }) => css`
    &&& {
      width: 18%;
      height: 18%;
    }
  `}
`;

export const IconWarning = styled(ErrorIcon)`
  ${({ theme: { palette } }) => css`
    &&& {
      color: #b4bac0;
      width: 18%;
      height: 18%;
    }
  `}
`;

export const IconError = styled(CloseIcon)`
  ${({ theme: { palette } }) => css`
    &&& {
      background-color: #b4bac0;
      border-radius: 50%;
      width: 18%;
      height: 18%;
    }
  `}
`;

export const TextPopUp = styled(DialogContentText)`
  ${({ theme: { palette } }) => css`
    &&& {
      padding: 0 18px;
    }
  `}
`;
export const TextPopUpConfirm = styled(DialogContentText)`
  ${({ theme: { palette } }) => css`
    &&& {
      padding: 0 18px;
      text-align: center;
    }
  `}
`;

export const ButtonConFirm = styled(Button)`
  ${({ theme: { palette } }) => css`
    &&& {
      width: 100%;
      padding: 10px 20px;
    }
  `}
`;

export const ButtonActionConfirm = styled(Button)`
  ${({ theme: { palette } }) => css`
    &&& {
      font-weight: 600;
      width: 100%;
      padding: 14px 20px;
      margin-left: 10px;
    }
  `}
`;

export const ButtonActionCanCel = styled(Button)`
  ${({ theme: { palette } }) => css`
    &&& {
      font-weight: 600;
      width: 100%;
      padding: 14px 20px;
      margin-left: 10px;
    }
  `}
`;

export const DialogHeader = styled(Typography)`
  ${({ theme: { palette } }) => css`
    &&& {
      font-weight: 700;
      font-size: 32px;
      margin: 20px 0;
    }
  `}
`;