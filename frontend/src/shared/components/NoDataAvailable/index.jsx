import React from "react";
import styled from "styled-components";
import { Box } from "@/shared/components";

const StyledBoxContainer = styled(Box)`
  height: 200px;
  text-align: center;
  align-item: center;
  padding-top: 80px;
`;

export const NoDataAvailable = () => {
  return <StyledBoxContainer>No Data Available</StyledBoxContainer>;
};

export default NoDataAvailable;
