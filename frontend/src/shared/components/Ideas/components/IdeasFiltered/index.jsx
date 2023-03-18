import React, { useState } from "react";

import { Box, Button, Popover, Typography } from "@/shared/components";
import { SearchCustomize } from "@/shared/components/Search";
import { primaryColor, backgroundColor, activeColor } from "@/shared/utils/colors.utils";

export const IdeasFiltered = () => {
  const [anchorSortEl, setAnchorSortEl] = useState(null);

  const handleClickSortAnchor = (event) => {
    setAnchorSortEl(event.currentTarget);
  };

  const handleCloseSortAnchor = () => {
    setAnchorSortEl(null);
  };

  const openSortAnchor = Boolean(anchorSortEl);
  const idSortAnchor = open ? "sort-popover" : undefined;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Box sx={{ mr: 2 }}>
          <SearchCustomize />
        </Box>
        <Button
          aria-describedby={idSortAnchor}
          variant="contained"
          onClick={handleClickSortAnchor}
        >
          Sort by
        </Button>
        <Popover
          id={idSortAnchor}
          open={openSortAnchor}
          anchorEl={anchorSortEl}
          onClose={handleCloseSortAnchor}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Box sx={{ ":hover": { backgroundColor: activeColor, color: primaryColor } }}>
            <Typography sx={{ p: 2 }} fontSize="small">Name</Typography>
          </Box>
          <Box sx={{ ":hover": { backgroundColor: activeColor, color: primaryColor } }}>
            <Typography sx={{ p: 2 }} fontSize="small">Closure Date</Typography>
          </Box>
          <Box sx={{ ":hover": { backgroundColor: activeColor, color: primaryColor } }}>
            <Typography sx={{ p: 2 }} fontSize="small">Final Closure Date</Typography>
          </Box>
        </Popover>
      </Box>
      <Box>list idea</Box>
    </Box>
  );
};
