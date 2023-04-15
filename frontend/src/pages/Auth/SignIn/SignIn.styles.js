import styled, { css } from 'styled-components';
import { Box, Typography } from '@mui/material';
import { whiteColor } from '@/shared/utils/colors.utils';

export const SignInContainer = styled(Box)`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0;
    height: 100vh;
    overflow: hidden;
`

export const SignInHead = styled(Box)`
    padding: 48px 0px 16px;
`

export const SignInHeadLogo = styled('img')``

export const SignInWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;

`

export const SignInBody = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const SignInContent = styled(Box)`
    
`

export const SignInContentIntro = styled(Typography)`
    ${({ theme: { } }) => css`
        &&& {
            font-size: 18px;
        }
    `}
`

export const SignInForm = styled('form')`
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`

export const InputStyledWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 8px;


    .MuiInputBase-root {
        border-radius: 10px;
    }

    .MuiInputBase-input {
        font-size: 18px;
    }

    .MuiButtonBase-root {
        border-radius: 10px;
        font-size: 18px;
        color: ${whiteColor};
    }
`

export const SignInImageWrapper = styled(Box)``

export const SignInImage = styled('img')`
    width: 100%;
    object-fit: contain;
`

