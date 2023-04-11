import styled, { css } from 'styled-components';
import { Box, Typography } from '@mui/material';
import { primaryColor } from '../../utils/colors.utils';

export const NavbarContainer = styled(Box)`
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    height: 100vh;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    width: 20%;
    padding: 16px;
    overflow: auto;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    
    &::-webkit-scrollbar {
        display: none;
    }
`
export const NavbarHead = styled(Box)``;

export const NavbarLogoWrapper = styled(Box)``;

export const NavbarBody = styled(Box)`
    padding: 24px 0;
`;

export const NavbarStyled = styled('nav')`

`

export const NavbarListStyled = styled('ul')``

export const NavbarItemStyled = styled('li')`
    &:hover {
        opacity: 0.8;
    }
`

export const NavbarBottom = styled(Box)`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const NavbarBottomWrapperImage = styled(Box)`
    margin: 0 auto;
`;

export const NavbarBottomImage = styled('img')``

export const NavbarBottomLogout = styled(Box)`
    display: flex;
    justify-content: center;
`;

export const NavbarBottomLogoutText = styled(Typography)`
    ${({ theme: { } }) => css`
        &&& {
            margin-left: 4px;
            font-size: 15px;
        }
    `}
`