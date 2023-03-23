import styled, { css } from 'styled-components';
import { Box, Typography, Paper } from '@/shared/components';
import { activeColor } from '@/shared/utils/colors.utils';

export const IdeasWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-height: 600px;
    overflow-y: auto;
`

export const IdeaItem = styled(Paper)`
    padding: 16px;
    
    &:hover {
        background-color: ${activeColor};
        border-radius: 10px;
    }
`

export const IdeaItemHead = styled(Box)`
    display: flex;
    align-items: center;
`

export const IdeaItemHeadImage = styled('img')`
    width: 100%;
    object-fit: contain;
`

export const IdeaItemHeadTitle = styled(Typography)`
    ${({ theme: { } }) => css`
        &&& {
            font-size: 15px;
            font-weight: bold;
        }
    `}
`

export const IdeaItemHeadNameWrapper = styled(Box)`
    display: flex;
    gap: 8px;
`
export const IdeaItemHeadNameText = styled(Typography)`
    ${({ theme: { } }) => css`
        &&& {
            font-size: 14px;
        }
    `}
`

export const IdeaItemHeadDateText = styled(Typography)`
    ${({ theme: { } }) => css`
            &&& {
                font-size: 14px;
            }
        `}
    `;

export const IdeaItemBody = styled(Box)`
    margin-top: 16px;
    padding-left: 66px;
`;

export const IdeaItemContent = styled(Box)`
    
    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;

export const IdeaItemBottom = styled(Box)`
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;


