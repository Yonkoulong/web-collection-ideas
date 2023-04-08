import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
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

import { useAccountStore } from "@/stores/AccountStore";
import { PopUpConfirm } from "@/shared/components/Popup";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { redirectTo } from "@/shared/utils/history";
import { deleteAccount } from "@/services/admin.services";
import { formatDate } from '@/shared/utils/constant.utils';

const maxHeight = 700;

export const UserManagement = () => {
  const { accounts, fetchAccounts, totalRecord, loading, setLoading } =
    useAccountStore((state) => state);

  const [openPopupConfirm, setOpenPopupConfirm] = useState(false);
  const [idSelected, setIdSelected] = useState(0);
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

  const handleClickOpenModalDeleteAccount = (id) => {
    setIdSelected(id);
    setOpenPopupConfirm(true);
  };

  const handleClosePopupDeleteAccount = () => {
    setOpenPopupConfirm(false);
  }

  const handleDeleteAccount = async () => {
    try {
      console.log({id: idSelected});
      const resp = await deleteAccount( { id: idSelected } );
      if(resp) {
        toast.success("Delete this account successfully!");
        await fetchAccounts();
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.status;
      toast.error(errorMessage);
    }
  }

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        await fetchAccounts();
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
            onClick={() => redirectTo("/admin/create-user")}
          >
            Create Acount
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
                  <TableCell width="20%">Name</TableCell>
                  <TableCell width="20%">Email</TableCell>
                  <TableCell width="15%">Department</TableCell>
                  <TableCell width="15%">Role</TableCell>
                  <TableCell width="20%">DoB</TableCell>
                  <TableCell width="10%">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!loading &&
                  accounts
                    ?.slice(
                      controller.page * controller.rowsPerPage,
                      controller.page * controller.rowsPerPage +
                        controller.rowsPerPage
                    )
                    ?.map((account) => (
                      <StyledTableRow key={account?._id}>
                        <TableCell
                          sx={{
                            "&:hover": {
                              cursor: "pointer",
                              opacity: 0.8,
                            },
                          }}
                          onClick={() => redirectTo(`admin/user/${account?._id}`)}
                        >
                          {accounts?.name}
                        </TableCell>
                        <TableCell
                          sx={{
                            "&:hover": {
                              cursor: "pointer",
                              opacity: 0.8,
                            },
                          }}
                          onClick={() => redirectTo(`admin/user/${account?._id}`)}
                        >
                          {account?.email}
                        </TableCell>
                        <TableCell
                          sx={{
                            "&:hover": {
                              cursor: "pointer",
                              opacity: 0.8,
                            },
                          }}
                          onClick={() => redirectTo(`admin/user/${account?._id}`)}
                        >
                          {account?.departmentId?.name || '-'}
                        </TableCell>
                        <TableCell
                          sx={{
                            "&:hover": {
                              cursor: "pointer",
                              opacity: 0.8,
                            },
                          }}
                          onClick={() => redirectTo(`admin/user/${account?._id}`)}
                        >
                          {account?.role || '-'}
                        </TableCell>
                        <TableCell
                          sx={{
                            "&:hover": {
                              cursor: "pointer",
                              opacity: 0.8,
                            },
                          }}
                          onClick={() => redirectTo("admin/user/:id")}
                        >
                          {formatDate(account?.dob) || '-'}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() =>
                              handleClickOpenModalDeleteAccount(account?._id)
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
            {!loading && accounts.length === 0 && <NoDataAvailable />}
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

      {/* popup confirm */}
      <PopUpConfirm
        open={openPopupConfirm}
        onCancel={handleClosePopupDeleteAccount}
        onConfirm={handleDeleteAccount}
        content="Are you sure to delete this account!"
      />
    </Box>
  );
};
