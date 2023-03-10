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
import Button from '@mui/material/Button';

import { redirectTo } from "@/shared/utils/history";

export const UserManagement = () => {
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
            onClick={() => redirectTo("/admin/create-user")}
          >
            Create Acount
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
    </Box>
  );
};
