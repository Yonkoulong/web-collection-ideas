import styled, { css } from 'styled-components';
import { Box, Typography, Paper } from '@/shared/components';
import { activeColor, blackColor, backgroundColor, inActiveColor, primaryColor } from '@/shared/utils/colors.utils';

export const CampaignsWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-height: 600px;
    overflow-y: auto;
`

export const CampaignItem = styled(Box)`
    padding: 16px;
    border: 1px solid ${blackColor};
    position: relative;

    &:hover {
        opacity: 0.8;
        cursor: pointer;
    }

    &:before {
        position: absolute;
        content: "";
        
        width: 4px;
        left: 0;
        bottom: 0;
        top: 0;
        background-color: ${backgroundColor};
    }
`

export const CampaignItemHead = styled(Box)`

`

export const CampaignItemHeadStartTime = styled(Typography)`
    ${({ theme: { } }) => css`
        &&& {
            font-size: 20px;
            color: ${inActiveColor}
        }
    `}
`

export const CampaignItemBody = styled(Box)`
    margin-top: 16px;
    display: flex;

`;

export const CampaignItemContent = styled(Box)`
    color: ${primaryColor}
`;

export const CampaignItemBottom = styled(Box)`
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const CampaignItemBottomTag = styled(Box)`
    padding: 8px;
    background-color: ${activeColor};
    width: fit-content;
    border-radius: 10px;
`
export const CampaignItemBottomClosureTime = styled(Typography)`
    ${({ theme: { } }) => css`
        &&& {
            font-size: 15px;
            font-weight: bold;
        }
    `}
`


