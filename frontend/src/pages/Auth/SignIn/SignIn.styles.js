import styled, { css } from 'styled-components';
import { Box, Typography } from '@mui/material';

export const SignInContainer = styled(Box)`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0;
    height: 100vh;
    overflow: hidden;
`

export const SignInHead = styled(Box)`
    padding: 16px 0px;
`

export const SignInHeadLogo = styled('img')``

export const SignInWrapper = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: calc(100% - 100px);
`

export const SignInContent = styled(Box)`

`

export const SignInContentIntro = styled(Typography)``

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
`

export const SignInImageWrapper = styled(Box)``

export const SignInImage = styled('img')`
    width: 100%;
    object-fit: contain;
`

