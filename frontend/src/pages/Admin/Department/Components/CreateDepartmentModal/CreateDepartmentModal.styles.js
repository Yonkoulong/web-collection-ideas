import styled, { css } from "styled-components";
import { Box, Typography, Button } from "@/shared/components";
import { primaryColor, whiteColor } from '@/shared/utils/colors.utils'

export const CreateDepartmentFormWrapper = styled(Box)`
`

export const CreateDepartmentForm = styled('form')`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

export const CreateDepartmentInputContainer = styled(Box)`
`

export const CreateDepartmentFeatureWrapper = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: space-between;
`