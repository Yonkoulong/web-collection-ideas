import React, { useState } from "react";

import { SearchCustomize } from "@/shared/components/Search";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from "@/shared/components";
import Button from "@mui/material/Button";

import { ModalCreateCampaign } from "./Components/CreateCampaignModal";
import { PopUpConfirm } from "@/shared/components/Popup";
import { redirectTo } from "@/shared/utils/history";

export const Campaign = () => {
  const [openCreateCampaignModal, setOpenCreateCampaignModal] =
    useState(false);
  const [openPopupConfirm, setOpenPopupConfirm] = useState(false);
  const [passengersList, setPassengersList] = useState([]);
  const [passengersCount, setPassengersCount] = useState(0);
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
    // if (membersSelected && Array.isArray(membersSelected)) {
    //   try {
    //     const resp = await deleteUserByUserIds({ ids: membersSelected });
    //     setMembersSelected([]);
    //     fetchMembers(payloadRequest);
    //     toast.success("Delete member successfully!");
    //   } catch (error) {
    //     const errorMessage = error?.response?.data?.content;
    //     toast.error(errorMessage);
    //   }
    // }
  };

  const handleClickOpenModalDeleteCampaign = (ids) => {
    setOpenPopupConfirm(true);
  };

  const handleClosePopupDeleteCampaign = () => {
    setOpenPopupConfirm(false);
  };

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
          <Button variant="contained" onClick={() => handleClickOpenModalCreateCampaign()}>
            Create Campaign
          </Button>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Trips</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {passengersList.map((passenger) => (
                <TableRow key={passenger._id}>
                  <TableCell>{passenger.name}</TableCell>
                  <TableCell>{passenger.trips}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            onPageChange={handlePageChange}
            page={controller.page}
            count={passengersCount}
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
        content="Are you sure to delete member!"
      />

      {/* modal create member */}
      <ModalCreateCampaign
        open={openCreateCampaignModal}
        onClose={setOpenCreateCampaignModal}
      />
    </Box>
  );
};
