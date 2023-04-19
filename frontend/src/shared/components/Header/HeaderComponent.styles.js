import styled, { css } from 'styled-components';
import { Box, Typography } from '@mui/material';
import { inActiveColor } from "@/shared/utils/colors.utils"

export const HeaderImage = styled('img')`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    object-fit: contain;
    border: 1px solid ${inActiveColor};
`;