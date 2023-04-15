import styled, { css } from 'styled-components';
import { Box, Typography } from '@mui/material';
import { primaryColor } from '@/shared/utils/colors.utils';

export const NavLinkWrapper = styled(Box)`
    display: flex;
    align-items: center;
`

export const NavLinkTitle = styled(Typography)`
    ${({ theme: {  } }) => css`
        &&& {
            margin-left: 16px;
            font-size: 15px;
        }
    `}
`