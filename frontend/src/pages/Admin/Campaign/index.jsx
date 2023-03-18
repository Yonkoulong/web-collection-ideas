import React, { useState, useEffect } from "react";

import { SearchCustomize } from "@/shared/components/Search";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  CircularProgress,
  NoDataAvailable,
  StyledTableRow,
  Paper,
  IconButton,
} from "@/shared/components";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { ModalCreateCampaign } from "./Components/CreateCampaignModal";
import { PopUpConfirm } from "@/shared/components/Popup";
import { useCampaignStore } from "@/stores/CampaignStore";
import { redirectTo } from "@/shared/utils/history";
import { deleteCampaign } from '@/services/admin.services'

const maxHeight = 700;

export const Campaign = () => {
  const { campaigns, fetchCampaigns, loading, setLoading, totalRecord } =
    useCampaignStore((state) => state);

  const [idSelected, setIdSelected] = useState(0);
  const [openCreateCampaignModal, setOpenCreateCampaignModal] = useState(false);
  const [openPopupConfirm, setOpenPopupConfirm] = useState(false);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,  
  });

  const handlePageChange = (event, newPage) => {
    setController({
      ...controller,
      page: newPage,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setController({
      ...controller,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  const handleClickOpenModalCreateCampaign = () => {
    setOpenCreateCampaignModal(true);
  };

  const handleDeleteCampaign = async () => {
    try {
      if (idSelected) {
        await deleteCampaign({ id: idSelected });
        toast.success("Delete campaign successfully!");
        await fetchCampaigns();
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.content;
      toast.error(errorMessage);
    }
  };

  const handleClickOpenModalDeleteCampaign = (id) => {
    setIdSelected(id);
    setOpenPopupConfirm(true);
  };

  const handleClosePopupDeleteCampaign = () => {
    setOpenPopupConfirm(false);
  };

  useEffect(() => {
    setLoading(true);
    
    (async () => {
      try {
        await fetchCampaigns();
      } catch (error) {
        const errorMessage = error?.response?.data?.status;
        toast.error(errorMessage);
      }
    })();

  }, []);

  return (
    <Box
      sx={{
        padding: "24px 16px",
      }}
    >
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
            variant="contained"
            onClick={() => handleClickOpenModalCreateCampaign()}
          >
            Create Campaign
          </Button>
        </Box>

        <Box sx={{ mt: 4 }}>
          <TableContainer
            style={{
              boxShadow: "none",
              maxHeight: maxHeight || "unset",
            }}
            sx={{
              "&::-webkit-scrollbar": { width: "6px" },
              "&::-webkit-scrollbar-track": {
                borderRadius: "10px",
                height: "60px",
              },
              "::-webkit-scrollbar-thumb": {
                backgroundColor: "#D8DDE2",
                bordeRadius: "10px",
                height: "60px",
              },
              "::-webkit-scrollbar-thumb:hover": {
                opacity: "0.8",
              },
            }}
            component={Paper}
          >
            <Table stickyHeader={!!maxHeight} sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell width="15%">Name</TableCell>
                  {/* <TableCell width="20%">Description</TableCell> */}
                  <TableCell width="15%">Start Time</TableCell>
                  <TableCell width="15%">Closure Date</TableCell>
                  <TableCell width="15%">Final Closure Date</TableCell>
                  <TableCell width="10%">Department</TableCell>
                  <TableCell width="10%">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!loading &&
                  campaigns
                    ?.slice(
                      controller.page * controller.rowsPerPage,
                      controller.page * controller.rowsPerPage +
                        controller.rowsPerPage
                    )
                    ?.map((campaign) => (
                      <StyledTableRow key={campaign?._id}>
                        <TableCell
                          sx={{
                            "&:hover": {
                              cursor: "pointer",
                              opacity: 0.8,
                            },
                          }}
                          onClick={() => console.log()}
                        >
                          {campaign?.name}
                        </TableCell>
                        <TableCell
                          sx={{
                            "&:hover": {
                              cursor: "pointer",
                              opacity: 0.8,
                            },
                          }}
                          onClick={() => console.log()}
                        >
                          {campaign?.startTime}
                        </TableCell>
                        <TableCell
                          sx={{
                            "&:hover": {
                              cursor: "pointer",
                              opacity: 0.8,
                            },
                          }}
                          onClick={() => console.log()}
                        >
                          {campaign?.firstClosureDate}
                        </TableCell>
                        <TableCell
                          sx={{
                            "&:hover": {
                              cursor: "pointer",
                              opacity: 0.8,
                            },
                          }}
                          onClick={() => console.log()}
                        >
                          {campaign?.finalClosureDate}
                        </TableCell>
                        <TableCell
                          sx={{
                            "&:hover": {
                              cursor: "pointer",
                              opacity: 0.8,
                            },
                          }}
                          onClick={() => console.log()}
                        >
                          {campaign?.departmentName}
                        </TableCell>
                        
                        <TableCell>
                          <IconButton
                            onClick={() =>
                              handleClickOpenModalDeleteCampaign(
                                campaign?._id
                              )
                            }
                          >
                            <DeleteOutlineIcon />
                          </IconButton>
                        </TableCell>
                      </StyledTableRow>
                    ))}
              </TableBody>
            </Table>
            {loading && (
              <Box my={10} mx={"auto"} textAlign="center">
                <CircularProgress color="inherit" size={30} />
              </Box>
            )}
            {!loading && campaigns.length === 0 && <NoDataAvailable />}
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 100]}
            component="div"
            onPageChange={handlePageChange}
            page={controller.page}
            count={totalRecord}
            rowsPerPage={controller.rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Box>

      {/* Popup confirm when delete member */}
      <PopUpConfirm
        open={openPopupConfirm}
        onCancel={handleClosePopupDeleteCampaign}
        onConfirm={() => handleDeleteCampaign()}
        content="Are you sure to delete Campaign!"
      />

      {/* modal create member */}
      <ModalCreateCampaign
        open={openCreateCampaignModal}
        onClose={setOpenCreateCampaignModal}
      />
    </Box>
  );
};
