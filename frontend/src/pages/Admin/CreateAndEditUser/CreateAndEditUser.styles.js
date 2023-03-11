import styled, { css } from 'styled-components';
import { Box } from '@mui/material/';
import {  backgroundColor, primaryColor, activeColor } from '@/shared/utils/colors.utils'

export const FormCreateAccount = styled('form')`
    display: flex;
    align-items: center;
`

export const ImageUserWrapper = styled(Box)`
    position: relative;
    width: 300px;
    height: 300px;
    display: flex;
    margin: 0 auto;
`

export const ImageUser = styled('img')`
    width: 100%;
    object-fit: contain;
    border-radius: 50%;
    border: 1px solid
`

export const CameraWrapper = styled(Box)`
    position: absolute;
    right: 30px;
    bottom: 10px;
    border-radius: 50px;
    background-color: ${backgroundColor};
`

